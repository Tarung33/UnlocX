import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Sidebar() {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
          {currentUser?.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-medium">{currentUser?.name}</h3>
          <p className="text-gray-500 text-sm">Level {currentUser?.level || 1}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Link 
          to="/dashboard" 
          className={`block px-4 py-2 rounded-md ${
            location.pathname === '/dashboard' 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Dashboard
        </Link>
        <Link 
          to="/goals" 
          className={`block px-4 py-2 rounded-md ${
            location.pathname === '/goals' 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Goals
        </Link>
        <Link 
          to="/rewards" 
          className={`block px-4 py-2 rounded-md ${
            location.pathname === '/rewards' 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Rewards
        </Link>
        <Link 
          to="/settings" 
          className={`block px-4 py-2 rounded-md ${
            location.pathname === '/settings' 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Settings
        </Link>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500">Points</span>
          <span className="font-semibold">{currentUser?.points || 0}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${Math.min(100, ((currentUser?.points % 100) || 0))}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          {100 - ((currentUser?.points % 100) || 0)} points until next level
        </p>
      </div>
    </div>
  );
}

export default Sidebar;