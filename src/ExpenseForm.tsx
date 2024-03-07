import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

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

const Expenses: React.FC<ExpensesProps> = ({
  expenses,
  onHandleExpenses,
  onDeleteExpense,
  totalBalance,
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data: any) => {
    const validationResult = expenseSchema.safeParse(data);

    if (validationResult.success) {
      if (totalBalance - data.amount >= 0) {
        onHandleExpenses(data.source, data.amount, data.date);
        reset();
      } else {
        toast.error('Insufficient balance.');
      }
    } else {
      toast.error('Please provide valid expense details.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <label htmlFor="new__expense__source">Source of Expense:</label>
          <input
            type="text"
            id="new__expense__source"
            {...register('source', { required: true })}
          />
        </div>

        <div className="input-box">
          <label htmlFor="new__expense__amount">Amount:</label>
          <input
            type="number"
            id="new__expense__amount"
            {...register('amount', { required: true, valueAsNumber: true })}
          />
        </div>

        <div className="input-box">
          <label htmlFor="new__expense__date">Date of Expense:</label>
          <input
            type="date"
            id="new__expense__date"
            {...register('date', { required: true })}
          />
        </div>

        <div className="button-container">
          <input type="submit" value="Add Expense" />
        </div>
      </form>

      <div className="expense-history">
        {expenses.map((expense) => (
          <div key={expense.id} className="history-item">
            <p>
              {expense.source.toUpperCase()}: {expense.amount} on {expense.date}
            </p>
            <button onClick={() => onDeleteExpense(expense.id)} className="delete-button">
              ✖
            </button>
          </div>
        ))}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Expenses;