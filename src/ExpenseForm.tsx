import React, { useState } from 'react';
import './App.css';

interface ExpensesProps {
  expenses: { id: number; source: string; amount: number; date: string }[];
  onHandleExpenses: (source: string, amount: number, date: string) => void;
  onDeleteExpense: (id: number) => void;
  totalBalance: number;
}

const Expenses: React.FC<ExpensesProps> = ({ expenses, onHandleExpenses, onDeleteExpense, totalBalance }) => {
  const [source, setSource] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (source && amount && date) {
      if (totalBalance - amount >= 0) {
        onHandleExpenses(source, amount, date);
        setSource('');
        setAmount(0);
        setDate('');
      } else {
        alert('Insufficient balance.');
      }
    } else {
      alert('Input all the expense data');
    }
  };

  const sourceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const dateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="new__expense__source">Source of Expense:</label>
        <input
          type="text"
          name="expense"
          id="new__expense__source"
          value={source}
          onChange={(e) => sourceChangeHandler(e)}
        />
        <label htmlFor="new__expense__amount">Amount:</label>
        <input
          type="number"
          name="amount"
          id="new__expense__amount"
          value={amount}
          onChange={(e) => amountChangeHandler(e)}
        />
        <label htmlFor="new__expense__date">Date of Expense:</label>
        <input
          type="date"
          name="date"
          id="new__expense__date"
          value={date}
          onChange={(e) => dateChangeHandler(e)}
        />
        <div className="button-container">
          <input type="submit" value="Add Expense" />
        </div>
      </form>

      <div className="expense">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <p>
              {expense.source.toUpperCase()}: {expense.amount} on {expense.date}
            </p>
            <button onClick={() => onDeleteExpense(expense.id)} className="delete-button">
            ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;