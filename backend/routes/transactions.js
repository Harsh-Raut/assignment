const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

// Define routes for listing transactions with search and pagination
router.get('/', transactionsController.listTransactions);

module.exports = router;
