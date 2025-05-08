import React, { useState } from 'react';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const adminEmail = 'taruntaru380@gmail.com';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConnectSubmit = (e) => {
    e.preventDefault();
    if (email.toLowerCase() === adminEmail.toLowerCase()){
      window.location.href = '/dashborad_admin.html';
    } else {
      alert('Email does not match admin email.');
    }
  };

  const handlePlatformConnect = (platform) => {
    alert(`Connecting to ${platform}...`);
    // Implement platform connection logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-grey-500 to-violet-600 p-8 text-white flex flex-col items-center">
      <header className="mb-8 text-center max-w-xl">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg opacity-80">Manage your goals, track progress, and connect your accounts.</p>
      </header>

      <form onSubmit={handleConnectSubmit} className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg w-full max-w-md mb-8">
        <label htmlFor="email" className="block mb-2 font-semibold text-white">
          Connect with Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 rounded-md text-black mb-4"
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition"
        >
          Connect
        </button>
      </form>

      <div className="text-white opacity-90 mb-4">or connect with other platforms</div>

      <div className="flex justify-center space-x-6">
        <button
          onClick={() => handlePlatformConnect('Google')}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-md flex items-center space-x-3"
        >
          <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
          <span>Google</span>
        </button>
        <button
          onClick={() => handlePlatformConnect('GitHub')}
          className="bg-gray-800 hover:bg-gray-900 px-6 py-3 rounded-md flex items-center space-x-3"
        >
          <img src="https://img.icons8.com/ios-glyphs/24/ffffff/github.png" alt="GitHub" />
          <span>GitHub</span>
        </button>
        <button
          onClick={() => handlePlatformConnect('Unlocx')}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md flex items-center space-x-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Unlocx</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
