// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function(req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    try {
        // Extract the symbol and date from the request body
        const { symbol, date } = req.body;
    
        // Format the date in 'YYYY-MM-DD' format as required by the Polygon API
        const formattedDate = new Date(date).toISOString().split('T')[0];
    
        // Make a request to the Polygon API
        const response = await axios.get(
          `https://api.polygon.io/v1/open-close/${symbol}/${formattedDate}?apiKey=Kws8ISdvd6dirYWjrnc1wxFCUN2Xj2oG`
        );
    
        // Extract the relevant data from the API response
        const { open, high, low, close, volume } = response.data;
    
        // Return the data in JSON format
        res.json({ open, high, low, close, volume });
      } catch (error) {
        // Handle errors and return relevant response codes
        if (error.response && error.response.status === 404) {
          res.status(404).json({ error: 'Stock data not found for the given date.' });
        } else {
          res.status(500).json({ error: 'Internal server error.' });
        }
      }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));