// SavingForm.tsx

import React, { useState } from 'react';
import './App.css';

interface SavingProps {
  savings: number[];
}

const SavingForm: React.FC<SavingProps> = (props) => {
  const [targetSaving, setTargetSaving] = useState<number>(0);

  const handleSavingTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetSaving(Number(e.target.value));
  };

  const handleClick = () => {
    setTargetSaving(0);
  };

  const totalSavings: number = props.savings.reduce(
    (total, current) => total + current,
    0
  );

  const progress: number = (totalSavings / targetSaving) * 100;

  return (
    <div>
      <label htmlFor="saving__target">Add your saving target:</label>
      <input
        type="number"
        name="saving"
        id="saving__target"
        value={targetSaving}
        onChange={(e) => handleSavingTargetChange(e)}
      />
      <button onClick={handleClick}>Reset</button>

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
