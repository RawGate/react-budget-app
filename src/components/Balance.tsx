import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface Transaction {
  id: number;
  source: string;
  amount: number;
  date: string;
}

interface BalanceProps {
  incomes: Transaction[];
  expenses: Transaction[];
  savings: number[];
  handleGetTotalBalance: (total: number) => void;
}

const Balance: React.FC<BalanceProps> = (props) => {
  let totalBalance: number = 0;

  const totalIncomeArr: number[] = props.incomes.map((income) => {
    return income.amount;
  });

  const totalIncome: number = totalIncomeArr.reduce(
    (total, current) => total + current,
    0
  );

  const totalExpenseArr: number[] = props.expenses.map(
    (expense) => expense.amount
  );

  const totalSavings: number = props.savings.reduce(
    (total, current) => total + current,
    0
  );

  const totalExpense: number = totalExpenseArr.reduce(
    (total, current) => total + current,
    0
  );

  totalBalance = totalIncome - totalExpense - totalSavings;

  props.handleGetTotalBalance(totalBalance);

  const chartData = {
    labels: ['Total Balance', 'Total Income', 'Total Expense', 'Total Savings'],
    datasets: [
      {
        label: 'Amount',
        data: [totalBalance, totalIncome, totalExpense, totalSavings],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="balance-container">
      <div className="total-balance">
        <h3>Balance: {totalBalance}</h3>
      </div>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Balance;