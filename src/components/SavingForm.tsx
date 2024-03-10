import React, { useState } from 'react';
import { z } from 'zod';
import { message } from 'antd';
import '../App.css';

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

  let progress: number = (totalSavings / Number(targetSaving)) * 100;
  progress = Math.min(progress, 100);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { targetSaving: Number(targetSaving) };

    const validationResult = savingSchema.safeParse(data);

    if (validationResult.success) {
      message.success('Saving target added successfully!', 2);
    } else {
      message.error('Please provide valid Saving amount details.', 2);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="saving__target">Add saving target:</label>
        <input
          type="number"
          name="saving"
          id="saving__target"
          value={targetSaving}
          onChange={handleSavingTargetChange}
        />
        <button onClick={handleClick}>Reset</button>
      </form>

      <p>
        Target Saving: <span>{targetSaving}</span>
      </p>
      <p>
        Current Saving: <span>{totalSavings}</span>
      </p>
      <p>
        Progress: <span>{isNaN(progress) ? 0 : progress.toFixed(2)}%</span>
      </p>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${isNaN(progress) ? 0 : progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default SavingForm;
