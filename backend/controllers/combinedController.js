const statisticsController = require('./statisticsController');
const chartController = require('./chartController');

// Combine statistics and chart data for a selected month
const getCombinedData = async (month) => {
  try {
    const statistics = await statisticsController.getStatistics(month);
    const chartData = await chartController.getChartData(month);
    
    return {
      statistics,
      chartData,
    };
  } catch (error) {
    throw new Error('Failed to fetch combined data');
  }
};

module.exports = {
  getCombinedData,
};
