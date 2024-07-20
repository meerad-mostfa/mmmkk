// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log('Server is running');
    console.log(`Running on localhost: ${port}`);
}

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(req, res) {
    res.send(projectData);
}

// Post Route
app.post('/addWeatherData', addWeatherData);

function addWeatherData(req, res) {
    let data = req.body;
    projectData.temperature = data.temperature;
    projectData.date = data.date;
    projectData.user_response = data.user_response;
    res.send(projectData);
}

