const MyError = require("../models/MyError");
const Project = require("../models/project-schema");
const Task = require("../models/task-schema");
const User = require("../models/user-schema");
const mongoose = require("mongoose");

const getTaskData = async (req, res, next) => {
  console.log("getTaskData");
  try {
    const users = await User.find({}).select("email");
    const projects = await Project.find({});
    console.log(users, projects);
    return res
      .status(200)
      .json({ status: "ok", users: users, projects: projects });
  } catch (err) {
    let e = new MyError(500, "Internal Server Error");
    return next(e);
  }
};
const getUserTasks = async (req, res, next) => {
  console.log("getUserTasks", req.user.id);
  try {
    let userId = req.user.id;
    // const statusCounts = await Task.aggregate([
    //   {
    //     // 1. Group documents by the 'status' field
    //     $group: {
    //       // The _id field is mandatory and must be the field you are grouping by
    //       _id: "$status",
    //       // 2. Count the number of documents in each group
    //       count: { $sum: 1 },
    //     },
    //   },
    //   {
    //     // 3. Optional: Rename _id to 'status' and project the fields
    //     $project: {
    //       _id: 0, // Exclude the default _id field
    //       status: "$_id",
    //       count: "$count",
    //     },
    //   },
    //   {
    //     // 4. Optional: Sort the results alphabetically by status for consistency
    //     $sort: { status: 1 },
    //   },
    // ]);
    userId = new mongoose.Types.ObjectId(userId);
    const statusCounts = await Task.aggregate([
      {
        // 1. Filter Tasks: Only include tasks where the user is the reporter OR the assignee
        $match: {
          $or: [{ reporter: userId }, { assignee: userId }],
        },
      },
      {
        // 2. Group Tasks: Group the filtered tasks by their 'status'
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        // 3. Optional: Rename _id to 'status' and project the fields
        $project: {
          _id: 0,
          status: "$_id",
          count: "$count",
        },
      },
      {
        // 4. Optional: Sort the results alphabetically by status
        $sort: { status: 1 },
      },
    ]);
    console.log("Status Counts:", statusCounts);
    const tasks = await Task.find({
      $or: [{ reporter: userId }, { assignee: userId }],
    });
    return res
      .status(200)
      .json({ status: "ok", userTasks: tasks, statusCounts: statusCounts });
  } catch (err) {
    console.log(err);
    let e = new MyError("Internal Server Error", 500);
    return next(e);
  }
};
const createTask = async (req, res, next) => {
  console.log("createTask", req.files, req.body);

  try {
    const {
      title,
      description,
      project,
      assignee,
      reporter,
      dueDate,
      estimatedHours,
      status,
      priority,
    } = req.body;

    // Validate required fields
    if (!title || !project || !reporter) {
      return next(
        new MyError(400, "Missing required fields (title, project, reporter)")
      );
    }

    // Find reporter and assignee by email
    const reporterUser = await User.findOne({ email: reporter });
    if (!reporterUser)
      return next(new MyError(404, `Reporter ${reporter} not found`));

    let assigneeUser = null;
    if (assignee) {
      assigneeUser = await User.findOne({ email: assignee });
      if (!assigneeUser)
        return next(new MyError(404, `Assignee ${assignee} not found`));
    }
    // ✅ Map all uploaded files to URLs
    const attachments =
      req.files?.map((file) => {
        return `http://localhost:5000/${file.path.replace(/\\/g, "/")}`;
      }) || [];
    // Find project by code or name

    // Create new task
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      reporter: reporterUser._id,
      assignee: assigneeUser ? assigneeUser._id : undefined,
      project: project,
      dueDate,
      estimatedHours,
      attachments,
    });

    await newTask.save();

    return res.status(201).json({
      success: true,
      status: "ok",
      message: "Task created successfully",
      task: newTask,
    });
  } catch (err) {
    console.error("Error creating task:", err);
    return next(new MyError(500, "Internal Server Error"));
  }
};

module.exports = {
  getTaskData,
  createTask,
  getUserTasks,
};
