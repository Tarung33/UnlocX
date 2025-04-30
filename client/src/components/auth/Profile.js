import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGoals } from '../../contexts/GoalContext';

function Profile() {
  const { currentUser } = useAuth();
  const { completedGoals } = useGoals();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
          {currentUser?.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-bold">{currentUser?.name}</h3>
          <p className="text-gray-600">{currentUser?.email}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Level</span>
          <span className="font-semibold">{currentUser?.level || 1}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Points</span>
          <span className="font-semibold">{currentUser?.points || 0}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Goals Completed</span>
          <span className="font-semibold">{completedGoals.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;