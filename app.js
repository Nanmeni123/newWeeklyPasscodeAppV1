const axios = require('axios');
const path = require('path');
const crypto = require('crypto');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Route for serving the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Route for generating the weekly passcode
app.get('/passcode-generator', async (req, res) => {
    console.log('Generating the weekly passcode.');

    // Retrieve environment variables
    const bearerToken = process.env.Bearer_Token;
    const eventId = process.env.Event_ID;
    const updateEventEndpoint = process.env.Update_event_passcode;
    const xSwitchUser = process.env.X_Switch_User;

    // Log the values of environment variables only in non-production environments
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Bearer_Token: ${bearerToken}`);
        console.log(`Event_ID: ${eventId}`);
        console.log(`Update_event_passcode: ${updateEventEndpoint}`);
        console.log(`X_Switch_User: ${xSwitchUser}`);
    }

    if (!bearerToken || !eventId || !updateEventEndpoint || !xSwitchUser) {
        console.error('One or more environment variables are missing.');
        res.status(500).send('Missing environment variables');
        return;
    }

    // Check if it's the beginning of the week (Monday)
    const currentDay = new Date().getDay();
    if (currentDay !== 1) {
        console.log('It is not Monday, no passcode generated.');
        res.status(200).send('It is not Monday, passcode remains unchanged.');
        return;
    }

    // Generate the passcode
    const passcode = generatePasscode();
    const headers = {
        'Authorization': `Bearer ${bearerToken}`,
        'X-Switch-User': xSwitchUser,
        'Content-Type': 'application/json'
    };
    const data = {
        passcode: passcode
    };

    try {
        console.log(`Sending PUT request to ${updateEventEndpoint}/${eventId} with data:`, data);
        // Make the PUT request to update the passcode via the API
        const response = await axios.put(`${updateEventEndpoint}/${eventId}`, data, { headers });
        console.log(`API response: ${response.status} - ${response.data}`);

        if (response.status === 200) {
            res.status(200).send(`Passcode updated successfully: ${passcode}`);
        } else {
            console.error(`Failed to update passcode. API response: ${response.data}`);
            res.status(response.status).send(`Failed to update passcode. API response: ${response.data}`);
        }
    } catch (error) {
        console.error(`Request error: ${error.message}`);
        res.status(500).send(`Request error: ${error.message}`);
    }
});

// Function to generate a passcode
function generatePasscode() {
    const specialCharacters = '!@#$%^&*';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';

    return [
        letters.charAt(crypto.randomInt(letters.length)),
        letters.charAt(crypto.randomInt(letters.length)).toLowerCase(),
        letters.charAt(crypto.randomInt(letters.length)).toUpperCase(),
        digits.charAt(crypto.randomInt(digits.length)),
        specialCharacters.charAt(crypto.randomInt(specialCharacters.length))
    ].join('');
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
