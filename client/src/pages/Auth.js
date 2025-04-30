import React from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

function Auth({ isLogin }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default Auth;