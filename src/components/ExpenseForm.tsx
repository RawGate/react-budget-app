import React, { useState } from 'react';
import { z } from 'zod';
import { message, Modal } from 'antd';
import 'antd/lib/message/style';
import 'antd/lib/modal/style';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import 'antd/lib/form/style';
import 'antd/lib/date-picker/style';
import { useForm } from 'react-hook-form';

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
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState<boolean>(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);

  const onSubmit = (data: any) => {
    const validationResult = expenseSchema.safeParse(data);

    if (validationResult.success) {
      if (totalBalance - data.amount >= 0) {
        onHandleExpenses(data.source, data.amount, data.date);
        reset();
        message.success('Expense added successfully', 2);
      } else {
        message.error('Insufficient balance.');
      }
    } else {
      message.error('Please provide valid expense details.');
    }
  };

  const handleDeleteExpense = (id: number) => {
    setExpenseToDelete(id);
    setDeleteConfirmationVisible(true);
  };

  const confirmDeleteExpense = () => {
    if (expenseToDelete) {
      onDeleteExpense(expenseToDelete);
      message.success('Expense deleted successfully', 2);
    }
    setDeleteConfirmationVisible(false);
    setExpenseToDelete(null);
  };

  const cancelDeleteExpense = () => {
    setDeleteConfirmationVisible(false);
    setExpenseToDelete(null);
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
            <button onClick={() => handleDeleteExpense(expense.id)} className="delete-button">
              ✖
            </button>
          </div>
        ))}
      </div>

      <Modal
        visible={deleteConfirmationVisible}
        onOk={confirmDeleteExpense}
        onCancel={cancelDeleteExpense}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this expense?</p>
      </Modal>
    </div>
  );
};

export default Expenses;
