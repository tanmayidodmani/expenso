
import React from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiSave } from 'react-icons/fi';

import SummaryCard from '../components/summary';
import { calculateTotal, calculateBalance } from '../utils/calculations';

import './Dashboard.css';
import ExpenseCharts from '../components/expensechart';
import RecentTransactions from '../components/recenttransactions';
import TransactionForm from '../components/transactionform';

const Dashboard = ({ theme,transactions, onAddTransaction }) => {
  const income = calculateTotal(transactions, 'income');
  const expenses = calculateTotal(transactions, 'expense');
  const balance = calculateBalance(transactions);

  const savingsRate = income > 0
    ? ((balance / income) * 100).toFixed(1)
    : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-welcome">
        <div>
          <h1>Dashboard</h1>
          <p>Here's what's happening with your money.</p>
        </div>

        <button className="date-btn">
          This Month ▾
        </button>
      </div>

      <section className="summary-grid">
        <SummaryCard
          title="Total Balance"
          amount={formatCurrency(balance)}
          icon={<FiDollarSign />}
          color="#4F46E5"
          subtitle="Income minus expenses"
        />

     
        
        <SummaryCard
          title="Total Income"
          amount={formatCurrency(income)}
          icon={<FiTrendingUp />}
          color="#16A34A"
          subtitle="Money received"
        />

        <SummaryCard
          title="Total Expenses"
          amount={formatCurrency(expenses)}
          icon={<FiTrendingDown />}
          color="#EF4444"
          subtitle="Money spent"
        />

        <SummaryCard
          title="Savings Rate"
          amount={`${savingsRate}%`}
          icon={<FiSave />}
          color="#8B5CF6"
          subtitle="Income saved"
        />
      </section>

         <section className="add-transaction-section">
  <TransactionForm onAddTransaction={onAddTransaction} />
        </section>

      <section className="dashboard-charts">
  <ExpenseCharts
    transactions={transactions}
    theme={theme}
  />
</section>

      <section className="dashboard-bottom">
  <RecentTransactions transactions={transactions} />
      </section>
    </div>
  );
};

export default Dashboard;
