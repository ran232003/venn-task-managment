const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/files";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Add timestamp to avoid collisions
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Allow multiple files and all types
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 5, // Maximum of 5 files
  },
  fileFilter: (req, file, cb) => {
    // Allow ALL file types
    const allowed = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".pdf",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".txt",
      ".csv",
      ".zip",
      ".rar",
      ".ppt",
      ".pptx",
    ];

    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Unsupported file type: ${ext}. Allowed types are ${allowed.join(
            ", "
          )}`
        )
      );
    }
  },
});

module.exports = upload;
