import React from 'react';
import { Routes, Route, Link, BrowserRouter, Navigate } from 'react-router-dom';
import App from './App';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Budget App!</h1>
      <p className="home-paragraph">This app is designed to help you keep track of your finances easily. You can add your income sources, record your expenses, and monitor your savings all in one place. </p>
      <nav>
        <Link to="/budget-app" className="budget-app-link">
          Go to Budget App
        </Link>
      </nav>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget-app" element={<App />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default HomePage;