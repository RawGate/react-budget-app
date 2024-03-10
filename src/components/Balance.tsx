import React from 'react';

interface Transaction {
  id: number;
  source: string;
  amount: number;
  date: string;
}

interface BalanceProps {
  incomes: Transaction[];
  expenses: Transaction[];
  savings: number[];
  handleGetTotalBalance: (total: number) => void;
}

const Balance: React.FC<BalanceProps> = (props) => {
  let totalBalance: number = 0;

  const totalIncomeArr: number[] = props.incomes.map((income) => {
    return income.amount;
  });

  const totalIncome: number = totalIncomeArr.reduce(
    (total, current) => total + current,
    0
  );

  const totalExpenseArr: number[] = props.expenses.map(
    (expense) => expense.amount
  );

  const totalSavings: number = props.savings.reduce(
    (total, current) => total + current,
    0
  );

  const totalExpense: number = totalExpenseArr.reduce(
    (total, current) => total + current,
    0
  );

  totalBalance = totalIncome - totalExpense - totalSavings;

  props.handleGetTotalBalance(totalBalance);

  return (
    <>
      <h2>
        Total balance:{' '}
        <span>{totalBalance}</span>
      </h2>
    </>
  );
}

export default Balance;