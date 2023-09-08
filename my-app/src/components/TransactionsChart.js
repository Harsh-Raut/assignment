import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TransactionsChart = () => {
  const [selectedMonth, setSelectedMonth] = useState('March'); // Default selected month
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // TODO: Fetch chart data based on the selected month
    const fetchData = async () => {
      try {
        const response = await api.get('/api/charts', {
          params: { month: selectedMonth },
        });
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the selected month changes
  }, [selectedMonth]);

  return (
    <div>
      <h2>Transactions Chart</h2>
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
      <div style={{ width: '100%', height: 400 }}>
        {/* Render the bar chart */}
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Number of Items" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionsChart;
