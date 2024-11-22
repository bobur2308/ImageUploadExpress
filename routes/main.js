const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Save files with a timestamped filename
  },
});

const upload = multer({ storage });

// GET route to render the upload page
router.get('/uploads', async (req, res) => {
  try {
    const locals = {
      title: 'Upload Image',
      body: 'Upload image here',
    };
    res.render('upload', {
      locals,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// POST route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file; // The uploaded file details
    console.log(file);

    res.render('upload', {
      locals: {
        title: 'Upload Successful',
        body: `File ${file.originalname} uploaded successfully!`,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('upload', {
      locals: {
        title: 'Upload Failed',
        body: 'An error occurred while uploading the file.',
      },
    });
  }
});

module.exports = router;
