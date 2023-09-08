import React from 'react';
import './App.css';
import TransactionsTable from './components/TransactionsTable';
import TransactionStatistics from './components/TransactionStatistics';
import TransactionsChart from './components/TransactionsChart';

function App() {
  return (
    <div className="App">
      <h1>Transaction Dashboard</h1>
      {/* Render the TransactionsTable component */}
      <TransactionsTable />
      
      {/* Render the TransactionStatistics component */}
      <TransactionStatistics />
      
      {/* Render the TransactionsChart component */}
      <TransactionsChart />
    </div>
  );
}

export default App;
