
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import controllers
const authController = require('./controllers/authController');
const resumeController = require('./controllers/resumeController');
const jobController = require('./controllers/jobController');
const aiController = require('./controllers/aiController');
const indexController = require('./controllers/indexController');
const langchainController = require('./controllers/langchainController');

// Initialize the app
const app = express();

// Enable CORS
app.use(cors());

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authController);
app.use('/resume', resumeController);
app.use('/job', jobController);
app.use('/ai', aiController);
app.use('/index', indexController);
app.use('/langchain', langchainController);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Resume AI application.' });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;

