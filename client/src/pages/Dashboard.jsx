import React, { useState } from 'react';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const adminEmail = 'x@gmail.com';

  const handleConnectClick = () => {
    const email = prompt('Please enter your email to connect:');
    if (email && email.toLowerCase() === adminEmail.toLowerCase()) {
      setIsAdmin(true);
    } else {
      alert('Email does not match admin email.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>
      {!isAdmin && (
        <>
          <p className="text-gray-700 mb-4">Welcome back! Here's your progress and goals.</p>
          <button
            onClick={handleConnectClick}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md mb-6"
          >
            Connect
          </button>
        </>
      )}
      {isAdmin && (
        <>
          <p className="text-gray-700 mb-4 font-semibold">Admin View: All data is visible.</p>
          {/* Example of expanded data for admin */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">All User Data</h2>
            <ul className="list-disc list-inside">
              <li>User 1: Progress 80%</li>
              <li>User 2: Progress 50%</li>
              <li>User 3: Progress 100%</li>
              {/* Add more detailed data as needed */}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
