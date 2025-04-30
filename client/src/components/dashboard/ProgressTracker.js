import React from 'react';
import { useGoals } from '../../contexts/GoalContext';
import { useAuth } from '../../contexts/AuthContext';

function ProgressTracker() {
  const { goals, completedGoals } = useGoals();
  const { currentUser } = useAuth();
  
  // Calculate completion rate
  const completionRate = goals.length > 0 
    ? Math.round((completedGoals.length / goals.length) * 100) 
    : 0;
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative h-32 w-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#EEEEEE"
              strokeWidth="2"
              strokeDasharray="100, 100"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray={`${completionRate}, 100`}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-3xl font-bold">{completionRate}%</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{currentUser?.points || 0}</div>
            <div className="text-sm text-gray-500">Total Points</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{completedGoals.length}</div>
            <div className="text-sm text-gray-500">Goals Achieved</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{goals.length - completedGoals.length}</div>
            <div className="text-sm text-gray-500">Goals In Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{currentUser?.level || 1}</div>
            <div className="text-sm text-gray-500">Current Level</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;