const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const MyError = require("../models/MyError");
const nodemailer = require("nodemailer");

//const dynamicModule = require("../schema/");
const Ajv = require("ajv").default;

const ajv = new Ajv();

const verifyToken = (req, res, next) => {
  const token = req.cookies["Auth_Cookie"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Auth token is missing", status: "error" });
  }

  jwt.verify(token, "my-secret", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token is invalid", status: "error" });
    }
    req.user = decoded; // Add decoded payload to request object
    next();
  });
};

const checkSchema = (schemaModule) => {
  console.log(schemaModule);
  return (req, res, next) => {
    try {
      if (!schemaModule) {
        const err = new MyError("missing schema", 500);
        next(err);
      }
      const dynamicModule = require(`../validation_schema/${schemaModule}`);
      const validate_schema = ajv.compile(dynamicModule);
      if (!validate_schema(req.body)) {
        console.log(validate_schema.errors);
        const err = new MyError("Schema Error", 400);
        next(err);
      }
      console.log("SchemaOK");
      next();
    } catch (error) {
      console.log(error);

      const err = new MyError("Internal Error", 500);
      next(err);
    }
  };
};
const sendResetEmail = async (email, token) => {
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  // ⚠️ Use environment variables in real app
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP config
    auth: {
      user: "mike232003@gmail.com", // your email address
      pass: "puma dmdc etrf hphq", // app password (not your real Gmail password)
    },
  });

  const mailOptions = {
    from: `"Support Team" <mike232003@gmail.com>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <h3>Hello,</h3>
      <p>You requested to reset your password.</p>
      <p>Click the link below to set a new password. This link is valid for 15 minutes:</p>
      <a href="${resetLink}">${resetLink}</a>
      <br/><br/>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
module.exports = {
  verifyToken,
  checkSchema,
  sendResetEmail,
};
