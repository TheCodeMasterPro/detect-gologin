const express = require('express');
const app = express();

const axios = require('axios');

const cors = require('cors');
app.use(cors());

// Define a route that returns the user's IP address
app.get('/is-proxy', async (req, res) => {
  console.log(req.ip)
  try {
    // Make an API request using Axios
    const response = await axios.get(`https://vpnapi.io/api/${req.ip}?key=b68d8c79d0a84ad689bc4367b0ffedfd`);
    // Extract the data from the API response
    const apiData = response.data;
    console.log(response.data)
    // Send the API data as the response
    if (apiData.security.vpn || apiData.security.proxy) {
      res.send(true)
    }
    else {
      res.send(false)
    }
  } catch (error) {
    // Handle errors if the API request fails
    console.error('Error fetching API data:', error);
    res.send('Failed to fetch API data');
  }
});

// Start the Express server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});