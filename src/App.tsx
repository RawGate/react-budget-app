import React, { useState, useMemo, useCallback } from 'react';
import './App.css';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import SavingForm from './components/SavingForm';
import TransferToSaving from './components/Transfer';
import Balance from './components/Balance';

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

  const handleExpenses = useCallback((source: string, amount: number, date: string) => {
    setExpenses((prevExpense) => [
      ...prevExpense,
      {
        id: Math.random(),
        source: source,
        amount: amount,
        date: date,
      },
    ]);
  }, []);

  const handleIncome = useCallback((source: string, amount: number, date: string) => {
    setIncomes((prevIncome) => [
      ...prevIncome,
      {
        id: Math.random(),
        source: source,
        amount: amount,
        date: date,
      },
    ]);
  }, []);

  const handleSaving = useCallback((amount: number) => {
    setSavings((prevSaving) => [...prevSaving, amount]);
  }, []);

  const handleGetTotalBalance = useCallback((total: number) => {
    setTotalBalance(total);
  }, []);

  const handleDeleteExpense = useCallback((id: number) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  }, []);

  const handleDeleteIncome = useCallback((id: number) => {
    setIncomes((prevIncomes) => prevIncomes.filter((income) => income.id !== id));
  }, []);

  const memoizedIncomeForm = useMemo(
    () => (
      <IncomeForm
        onHandleIncome={handleIncome}
        incomes={incomes}
        onDeleteIncome={handleDeleteIncome}
      />
    ),
    [handleIncome, incomes, handleDeleteIncome]
  );

  const memoizedExpenseForm = useMemo(
    () => (
      <ExpenseForm
        onHandleExpenses={handleExpenses}
        onDeleteExpense={handleDeleteExpense}
        totalBalance={totalBalance}
        expenses={expenses}
      />
    ),
    [handleExpenses, handleDeleteExpense, totalBalance, expenses]
  );

  const memoizedSavingForm = useMemo(() => <SavingForm savings={savings} />, [savings]);

  const memoizedBalance = useMemo(
    () => (
      <Balance
        incomes={incomes}
        expenses={expenses}
        savings={savings}
        handleGetTotalBalance={handleGetTotalBalance}
      />
    ),
    [incomes, expenses, savings, handleGetTotalBalance]
  );

  const memoizedTransferToSaving = useMemo(
    () => <TransferToSaving onHandleSaving={handleSaving} totalBalance={totalBalance} />,
    [handleSaving, totalBalance]
  );

  return (
    <main className="main__container">
      <h1 className="budget__title">Budget App</h1>
      <section className="budget__group">
        <div className="budget__income">{memoizedIncomeForm}</div>
        <div className="budget__expense">{memoizedExpenseForm}</div>
        {memoizedSavingForm}
      </section>
      <section className="balance__section">
        {memoizedBalance}
        {memoizedTransferToSaving}
      </section>
    </main>
  );
};

export default App;