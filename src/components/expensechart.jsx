
import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const ExpenseCharts = ({ transactions, theme }) => {

  // Monthly income and expense comparison
  const monthlyData = {
    labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [
      {
        label: 'Income',
        data: [35000, 42000, 38000, 50000, 45000, 62000],
        backgroundColor: '#16A34A',
        borderRadius: 6,
        barPercentage: 0.65
      },
      {
        label: 'Expenses',
        data: [18000, 22000, 25000, 20000, 28000, 11999],
        backgroundColor: '#EF4444',
        borderRadius: 6,
        barPercentage: 0.65
      }
    ]
  };

  // Calculate expenses category-wise
  const categoryTotals = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((result, transaction) => {
      result[transaction.category] =
        (result[transaction.category] || 0) + transaction.amount;

      return result;
    }, {});

  const categoryData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#6366F1',
          '#F59E0B',
          '#10B981',
          '#EC4899',
          '#06B6D4',
          '#8B5CF6'
        ],
        borderWidth: 0,
        hoverOffset: 8
      }
    ]
  };

  const textColor = theme === 'dark' ? '#CBD5E1' : '#64748B';
  const gridColor = theme === 'dark' ? '#334155' : '#E2E8F0';

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: textColor,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ₹${context.raw.toLocaleString('en-IN')}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor }
      },
      y: {
        beginAtZero: true,
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          callback: (value) => `₹${value / 1000}k`
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          padding: 18,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ₹${context.raw.toLocaleString('en-IN')}`
        }
      }
    }
  };

  return (
    <div className="charts-grid">

      <div className="chart-card">
        <div className="chart-heading">
          <div>
            <h3>Income vs Expenses</h3>
            <p>Monthly cash flow overview</p>
          </div>
        </div>

        <div className="bar-chart-container">
          <Bar data={monthlyData} options={barOptions} />
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-heading">
          <div>
            <h3>Expense Breakdown</h3>
            <p>Spending by category</p>
          </div>
        </div>

        <div className="doughnut-chart-container">
          <Doughnut data={categoryData} options={doughnutOptions} />
        </div>
      </div>

    </div>
  );
};

export default ExpenseCharts;
