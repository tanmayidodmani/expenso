import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Header from './components/header';
import Sidebar from './components/sidebar';
import { transactions as initialTransactions } from './data/sampledata';
import './App.css';
import Transactions from './pages/transactions';
import Analytics from './pages/analytics';
import Settings from './pages/settings';



const STORAGE_KEY = 'expenseflow_transactions';
const App = () => {
  const [ theme, setTheme ] = useState( 'light' );
  const [ transactions, setTransactions ] = useState( () => {
    const savedTransactions = localStorage.getItem( STORAGE_KEY );

    if ( savedTransactions ) {
      return JSON.parse( savedTransactions );
    }

    return initialTransactions;
  } );
  const toggleTheme = () => {
    setTheme( prev => prev === 'light' ? 'dark' : 'light' );
  };
  const handleAddTransaction = ( newTransaction ) => {
    setTransactions( ( prevTransactions ) => [
      newTransaction,
      ...prevTransactions
    ] );
  };

  const handleDeleteTransaction = ( id ) => {
    setTransactions( ( prevTransactions ) =>
      prevTransactions.filter( ( transaction ) => transaction.id !== id )
    );
  };


  const [ profile, setProfile ] = useState( () => {
    const savedProfile = localStorage.getItem( 'expenseflow_profile' );

    return savedProfile
      ? JSON.parse( savedProfile )
      : {
        name: 'User',
        email: 'user@example.com'
      };
  } );

  const handleUpdateProfile = ( updatedProfile ) => {
    setProfile( updatedProfile );

    localStorage.setItem(
      'expenseflow_profile',
      JSON.stringify( updatedProfile )
    );

    alert( 'Profile updated successfully!' );




  };


  useEffect( () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify( transactions )
    );
  }, [ transactions ] );

  return (
    <BrowserRouter basename="/expenso">
      <div className="app" data-theme={ theme }>
<Header
  theme={theme}
  toggleTheme={toggleTheme}
  profile={profile}
/>
        <div className="app-layout">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    theme={ theme }
                    transactions={ transactions }
                    onAddTransaction={ handleAddTransaction }
                  />
                }
              />
              <Route
                path="/transactions"
                element={
                  <Transactions
                    transactions={ transactions }
                    onDeleteTransaction={ handleDeleteTransaction }
                  />
                }
              />
              <Route
                path="/analytics"
                element={ <Analytics transactions={ transactions } /> }
              />
              <Route
                path="/settings"
                element={
                  <Settings
                    profile={ profile }
                    onUpdateProfile={ handleUpdateProfile }
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
