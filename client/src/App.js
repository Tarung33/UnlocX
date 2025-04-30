import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GoalProvider } from './contexts/GoalContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Rewards from './pages/Rewards';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <GoalProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth isLogin={true} />} />
              <Route path="/register" element={<Auth isLogin={false} />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/goals" 
                element={
                  <PrivateRoute>
                    <Goals />
                  </PrivateRoute>
                } 
              />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </GoalProvider>
    </AuthProvider>
  );
}

export default App;