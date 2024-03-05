import React, { useState } from 'react';
import './App.css';
import { Progress, Button, Input } from 'antd';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import SavingForm from './SavingForm';

function App() {
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [targetSaving, setTargetSaving] = useState<number>(0);
  const [currentSaving, setCurrentSaving] = useState<number>(0);
  const [transferValue, setTransferValue] = useState<string>('');

  const handleTransfer = () => {
    const value = parseFloat(transferValue);
    if (!isNaN(value) && value > 0) {
      const balance = income - expense - value;
      if (balance >= 0) {
        setCurrentSaving((prevSaving) => prevSaving + value);
        setExpense((prevExpense) => prevExpense + value);
      }
    }
    setTransferValue('');
  };

  const handleDeleteIncome = (amount: number) => {
    setIncome((prevIncome) => prevIncome - amount);
  };

  const handleDeleteExpense = (amount: number) => {
    setExpense((prevExpense) => prevExpense - amount);
  };

  const handleDeleteSaving = () => {
    setCurrentSaving(0);
  };

  const handleDeleteTargetSaving = () => {
    setTargetSaving(0);
  };

  const calculateBalance = (): number => {
    return income - expense - currentSaving;
  };

  const calculateSavingProgress = (): number => {
    if (targetSaving === 0) {
      return 0;
    }
    if (currentSaving >= targetSaving) {
      return 100;
    }
    return (currentSaving / targetSaving) * 100;
  };

  return (
    <div className="container">
      <h2>Budget App</h2>

      <div className="form-container">
        <IncomeForm setIncome={setIncome} onDeleteIncome={handleDeleteIncome} />
        <ExpenseForm setExpense={setExpense} onDeleteExpense={handleDeleteExpense} />
        <SavingForm setTargetSaving={setTargetSaving} setCurrentSaving={setCurrentSaving} onTransfer={handleTransfer} />
      </div>

      <p className="balance">Balance: {calculateBalance()}</p>

      <div className="saving-info">
        <div>
          <p>Total Current Saving: {currentSaving}</p>
        </div>
        <div>
          <p>Saving Target: {targetSaving}</p>
        </div>
        <div>
          <p>Progress</p>
          <Progress className="ant-progress-bg" percent={calculateSavingProgress()} />
        </div>
        <Button className="delete-button" onClick={handleDeleteSaving}>
          Delete Current Saving
        </Button>
        <Button className="delete-button" onClick={handleDeleteTargetSaving}>
          Delete Saving Target
        </Button>
      </div>

      <Input
        type="number"
        placeholder="Transfer to Saving"
        value={transferValue}
        onChange={(e) => setTransferValue(e.target.value)}
        style={{ marginTop: '10px', marginBottom: '10px' }}
      />
      <Button className="add-button" onClick={handleTransfer}>
        Transfer to Saving
      </Button>
    </div>
  );
}

export default App;