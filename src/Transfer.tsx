import React, { useState } from 'react';
import './App.css'; 

interface SavingProps {
  onHandleSaving: (amount: number) => void;
  totalBalance: number;
}

const TransferToSaving: React.FC<SavingProps> = (props) => {
  const [saving, setSaving] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.totalBalance - saving >= 0) {
      props.onHandleSaving(saving);
      setSaving(0);
      setErrorMessage('');
    } else {
      setErrorMessage('Not enough balance');
    }
  };

  const handleSavingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaving(Number(e.target.value));
  };

  return (
    <div className="TransferToSaving">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="add__saving">Transfer to saving</label>
        <input
          type="number"
          id="add__saving"
          value={saving}
          onChange={(e) => handleSavingChange(e)}
        />
        <input type="submit" value="Add to Saving" />
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default TransferToSaving;
