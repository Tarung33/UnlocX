import React from 'react';
import { claimReward } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

function RewardCard({ reward, onRewardClaimed }) {
  const { currentUser } = useAuth();
  const [claiming, setClaiming] = React.useState(false);
  const hasEnoughPoints = currentUser && currentUser.points >= reward.pointsRequired;
  
  const handleClaimReward = async () => {
    if (!hasEnoughPoints) return;
    
    setClaiming(true);
    try {
      await claimReward(reward._id);
      if (onRewardClaimed) {
        onRewardClaimed();
      }
    } catch (err) {
      console.error('Error claiming reward:', err);
      alert('Failed to claim reward. Please try again.');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {reward.image ? (
          <img 
            src={reward.image} 
            alt={reward.name} 
            className="object-cover h-full w-full"
          />
        ) : (
          <div className="text-4xl text-gray-400">🎁</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{reward.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{reward.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">🏆</span>
            <span className="font-bold">{reward.pointsRequired} points</span>
          </div>
          
          <button
            className={`px-4 py-2 rounded text-sm font-medium ${
              hasEnoughPoints
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!hasEnoughPoints || claiming}
            onClick={handleClaimReward}
          >
            {claiming ? 'Claiming...' : hasEnoughPoints ? 'Claim Reward' : 'Not Enough Points'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RewardCard;
