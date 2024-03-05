import React, { useState } from 'react';
import { Input, Button, DatePicker } from 'antd';

interface IncomeFormProps {
  setIncome: React.Dispatch<React.SetStateAction<number>>;
  onDeleteIncome: (amount: number) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ setIncome, onDeleteIncome }) => {
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeValue, setIncomeValue] = useState('');
  const [incomeDate, setIncomeDate] = useState<Date | null>(null);

  const handleAddIncome = () => {
    const value = parseFloat(incomeValue);
    if (!isNaN(value) && value > 0 && incomeDate) {
      setIncome((prevIncome) => prevIncome + value);
    }
    setIncomeSource('');
    setIncomeValue('');
    setIncomeDate(null);
  };

  return (
    <div>
      <h2>Income</h2>
      <Input
        value={incomeSource}
        onChange={(e) => setIncomeSource(e.target.value)}
        placeholder="Income Source"
      />
      <Input
        value={incomeValue}
        onChange={(e) => setIncomeValue(e.target.value)}
        placeholder="Income Value"
        type="number"
      />
      <DatePicker value={incomeDate} onChange={(date) => setIncomeDate(date)} />
      <Button className="add-button" onClick={handleAddIncome}>Add Income</Button>
    </div>
  );
};

export default IncomeForm;