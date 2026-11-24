
import React from 'react';
import {
  FiShoppingBag,
  FiCoffee,
  FiZap,
  FiWifi,
  FiBriefcase,
  FiDollarSign,
  FiMoreHorizontal
} from 'react-icons/fi';

const categoryIcons = {
  Food: <FiCoffee />,
  Shopping: <FiShoppingBag />,
  Utilities: <FiZap />,
  Freelance: <FiBriefcase />,
  Salary: <FiDollarSign />,
  Other: <FiMoreHorizontal />
};

const RecentTransactions = ({ transactions }) => {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="transactions-card">
      <div className="transactions-heading">
        <div>
          <h3>Recent Transactions</h3>
          <p>Your latest money activity</p>
        </div>

        <button className="view-all-btn">
          View All
        </button>
      </div>

      <div className="transactions-list">
        {recentTransactions.map((transaction) => (
          <div className="transaction-row" key={transaction.id}>
            <div className="transaction-left">
              <div className={`transaction-icon ${transaction.type}`}>
                {categoryIcons[transaction.category] || <FiWifi />}
              </div>

              <div className="transaction-info">
                <h4>{transaction.title}</h4>
                <span>
                  {transaction.category} · {formatDate(transaction.date)}
                </span>
              </div>
            </div>

            <div className={`transaction-amount ${transaction.type}`}>
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
