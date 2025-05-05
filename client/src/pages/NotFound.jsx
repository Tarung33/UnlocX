import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-5xl font-bold text-blue-600">404</h1>
      <p className="mt-2 text-lg text-gray-700">Page Not Found</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">Go to Home</Link>
    </div>
  );
};

export default NotFound;
