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
  const [saving, setSaving] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { saving };

    const validationResult = transferSchema.safeParse(data);

    if (validationResult.success && props.totalBalance - saving >= 0) {
      props.onHandleSaving(saving);
      setSaving(0);
      setErrorMessage('');
    } else {
      setErrorMessage(validationResult.error ? 'Please provide a valid saving amount.' : 'Not enough balance'); //error Property 'error' does not exist on type 'SafeParseReturnType<{ saving: number; }
    }
  };

  const handleSavingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaving(Number(e.target.value));
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