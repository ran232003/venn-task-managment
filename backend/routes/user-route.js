let express = require("express");
const {
  signin,
  signup,
  getUser,
  signout,
  authProviderSign,
  forgotPassword,
  verifyReset,
  verifyResetPassword,
} = require("../controllers/user-controller");
const { verifyToken, checkSchema } = require("../middleware/helperFunctions");

const router = express.Router();
router.post("/signin", checkSchema("login.json"), signin);
router.post("/signup", checkSchema("authScema.json"), signup);
router.post(
  "/authProviderSign",
  checkSchema("authProviderSchema.json"),
  authProviderSign
);
router.post("/forgotPassword", forgotPassword);
router.post("/verify-reset-token", verifyReset);
router.post("/verify-reset-password", verifyResetPassword);

router.get("/getUser", verifyToken, getUser);
router.get("/signout", signout);

module.exports = router;
