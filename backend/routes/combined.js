const express = require('express');
const router = express.Router();
const axios = require('axios');

// API to fetch data from multiple endpoints and combine the responses
router.get('/', async (req, res) => {
  try {
    const { month } = req.query;
    
    // Define the URLs of the endpoints you want to fetch data from
    const statisticsURL = `http://localhost:3001/api/statistics?month=${month}`;
    const chartDataURL = `http://localhost:3001/api/charts?month=${month}`;
    
    // Make parallel requests to fetch data from the endpoints
    const [statisticsResponse, chartDataResponse] = await Promise.all([
      axios.get(statisticsURL),
      axios.get(chartDataURL),
    ]);
    
    const combinedData = {
      statistics: statisticsResponse.data,
      chartData: chartDataResponse.data,
    };
    
    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
