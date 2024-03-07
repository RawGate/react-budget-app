import React, { useState } from 'react';
import { z } from 'zod';
import './App.css';

const savingSchema = z.object({
  targetSaving: z.number().positive(),
});

interface SavingProps {
  savings: number[];
}

const SavingForm: React.FC<SavingProps> = (props) => {
  const [targetSaving, setTargetSaving] = useState<string>('');

  const handleSavingTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetSaving(e.target.value);
  };

  const handleClick = () => {
    setTargetSaving('');
  };

  const totalSavings: number = props.savings.reduce(
    (total, current) => total + current,
    0
  );

  const progress: number = (totalSavings / Number(targetSaving)) * 100;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { targetSaving: Number(targetSaving) };

    const validationResult = savingSchema.safeParse(data);

    if (validationResult.success) {
      // Handle saving target submission
    } else {
      alert('Please provide a valid saving target.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="saving__target">Add your saving target:</label>
        <input
          type="number"
          name="saving"
          id="saving__target"
          value={targetSaving}
          onChange={handleSavingTargetChange}
        />
        <button type="submit">Submit</button>
        <button onClick={handleClick}>Reset</button>
      </form>

      <p>
        Your Target Saving is: <span>{targetSaving}</span>
      </p>
      <p>
        Your Current Saving is: <span>{totalSavings}</span>
      </p>
      <p>
        Saving Progress: <span>{isNaN(progress) ? 0 : progress.toFixed(2)}%</span>
      </p>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${isNaN(progress) ? 0 : progress}%`,
            backgroundColor: '#4caf50',
          }}
        ></div>
      </div>
    </div>
  );
};

export default SavingForm;