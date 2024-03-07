import React, { useState } from 'react';
import { z } from 'zod';
import './App.css';

const incomeSchema = z.object({
  source: z.string().nonempty(),
  amount: z.number().positive(),
  date: z.string().nonempty(),
});

interface IncomeProps {
  incomes: {
    id: number;
    source: string;
    amount: number;
    date: string;
  }[];
  onHandleIncome: (source: string, amount: number, date: string) => void;
  onDeleteIncome: (id: number) => void;
}

const IncomeForm: React.FC<IncomeProps> = ({
  incomes,
  onHandleIncome,
  onDeleteIncome,
}) => {
  const [source, setSource] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { source, amount: Number(amount), date };

    const validationResult = incomeSchema.safeParse(data);

    if (validationResult.success) {
      onHandleIncome(source, Number(amount), date);
      setSource('');
      setAmount('');
      setDate('');
    } else {
      alert('Please provide valid income details.');
    }
  };

  const sourceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
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
          id="new__income__source"
          value={source}
          onChange={sourceChangeHandler}
        />

        <label htmlFor="new__income__amount">Amount:</label>
        <input
          type="number"
          id="new__income__amount"
          value={amount}
          onChange={amountChangeHandler}
        />

        <label htmlFor="new__income__date">Date of Income:</label>
        <input
          type="date"
          id="new__income__date"
          value={date}
          onChange={dateChangeHandler}
        />

        <div className="button-container">
          <input type="submit" value="Add Income" />
        </div>
      </form>

      <div className="income-history">
        {incomes.map((income) => (
          <div key={income.id} className="income-item">
            <p>
              {income.source.toUpperCase()}: {income.amount} on {income.date}
            </p>
            <button
              onClick={() => onDeleteIncome(income.id)}
              className="delete-button"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeForm;