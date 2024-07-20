// Global Variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '661daa7377189bfe425b6af1f07ac279';

// Create a new date instance dynamically with JS
const currentDate = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

// Event listener for button click
document.getElementById('generate').addEventListener('click', () => {
    const zipCode = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value;
    
    // Call performAction function to handle fetching data and updating UI
    performAction(zipCode, userFeelings);
});

// Function to handle button click action
async function performAction(zipCode, feelings) {
    try {
        // Fetch weather data
        const weatherData = await getWeatherData(zipCode);
        
        // Post weather data to server
        await postData('http://localhost:8080/addWeatherData', {
            temperature: weatherData.main.temp,
            date: currentDate,
            user_response: feelings
        });

        // Update UI with latest data
        updateUI();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Async function to fetch weather data from API
async function getWeatherData(zipCode) {
    const url = `${baseURL}${zipCode},us&APPID=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
    }
    return await response.json();
}

// Async function to post data to server
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Failed to post data. Status: ${response.status}`);
    }
    return await response.json();
}

// Async function to update UI with latest data from server
async function updateUI() {
    try {
        const response = await fetch('http://localhost:8080/all');
        if (!response.ok) {
            throw new Error(`Failed to fetch data from server. Status: ${response.status}`);
        }
        const allData = await response.json();
        document.getElementById('date').textContent = allData.date;
        document.getElementById('temp').textContent = allData.temperature;
        document.getElementById('content').textContent = allData.user_response;
    } catch (error) {
        console.error('Error:', error);
    }
}
