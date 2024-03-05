import React, { useState } from 'react';
import { Input, Button, DatePicker } from 'antd';

interface ExpenseFormProps {
  setExpense: React.Dispatch<React.SetStateAction<number>>;
  onDeleteExpense: (amount: number) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ setExpense, onDeleteExpense }) => {
  const [expenseSource, setExpenseSource] = useState('');
  const [expenseValue, setExpenseValue] = useState('');
  const [expenseDate, setExpenseDate] = useState<Date | null>(null);

  const handleAddExpense = () => {
    const value = parseFloat(expenseValue);
    if (!isNaN(value) && value > 0 && expenseDate) {
      setExpense((prevExpense) => prevExpense + value);
    }
    // Reset form fields
    setExpenseSource('');
    setExpenseValue('');
    setExpenseDate(null);
  };

  return (
    <div>
      <h2>Expense</h2>
      <Input
        value={expenseSource}
        onChange={(e) => setExpenseSource(e.target.value)}
        placeholder="Expense Source"
      />
      <Input
        value={expenseValue}
        onChange={(e) => setExpenseValue(e.target.value)}
        placeholder="Expense Value"
        type="number"
      />
      <DatePicker value={expenseDate} onChange={(date) => setExpenseDate(date)} />
      <Button className="add-button" onClick={handleAddExpense}>Add Expense</Button>
    </div>
  );
};

export default ExpenseForm;