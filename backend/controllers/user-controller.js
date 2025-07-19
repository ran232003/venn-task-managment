const MyError = require("../models/MyError");
const User = require("../models/user-schema");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendResetEmail } = require("../middleware/helperFunctions");

const signup = async (req, res, next) => {
  const { email, password, userName } = req.body;
  // Check if all required fields are provided
  try {
    // Check if the email already exists
    let checkUser = await User.findOne({ email: email });

    if (checkUser) {
      let err = new MyError("Email Exists");
      return next(err);
    }

    // Generate hashed password (12 salt rounds)
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);

    // Create new user
    let user = new User({
      email: email,
      password: hash,
      userName: userName,
      providers: [{ name: "local", providerId: null }],
    });

    // Save user to the database
    await user.save();
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password; // Remove password field
    // Generate a JWT token for authentication
    let token = jwt.sign({ id: user._id, email: email }, "my-secret", {
      expiresIn: "1d",
    });

    // Set token in cookie
    res.status(201);
    res.cookie("Auth_Cookie", token);

    return res.json({
      status: "ok",
      msg: "Success",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let checkUser = await User.findOne({ email: email });

    if (!checkUser) {
      let err = new MyError("User Was Not Found");
      return next(err);
    }
    let passwordCheck = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );
    if (!passwordCheck) {
      const err = new MyError("Wrong Details", 500);
      return next(err);
    }

    let token = jwt.sign({ id: checkUser._id, email: email }, "my-secret", {
      expiresIn: "1d",
    });
    res.status(201);
    res.cookie("Auth_Cookie", token);
    // res.setHeader("Set-Cookie", token);
    return res.json({ status: "ok", user: checkUser, msg: "Success" });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    return res.json({ status: "ok", user: user });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const authProviderSign = async (req, res, next) => {
  console.log("authProviderSign");

  const { email, name, provider, providerId } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    // 🆕 New user, create with this provider
    user = new User({
      email,
      userName: name,
      providers: [{ name: provider, providerId }],
    });
    await user.save();
    return res.status(201).json({ message: "User created", user });
  }

  // 🧠 Check if this provider is already linked
  const existingProvider = user.providers.find((p) => p.name === provider);

  if (existingProvider) {
    return res
      .status(200)
      .json({ status: "ok", message: "User already exists", user });
  }

  // 🔗 Link new provider
  user.providers.push({ name: provider, providerId });
  await user.save();
  return res
    .status(200)
    .json({ status: "ok", message: "Provider linked to user", user });
};
const signout = async (req, res) => {
  res.clearCookie("Auth_Cookie");
  res.json({ status: "ok" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id, email: user.email }, "secret", {
      expiresIn: "15m",
    });

    await sendResetEmail(user.email, token);

    res.status(200).json({ message: "Password reset link sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending reset link" });
  }
};
const verifyReset = async (req, res) => {
  const { token } = req.body;
  try {
    const payload = jwt.verify(token, "secret");
    res.status(200).json({ message: "Token valid", status: "ok" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
const verifyResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const payload = jwt.verify(token, "secret");
    const user = await User.findById(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
module.exports = {
  signup,
  verifyReset,
  verifyResetPassword,
  getUser,
  signout,
  signin,
  authProviderSign,
  forgotPassword,
};
