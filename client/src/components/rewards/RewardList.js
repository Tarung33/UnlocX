import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { claimReward } from '../../utils/api';

function RewardCard({ reward, onRewardClaimed }) {
  const { currentUser } = useAuth();
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState(null);
  
  const handleClaim = async () => {
    try {
      setClaiming(true);
      setError(null);
      
      await claimReward(reward._id);
      
      if (onRewardClaimed) {
        onRewardClaimed();
      }
      
      setClaiming(false);
    } catch (err) {
      console.error('Error claiming reward:', err);
      setError('Failed to claim reward');
      setClaiming(false);
    }
  };
  
  const canClaim = currentUser?.points >= reward.pointsCost;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900">
            {reward.name}
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {reward.pointsCost} points
          </span>
        </div>
        
        <p className="mb-3 text-gray-600 text-sm">{reward.description}</p>
        
        {reward.expiryDate && (
          <p className="text-xs text-gray-500 mb-4">
            Expires: {new Date(reward.expiryDate).toLocaleDateString()}
          </p>
        )}
        
        {error && (
          <div className="mb-4 text-sm text-red-600">
            {error}
          </div>
        )}
        
        <div className="flex space-x-2">
          <Link 
            to={`/rewards/${reward._id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View Details
          </Link>
          
          <button
            onClick={handleClaim}
            disabled={!canClaim || claiming || reward.claimed}
            className={`flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              !canClaim ? 'bg-gray-400 cursor-not-allowed' 
              : reward.claimed ? 'bg-green-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {claiming ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : reward.claimed ? (
              'Claimed'
            ) : !canClaim ? (
              'Not Enough Points'
            ) : (
              'Claim Reward'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RewardCard;