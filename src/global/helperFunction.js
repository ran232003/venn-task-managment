import * as Yup from "yup";
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
  jobTitle: Yup.string().min(2).max(30).required("Required"),
  company: Yup.string().min(1).max(20).required("Required"),
  timezone: Yup.string().required("Required"),
});
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
  { lable: "Home", name: "Home", link: "/" },
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
