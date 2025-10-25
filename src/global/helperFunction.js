import * as Yup from "yup";
import {
  FaTachometerAlt,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you are using react-router-dom

export const yupSchema = (action) => {
  console.log(action);
  switch (action) {
    case "signup":
      return Yup.object().shape({
        userName: Yup.string().min(1, "must be at least 1 characters"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      });

    case "login":
      return Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

    default:
      break;
  }
};
export const yupForProfile = Yup.object({
  jobTitle: Yup.string().min(2).max(30),
  company: Yup.string().min(1).max(20),
  timezone: Yup.string(),
});
export const getInitialValuesProfile = (user) => {
  return {
    jobTitle: user?.jobTitle || "",
    company: user?.company || "",
    timeZone: user?.timeZone || "",
    emailNotification: user?.emailNotification || false,
    profilePic: null,
  };
};
export const authFormArray = [
  { name: "userName", label: "UserName", type: "text" },
  { name: "email", label: "Email", type: "email" },

  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
];
export const getInitValues = (action) => {
  console.log(action);
  switch (action) {
    case "/auth/signup":
      return { userName: "", email: "", password: "", confirmPassword: "" };

    case "/auth/login":
      return {
        email: "",
        password: "",
      };

    default:
      break;
  }
};
export const authMapper = {
  login: "/auth/login",
  signup: "/auth/signup",
  provider: "provider",
};
export const navbarMap = [
  {
    lable: "Dashboard",
    name: "Dashboard",
    link: "/dashboard",
    protected: true,
  },
  { lable: "About", name: "About", link: "/About" },
  { lable: "Tasks", name: "Tasks", link: "/Tasks" },
  { lable: "My Tasks", name: "My Tasks", link: "/My Tasks", protected: true },

  { lable: "Search", name: "Search", link: "/Search" },
];
export const navbarMapDropDown = [
  {
    lable: "My Profile",
    name: "My Profile",
    link: "/MyProfile",
    protected: true,
  },
  { lable: "My Tasks", name: "My Tasks", link: "/MyTasks", protected: true },
  {
    lable: "Sign Out",
    action: true,
    name: "Sign Out",
    link: "/auth/signup",
    protected: true,
  },
];
// export const profileFormFields = [
//   {
//     name: "jobTitle",
//     label: "Job Title",
//     type: "text",
//   },
//   {
//     name: "company",
//     label: "Company",
//     type: "text",
//   },
//   {
//     name: "timeZone",
//     label: "Time Zone",
//     component: TimezoneSelect, // special handling below
//   },
//   {
//     name: "emailNotification",
//     label: "Email notifications for task updates",
//     type: "checkbox",
//   },
// ];
export const sidebarMenuItems = [
  {
    label: "Dashboard",
    icon: FaTachometerAlt,
    path: "/dashboard",
  },
  {
    label: "Tasks",
    icon: FaTasks,
    path: "/dashboard/tasks",
  },
  {
    label: "User Tasks",
    icon: FaProjectDiagram,
    path: "/dashboard/userTask",
  },
  {
    label: "Team",
    icon: FaUsers,
    path: "/team",
  },
  {
    label: "Analytics",
    icon: FaChartBar,
    path: "/analytics",
  },
  {
    label: "Settings",
    icon: FaCog,
    path: "/settings",
  },
];
// Define the max size in bytes (10 MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILE_COUNT = 5;

export const getValidationSchemaTask = () => {
  return Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string(),
    project: Yup.string().required("Required"),
    assignee: Yup.string().required("Required"),
    reporter: Yup.string().required("Required"),
    dueDate: Yup.date().nullable().required("Required"),
    estimatedHours: Yup.number().positive().required("Required"),
    status: Yup.string().required("Required"),
    attachments: Yup.mixed()
      .nullable()
      .test(
        "fileCount",
        `You can only upload a maximum of ${MAX_FILE_COUNT} files.`,
        (value) => {
          // Check if value is a FileList and its length is within limit
          if (!value) return true; // Allows null/empty upload
          return value.length <= MAX_FILE_COUNT;
        }
      )
      .test(
        "fileSize",
        `Total attachments size cannot exceed 10 MB.`,
        (value) => {
          if (!value || value.length === 0) return true; // Allows null/empty upload

          // Calculate the total size of all files
          const totalSize = Array.from(value).reduce(
            (sum, file) => sum + file.size,
            0
          );
          return totalSize <= MAX_FILE_SIZE;
        }
      ),
    // priority: Yup.string().required("Required"),
  });
};
export const taskInitialValues = {
  title: "",
  description: "",
  project: "",
  assignee: "",
  reporter: "",
  dueDate: null,
  estimatedHours: "",
  status: "",
  attachments: null,
  attachments: null,
  //priority: "",
};
const userTaskIcons = {
  open: "⏳",
  "in-progress": "🚀",
  completed: "✅",
  closed: "🔒",
  reopened: "🔒",
  blocked: "🚫",
  cancel: "🔥",
};
export const statsData = [
  {
    icon: "⏳",
    iconClass: "open",
    count: 8,
    label: "Open",
  },
  {
    icon: "🚀",
    iconClass: "in-progress",
    count: 5,
    label: "In Progress",
  },
  {
    icon: "✅",
    iconClass: "completed",
    count: 23,
    label: "Completed",
  },
  {
    icon: "🔒", // Check Mark
    iconClass: "closed",
    count: 2,
    label: "Closed",
  },
  {
    icon: "🔄", // Counterclockwise Arrows
    iconClass: "reopened",
    count: 2,
    label: "Reopen",
  },
  {
    icon: "🚫", // Prohibited Sign
    iconClass: "blocked",
    count: 2,
    label: "Blocked",
  },
  {
    icon: "🔥",
    iconClass: "cancel",
    count: 2,
    label: "Cancel",
  },
];
export const projectsData = [
  "All Projects",
  "Website Redesign",
  "Mobile App",
  "Marketing Campaign",
];
