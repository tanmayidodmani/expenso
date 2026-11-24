
import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const expenseCategories = [
    'Food',
    'Shopping',
    'Utilities',
    'Transport',
    'Health',
    'Entertainment',
    'Education',
    'Other'
  ];

  const incomeCategories = [
    'Salary',
    'Freelance',
    'Business',
    'Investment',
    'Other'
  ];

  const categories = type === 'income'
    ? incomeCategories
    : expenseCategories;

  const handleTypeChange = (newType) => {
    setType(newType);

    setCategory(
      newType === 'income' ? 'Salary' : 'Food'
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0 || !date) {
      alert('Please enter valid transaction details.');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date
    };

    onAddTransaction(newTransaction);

    setTitle('');
    setAmount('');
    setType('expense');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="transaction-form-card">
      <div className="transaction-form-heading">
        <h3>Add Transaction</h3>
        <p>Record your income or expenses</p>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form">

        <div className="transaction-type-toggle">
          <button
            type="button"
            className={type === 'income' ? 'active income-btn' : ''}
            onClick={() => handleTypeChange('income')}
          >
            Income
          </button>

          <button
            type="button"
            className={type === 'expense' ? 'active expense-btn' : ''}
            onClick={() => handleTypeChange('expense')}
          >
            Expense
          </button>
        </div>

        <div className="form-group">
          <label>Transaction Title</label>
          <input
            type="text"
            placeholder="e.g. Grocery shopping"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <button type="submit" className="add-transaction-btn">
          Add Transaction
        </button>

      </form>
    </div>
  );
};

export default TransactionForm;
