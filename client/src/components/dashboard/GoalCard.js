import React from 'react';
import { useGoals } from '../../contexts/GoalContext';

function GoalCard({ goal }) {
  const { updateProgress, removeGoal } = useGoals();
  const progress = Math.round((goal.currentValue / goal.targetValue) * 100);
  
  const handleProgressUpdate = async (increment) => {
    const newValue = Math.min(goal.targetValue, goal.currentValue + increment);
    try {
      await updateProgress(goal._id, { currentValue: newValue });
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await removeGoal(goal._id);
      } catch (err) {
        console.error('Error deleting goal:', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{goal.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{goal.description}</p>
        </div>
        
        {goal.platform && (
          <div className="flex items-center">
            <img 
              src={goal.platform.logo} 
              alt={goal.platform.name} 
              className="h-8 w-8 rounded"
            />
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{goal.currentValue} / {goal.targetValue}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${goal.completed ? 'bg-green-500' : 'bg-blue-500'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {!goal.completed && (
        <div className="mt-4 flex space-x-2">
          <button 
            onClick={() => handleProgressUpdate(1)} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            +1
          </button>
          <button 
            onClick={() => handleProgressUpdate(5)} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            +5
          </button>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
        <div>
          {goal.reward && (
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-1">Reward:</span>
              <img 
                src={goal.reward.image} 
                alt={goal.reward.name} 
                className="h-5 w-5 mr-1"
              />
              <span>{goal.reward.name}</span>
            </div>
          )}
        </div>
        
        <button 
          onClick={handleDelete} 
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default GoalCard;