import React, { useState } from 'react';
import { z } from 'zod';
import { message, Modal } from 'antd';
import '../App.css';
import 'antd/lib/message/style';
import 'antd/lib/modal/style';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import 'antd/lib/form/style';
import 'antd/lib/date-picker/style';



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
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState<boolean>(false);
  const [incomeToDelete, setIncomeToDelete] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { source, amount: Number(amount), date };

    const validationResult = incomeSchema.safeParse(data);

    if (validationResult.success) {
      onHandleIncome(source, Number(amount), date);
      setSource('');
      setAmount('');
      setDate('');
      message.success('Income added successfully', 2);
    } else {
      if (Number(amount) < 0) {
        message.error('Income amount cannot be less than 0', 2);
      } else {
        message.error('Please provide valid income details.', 2);
      }
    }
  };

  const handleDeleteIncome = (id: number) => {
    setIncomeToDelete(id);
    setDeleteConfirmationVisible(true);
  };

  const confirmDeleteIncome = () => {
    if (incomeToDelete) {
      onDeleteIncome(incomeToDelete);
      message.success('Income deleted successfully', 2);
    }
    setDeleteConfirmationVisible(false);
    setIncomeToDelete(null);
  };

  const cancelDeleteIncome = () => {
    setDeleteConfirmationVisible(false);
    setIncomeToDelete(null);
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
        <div className="input-box">
          <label htmlFor="new__income__source">Source of Income:</label>
          <input
            type="text"
            id="new__income__source"
            value={source}
            onChange={sourceChangeHandler}
          />
        </div>

        <div className="input-box">
          <label htmlFor="new__income__amount">Amount:</label>
          <input
            type="number"
            id="new__income__amount"
            value={amount}
            onChange={amountChangeHandler}
          />
        </div>

        <div className="input-box">
          <label htmlFor="new__income__date">Date of Income:</label>
          <input
            type="date"
            id="new__income__date"
            value={date}
            onChange={dateChangeHandler}
          />
        </div>

        <div className="button-container">
          <input type="submit" value="Add Income" />
        </div>
      </form>

      <div className="income-history">
        {incomes.map((income) => (
          <div key={income.id} className="history-item">
            <p>
              {income.source.toUpperCase()}: {income.amount} on {income.date}
            </p>
            <button
              onClick={() => handleDeleteIncome(income.id)}
              className="delete-button"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      <Modal
        visible={deleteConfirmationVisible}
        onOk={confirmDeleteIncome}
        onCancel={cancelDeleteIncome}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this income?</p>
      </Modal>
    </div>
  );
};

export default IncomeForm;