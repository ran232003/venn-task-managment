const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    company: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    timeZone: {
      type: Map,
      of: String,
    },
    emailNotification: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: false, // Only required for "local"
    },
    providers: [
      {
        name: {
          type: String,
          enum: ["local", "google.com", "facebook.com", "github"],
          required: true,
        },
        providerId: String, // UID from provider, optional for local
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
