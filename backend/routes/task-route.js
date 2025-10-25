let express = require("express");

const { verifyToken, checkSchema } = require("../middleware/helperFunctions");
const upload = require("../middleware/uploadMiddleware");
const {
  getTaskData,
  createTask,
  getUserTasks,
} = require("../controllers/task-controller");

const router = express.Router();

router.get("/getTaskData", getTaskData);
router.get("/getUserTasks", verifyToken, getUserTasks);
router.post("/create", upload.array("attachments", 5), createTask);

module.exports = router;
