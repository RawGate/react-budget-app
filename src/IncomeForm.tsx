import React, { useState } from 'react';
import './App.css';


interface IncomeProps {
  incomes: { id: number; source: string; amount: number; date: string }[];
  onHandleIncome: (source: string, amount: number, date: string) => void;
}

const IncomeForm: React.FC<IncomeProps> = ({ incomes, onHandleIncome }) => {
  const [source, setSource] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (source && amount && date) {
      onHandleIncome(source, amount, date);
      setSource('');
      setAmount(0);
      setDate('');
    } else {
      alert('Please write all the income details.');
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
        <label htmlFor="new__income__source">Source of Income:</label>
        <input
          type="text"
          name="income"
          id="new__income__source"
          value={source}
          onChange={(e) => sourceChangeHandler(e)}
        />
        <label htmlFor="new__income__amount">Amount:</label>
        <input
          type="number"
          name="amount"
          id="new__income__amount"
          value={amount}
          onChange={(e) => amountChangeHandler(e)}
        />
        <label htmlFor="new__income__date">Date of Income:</label>
        <input
          type="date"
          name="date"
          id="new__income__date"
          value={date}
          onChange={(e) => dateChangeHandler(e)}
        />
        <div className="button-container">
          <input type="submit" value="Add Income" />
        </div>
      </form>

      <div className="expense-history">
        {incomes.map((income) => {
          return (
            <p key={income.id}>
              {income.source.toUpperCase()}: {income.amount} on {income.date}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default IncomeForm;