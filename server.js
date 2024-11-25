const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Set up Multer storage with custom filename logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the folder where files will be saved
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Create a custom filename using the current timestamp and file extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

// Create the upload route that accepts multiple files
app.post("/upload", upload.array("files", 10), (req, res) => {
  // Handle the uploaded files
  if (!req.files) {
    return res.status(400).json({ message: "No files uploaded." });
  }
  res.json({ message: "Files uploaded successfully!", files: req.files });
});

// Create the 'uploads' folder if it doesn't exist
const fs = require('fs');
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

app.listen(5050, () => {
  console.log("Server is running on port 5050");
});
