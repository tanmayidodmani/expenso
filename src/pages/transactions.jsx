
import React, { useState } from 'react';
import './Transactions.css';
import { FiSearch, FiTrash2 } from 'react-icons/fi';

const Transactions = ({ transactions, onDeleteTransaction }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [...new Set(transactions.map((t) => t.category))];

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        typeFilter === 'all' || transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === 'all' || transaction.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

  return (
    <div className="transactions-page">

      <div className="transactions-page-header">
        <div>
          <h1>Transactions</h1>
          <p>Manage and track all your money activity.</p>
        </div>

        <div className="transactions-count">
          {filteredTransactions.length} transactions
        </div>
      </div>

      <div className="transactions-toolbar">

        <div className="transaction-search">
          <FiSearch />

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

      </div>

      <div className="transactions-table-card">

        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <div className="table-transaction-title">
                        {transaction.title}
                      </div>
                    </td>

                    <td>{transaction.category}</td>

                    <td>{formatDate(transaction.date)}</td>

                    <td>
                      <span className={`type-badge ${transaction.type}`}>
                        {transaction.type}
                      </span>
                    </td>

                    <td className={`table-amount ${transaction.type}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </td>

                    <td>
                      <button
                        className="delete-transaction-btn"
                        onClick={() => onDeleteTransaction(transaction.id)}
                        title="Delete transaction"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-transactions">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default Transactions;
