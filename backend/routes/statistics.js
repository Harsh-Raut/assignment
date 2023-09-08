const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// API to get statistics for a selected month
router.get('/', async (req, res) => {
  try {
    const { month } = req.query;
    
    // Calculate total sale amount for the selected month
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: {
            $regex: new RegExp(`${month}-\\d{4}`), // Match month irrespective of year
          },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$price' },
        },
      },
    ]);
    
    // Calculate total number of sold and not sold items for the selected month
    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: {
        $regex: new RegExp(`${month}-\\d{4}`), // Match month irrespective of year
      },
      sold: true,
    });
    
    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: {
        $regex: new RegExp(`${month}-\\d{4}`), // Match month irrespective of year
      },
      sold: false,
    });
    
    res.json({
      totalSaleAmount: totalSaleAmount.length ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
