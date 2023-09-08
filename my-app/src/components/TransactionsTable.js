import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    // TODO 1: Fetch transactions from the API based on searchText, page, and perPage
    const fetchData = async () => {
      try {
        const response = await api.get('/api/transactions', {
          params: { month: 'March', searchText, page, perPage }, // Replace 'March' with the selected month
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData(); // Call the fetchData function when dependencies change
  }, [searchText, page, perPage]);

  // TODO 3: Render the table with transactions, search input, and pagination controls
  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <table>
        {/* Render table headers */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            {/* Add more table headers if needed */}
          </tr>
        </thead>
        {/* Render table body with transaction data */}
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>${transaction.price}</td>
              {/* Add more table cells if needed */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
