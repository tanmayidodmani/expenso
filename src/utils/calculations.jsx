
export const calculateTotal = (transactions, type) => {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const calculateBalance = (transactions) => {
  const income = calculateTotal(transactions, 'income');
  const expenses = calculateTotal(transactions, 'expense');

  return income - expenses;
};
