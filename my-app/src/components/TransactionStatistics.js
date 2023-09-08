import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TransactionStatistics = () => {
  const [selectedMonth, setSelectedMonth] = useState('March'); // Default selected month
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);

  useEffect(() => {
    // TODO: Fetch statistics data based on the selected month
    const fetchData = async () => {
      try {
        const response = await api.get('/api/statistics', {
          params: { month: selectedMonth },
        });
        const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = response.data;
        setTotalSaleAmount(totalSaleAmount);
        setTotalSoldItems(totalSoldItems);
        setTotalNotSoldItems(totalNotSoldItems);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData(); // Call the fetchData function when the selected month changes
  }, [selectedMonth]);

  return (
    <div>
      <h2>Transaction Statistics</h2>
      <div>
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {/* Add options for each month */}
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          {/* Add options for other months */}
        </select>
      </div>
      <div>
        <p>Total Sale Amount: ${totalSaleAmount}</p>
        <p>Total Sold Items: {totalSoldItems}</p>
        <p>Total Not Sold Items: {totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default TransactionStatistics;
