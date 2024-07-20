// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
// Configure express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8080;

// Spin up the server
const server = app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
});

// GET route that returns the projectData object
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route
app.post('/addWeatherData', (req, res) => {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.user_response = req.body.user_response;
    console.log(projectData);
    res.end();
});
