const Transaction = require('../models/Transaction');

// Calculate statistics for a selected month
const getStatistics = async (month) => {
  try {
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
    
    return {
      totalSaleAmount: totalSaleAmount.length ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    };
  } catch (error) {
    throw new Error('Failed to calculate statistics');
  }
};

module.exports = {
  getStatistics,
};
