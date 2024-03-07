import React, { useState } from 'react';
import { z } from 'zod';
import './App.css';

const transferSchema = z.object({
  saving: z.number().positive(),
});

interface SavingProps {
  onHandleSaving: (amount: number) => void;
  totalBalance: number;
}

const TransferToSaving: React.FC<SavingProps> = (props) => {
  const [saving, setSaving] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { saving: Number(saving) };

    const validationResult = transferSchema.safeParse(data) as { success: true } | { success: false; error: z.ZodError };

    if (validationResult.success && props.totalBalance - Number(saving) >= 0) {
      props.onHandleSaving(Number(saving));
      setSaving('');
      setErrorMessage('');
    } else {
      setErrorMessage(
        validationResult.success ? 'Not enough balance' : 'Please provide a valid saving amount.'
      );
    }
  };

  const handleSavingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaving(e.target.value);
  };

  return (
    <div className="TransferToSaving">
      <form onSubmit={handleSubmit}>
        <label htmlFor="add__saving">Transfer to saving</label>
        <input
          type="number"
          id="add__saving"
          value={saving}
          onChange={handleSavingChange}
        />
        <input type="submit" value="Add to Saving" />
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default TransferToSaving;