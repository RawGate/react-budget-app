import React from 'react';
import './App.css'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const expenseSchema = z.object({
  source: z.string().nonempty(),
  amount: z.number().positive(),
  date: z.string().nonempty(),
});

interface ExpensesProps {
  expenses: { id: number; source: string; amount: number; date: string }[];
  onHandleExpenses: (source: string, amount: number, date: string) => void;
  onDeleteExpense: (id: number) => void;
  totalBalance: number;
}

const Expenses: React.FC<ExpensesProps> = ({ expenses, onHandleExpenses, onDeleteExpense, totalBalance }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data: any) => {
    const validationResult = expenseSchema.safeParse(data);

    if (validationResult.success) {
      if (totalBalance - data.amount >= 0) {
        onHandleExpenses(data.source, data.amount, data.date);
        reset();
      } else {
        alert('Insufficient balance.');
      }
    } else {
      alert('Please provide valid expense details.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="new__expense__source">Source of Expense:</label>
        <input
          type="text"
          id="new__expense__source"
          {...register('source', { required: true })}
        />
        {errors.source && <span className="error">Source is required</span>}

        <label htmlFor="new__expense__amount">Amount:</label>
        <input
          type="number"
          id="new__expense__amount"
          {...register('amount', { required: true, valueAsNumber: true })}
        />
        {errors.amount && <span className="error">Amount is required</span>}

        <label htmlFor="new__expense__date">Date of Expense:</label>
        <input
          type="date"
          id="new__expense__date"
          {...register('date', { required: true })}
        />
        {errors.date && <span className="error">Date is required</span>}

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