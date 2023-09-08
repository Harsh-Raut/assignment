// backend/routes/initialize.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/Transaction');

router.get('/initialize', async (req, res) => {
  try {
    // Fetch data from the third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

    // Assuming the API response contains an array of transactions
    const transactionsData = response.data;

    // Save the data to the database
    await Transaction.insertMany(transactionsData);

    res.status(200).json({ message: 'Database initialized with seed data.' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Failed to initialize database.' });
  }
});

module.exports = router;
