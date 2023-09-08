const Transaction = require('../models/Transaction');

// Define price ranges
const priceRanges = [
  { min: 0, max: 100 },
  { min: 101, max: 200 },
  { min: 201, max: 300 },
  { min: 301, max: 400 },
  { min: 401, max: 500 },
  { min: 501, max: 600 },
  { min: 601, max: 700 },
  { min: 701, max: 800 },
  { min: 801, max: 900 },
  { min: 901, max: Infinity },
];

// Calculate data for the bar chart
const getChartData = async (month) => {
  try {
    const chartData = [];
    
    // Calculate the number of items in each price range for the selected month
    for (const range of priceRanges) {
      const count = await Transaction.countDocuments({
        dateOfSale: {
          $regex: new RegExp(`${month}-\\d{4}`), // Match month irrespective of year
        },
        price: { $gte: range.min, $lte: range.max },
      });
      
      chartData.push({ range: `${range.min}-${range.max}`, count });
    }
    
    return chartData;
  } catch (error) {
    throw new Error('Failed to calculate chart data');
  }
};

module.exports = {
  getChartData,
};
