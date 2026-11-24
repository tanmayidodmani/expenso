import React, { useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

import { Line, Doughnut } from 'react-chartjs-2';
import './Analytics.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler
);


const Analytics = ( { transactions } ) => {
    const [ period, setPeriod ] = useState( '6' );

    const now = new Date();

    const filteredTransactions = useMemo( () => {
        const startDate = new Date(
            now.getFullYear(),
            now.getMonth() - Number( period ) + 1,
            1
        );

        return transactions.filter( ( transaction ) => {
            const date = new Date( transaction.date );

            return date >= startDate && date <= now;
        } );
    }, [ transactions, period ] );

    const income = filteredTransactions
        .filter( ( t ) => t.type === 'income' )
        .reduce( ( sum, t ) => sum + Number( t.amount ), 0 );

    const expenses = filteredTransactions
        .filter( ( t ) => t.type === 'expense' )
        .reduce( ( sum, t ) => sum + Number( t.amount ), 0 );

    const savings = income - expenses;

    const monthlyAverage = expenses / Number( period );

    const formatCurrency = ( amount ) =>
        new Intl.NumberFormat( 'en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        } ).format( amount );

    // Monthly chart data
    const monthlyData = useMemo( () => {
        const months = [];

        for ( let i = Number( period ) - 1; i >= 0; i-- ) {
            const date = new Date( now.getFullYear(), now.getMonth() - i, 1 );

            months.push( {
                key: `${ date.getFullYear() }-${ date.getMonth() }`,
                label: date.toLocaleDateString( 'en-IN', {
                    month: 'short',
                    year: '2-digit'
                } ),
                income: 0,
                expenses: 0
            } );
        }

        filteredTransactions.forEach( ( transaction ) => {
            const date = new Date( transaction.date );
            const key = `${ date.getFullYear() }-${ date.getMonth() }`;

            const month = months.find( ( m ) => m.key === key );

            if ( month ) {
                if ( transaction.type === 'income' ) {
                    month.income += Number( transaction.amount );
                } else {
                    month.expenses += Number( transaction.amount );
                }
            }
        } );

        return months;
    }, [ filteredTransactions, period ] );

    // Category breakdown
    const categoryData = useMemo( () => {
        const categories = {};

        filteredTransactions
            .filter( ( t ) => t.type === 'expense' )
            .forEach( ( transaction ) => {
                categories[ transaction.category ] =
                    ( categories[ transaction.category ] || 0 ) +
                    Number( transaction.amount );
            } );

        return Object.entries( categories )
            .map( ( [ name, amount ] ) => ( { name, amount } ) )
            .sort( ( a, b ) => b.amount - a.amount );
    }, [ filteredTransactions ] );

    const lineData = {
        labels: monthlyData.map( ( month ) => month.label ),
        datasets: [
            {
                label: 'Income',
                data: monthlyData.map( ( month ) => month.income ),
                borderColor: '#16a34a',
                backgroundColor: 'rgba(22,163,74,0.10)',
                tension: 0.4,
                fill: false
            },
            {
                label: 'Expenses',
                data: monthlyData.map( ( month ) => month.expenses ),
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239,68,68,0.10)',
                tension: 0.4,
                fill: false
            }
        ]
    };

    const doughnutData = {
        labels: categoryData.map( ( category ) => category.name ),
        datasets: [
            {
                data: categoryData.map( ( category ) => category.amount ),
                backgroundColor: [
                    '#6366f1',
                    '#f59e0b',
                    '#10b981',
                    '#ec4899',
                    '#8b5cf6',
                    '#06b6d4',
                    '#f97316',
                    '#64748b'
                ],
                borderWidth: 0
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };

    const lineOptions = {
        ...chartOptions,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: ( value ) => `₹${ value.toLocaleString( 'en-IN' ) }`
                }
            }
        }
    };

    const topCategory = categoryData[ 0 ];

    return (

        <div className="analytics-page">

            {/* HEADER */ }
            <div className="analytics-header">
                <div>
                    <h1>Financial Analytics</h1>
                    <p>Understand your spending habits and financial trends.</p>
                </div>

                <select
                    value={ period }
                    onChange={ ( e ) => setPeriod( e.target.value ) }
                >
                    <option value="3">Last 3 Months</option>
                    <option value="6">Last 6 Months</option>
                    <option value="12">Last 12 Months</option>
                </select>
            </div>

            {/* SUMMARY CARDS */ }
            <div className="analytics-summary">

                <div className="analytics-card">
                    <span>Total Income</span>
                    <h2 className="income-text">{ formatCurrency( income ) }</h2>
                    <p>Income in selected period</p>
                </div>

                <div className="analytics-card">
                    <span>Total Expenses</span>
                    <h2 className="expense-text">{ formatCurrency( expenses ) }</h2>
                    <p>Expenses in selected period</p>
                </div>

                <div className="analytics-card">
                    <span>Net Savings</span>
                    <h2 className={ savings >= 0 ? 'income-text' : 'expense-text' }>
                        { formatCurrency( savings ) }
                    </h2>
                    <p>Income minus expenses</p>
                </div>

                <div className="analytics-card">
                    <span>Monthly Average Spending</span>
                    <h2>{ formatCurrency( monthlyAverage ) }</h2>
                    <p>Average expenses per month</p>
                </div>

            </div>

            {/* CHARTS */ }
            <div className="analytics-chart-grid">

                <div className="analytics-chart-card">
                    <div className="analytics-card-heading">
                        <h3>Income vs Expenses</h3>
                        <p>Your monthly financial comparison</p>
                    </div>

                    <div className="analytics-line-chart">
                        <Line data={ lineData } options={ lineOptions } />
                    </div>
                </div>

                <div className="analytics-chart-card">
                    <div className="analytics-card-heading">
                        <h3>Spending by Category</h3>
                        <p>Where your money is going</p>
                    </div>

                    <div className="analytics-doughnut-chart">
                        { categoryData.length > 0 ? (
                            <Doughnut data={ doughnutData } options={ chartOptions } />
                        ) : (
                            <p className="analytics-empty">No expense data for this period.</p>
                        ) }
                    </div>
                </div>

            </div>

            {/* TOP CATEGORY */ }
            <div className="analytics-top-category">
                <div>
                    <h3>Highest Spending Category</h3>
                    <p>Your biggest expense in the selected period</p>
                </div>

                { topCategory ? (
                    <div className="top-category-result">
                        <span>{ topCategory.name }</span>
                        <strong>{ formatCurrency( topCategory.amount ) }</strong>
                    </div>
                ) : (
                    <p>No expenses recorded yet.</p>
                ) }
            </div>

        </div>

    );
};

export default Analytics;
