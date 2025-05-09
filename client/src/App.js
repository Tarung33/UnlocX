import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { GoalProvider } from './contexts/GoalContext';

const App = () => {
  return (
    <GoalProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </GoalProvider>
  );
};

export default App;

