import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form as BootstrapForm,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateTask.css";
import CreateTaskForm from "./components/CreateTaskForm";
import {
  getValidationSchemaTask,
  taskInitialValues,
} from "../../global/helperFunction";
import { useApiHelper } from "../../global/apiHelper";
import { CREATE_TASK, GET_TASK_DATA } from "../../URLS";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateTaskPage = () => {
  const { handleApiCall } = useApiHelper();
  const [priority, setPriority] = useState("high");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const initialValues = taskInitialValues;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getTaskData = () => {
    handleApiCall(
      "GET",
      GET_TASK_DATA,
      {},
      (data) => {
        console.log(data.users);
        setUsers(data.users);
        setProjects(data.projects);
      },
      (error) => {
        console.log(error);
        dispatch(userAction.removeUser());
      }
    );
  };
  const validationSchema = getValidationSchemaTask();
  useEffect(() => {
    getTaskData();
  }, []);
  const onSubmit = (values) => {
    const taskData = { ...values, priority };
    console.log("Submitted task:", taskData);
    // Here you can handle the form submission, e.g., send data to the server
    handleApiCall(
      "FORMDATA",
      CREATE_TASK,
      taskData,
      (data) => {
        console.log("Task created successfully:", data);
        //navigate("/tasks");
      },
      (error) => {
        console.error("Error creating task:", error);
      }
    );
  };

  return (
    <Container className="my-5">
      <h2>Create New Task</h2>
      <p>Add a new task to your project and assign it to team members</p>

      <Card className="p-4">
        <CreateTaskForm
          priority={priority}
          setPriority={setPriority}
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
          projects={projects}
          users={users}
        />
      </Card>
    </Container>
  );
};

export default CreateTaskPage;
