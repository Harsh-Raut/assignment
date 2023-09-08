const Transaction = require('../models/Transaction');

// Implement listTransactions controller function
const listTransactions = async (req, res) => {
  try {
    const { month, searchText, page, perPage } = req.query;

    // Define the initial query to find transactions for the selected month
    const query = {
      dateOfSale: {
        $regex: new RegExp(`${month}-\\d{4}`), // Match month irrespective of year
      },
    };

    // Add search logic if searchText is provided
    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: 'i' } }, // Case-insensitive title search
        { description: { $regex: searchText, $options: 'i' } }, // Case-insensitive description search
        { price: { $eq: parseInt(searchText) } }, // Exact price match
      ];
    }

    // Calculate skip and limit for pagination
    const skip = (page - 1) * perPage;
    const limit = parseInt(perPage);

    // Fetch transactions based on the query, skip, and limit
    const transactions = await Transaction.find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    // Calculate the total count of transactions matching the query
    const totalTransactionsCount = await Transaction.countDocuments(query);

    // Return the results as JSON response
    res.json({
      transactions,
      totalTransactionsCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  listTransactions,
};
