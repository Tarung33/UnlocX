import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { guestLogin } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const GuestLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await guestLogin();
      const { token, user } = res.data;
      login(token, user);
      navigate('/'); // Redirect to home or guest dashboard if any
    } catch (err) {
      setError('Failed to login as guest');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-6 text-center">
      <h2 className="text-2xl font-bold mb-6">Login as Guest</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <button
        onClick={handleGuestLogin}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Logging in...' : 'Login as Guest'}
      </button>
    </div>
  );
};

export default GuestLogin;
