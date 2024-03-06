import React, { useState } from 'react';
import './App.css';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import SavingForm from './SavingForm';
import TransferToSaving from './Transfer';
import Balance from './Balance';

interface Transactions {
  id: number;
  source: string;
  amount: number;
  date: string;
}

type TotalBalance = number;

const App: React.FC = () => {
  const [incomes, setIncomes] = useState<Transactions[]>([]);
  const [expenses, setExpenses] = useState<Transactions[]>([]);
  const [savings, setSavings] = useState<number[]>([]);
  const [totalBalance, setTotalBalance] = useState<TotalBalance>(0);

  const handleExpenses = (source: string, amount: number, date: string) => {
    setExpenses((prevExpense) => [
      ...prevExpense,
      {
        id: Math.random(),
        source: source,
        amount: amount,
        date: date,
      },
    ]);
  };

  const handleIncome = (source: string, amount: number, date: string) => {
    setIncomes((prevIncome) => [
      ...prevIncome,
      {
        id: Math.random(),
        source: source,
        amount: amount,
        date: date,
      },
    ]);
  };

  const handleSaving = (amount: number) => {
    setSavings((prevSaving) => [...prevSaving, amount]);
  };

  const handleGetTotalBalance = (total: number) => {
    setTotalBalance(total);
  };

  return (
    <main className="main__container">
      <h1 className="budget__title">Budget App</h1>
      <section className="budget__group">
        <div className="budget__income">
          <IncomeForm onHandleIncome={handleIncome} incomes={incomes} />
        </div>
        <div className="budget__expense">
          <ExpenseForm
            onHandleExpenses={handleExpenses}
            totalBalance={totalBalance}
            expenses={expenses}
          />
        </div>
        <SavingForm savings={savings} />
      </section>
      <section className="balance__section">
        <Balance
          incomes={incomes}
          expenses={expenses}
          savings={savings}
          handleGetTotalBalance={handleGetTotalBalance}
        />
        <TransferToSaving
          onHandleSaving={handleSaving}
          totalBalance={totalBalance}
        />
      </section>
    </main>
  );
};

export default App;
