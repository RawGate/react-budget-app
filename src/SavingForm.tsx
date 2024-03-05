import React, { useState } from 'react';
import { Input, Button } from 'antd';

interface SavingFormProps {
  setTargetSaving: (value: number) => void;
  setCurrentSaving: (value: number) => void;
  onTransfer: (value: number) => void;
}

const SavingForm: React.FC<SavingFormProps> = ({ setTargetSaving, setCurrentSaving, onTransfer }) => {
  const [targetSavingValue, setTargetSavingValue] = useState('');
  const [transferValue, setTransferValue] = useState('');

  const handleAddTargetSaving = () => {
    const value = parseFloat(targetSavingValue);
    if (!isNaN(value) && value > 0) {
      setTargetSaving(value);
    }
    setTargetSavingValue('');
  };

  const handleTransfer = () => {
    const value = parseFloat(transferValue);
    if (!isNaN(value) && value > 0) {
      onTransfer(value);
    }
    setTransferValue('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Add Saving</h2>
      <Input
        type="number"
        placeholder="Target Saving Value"
        value={targetSavingValue}
        onChange={(e) => setTargetSavingValue(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button className="add-button" onClick={handleAddTargetSaving}>
        Set Target Saving
      </Button>
    </div>
  );
};

export default SavingForm;