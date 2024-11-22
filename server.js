require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware setup
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files like uploaded images
app.use('/uploads', express.static('uploads'));

// Import and use the routes
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes); // Attach all routes from main.js

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
