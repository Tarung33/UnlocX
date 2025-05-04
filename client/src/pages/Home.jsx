import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600">UnlocX</h1>
      <p className="mt-4 text-gray-600">Unlock Your Learning Potential – Track your progress, set goals, and earn rewards.</p>
      <div className="mt-6 space-x-4">
        <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
        <Link to="/register" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Register</Link>
      </div>
    </div>
  );
};

export default Home;
