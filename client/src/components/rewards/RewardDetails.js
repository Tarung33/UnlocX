import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getReward, claimReward } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

function RewardDetails() {
  const { id } = useParams();
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchReward();
  }, [id]);
  
  const fetchReward = async () => {
    try {
      setLoading(true);
      const res = await getReward(id);
      setReward(res.data.data);
    } catch (err) {
      console.error('Error fetching reward details:', err);
      setError('Failed to load reward details. The reward may not exist or has been removed.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleClaimReward = async () => {
    if (!currentUser || !reward || reward.claimed || currentUser.points < reward.pointsRequired) {
      return;
    }
    
    setClaiming(true);
    try {
      await claimReward(reward._id);
      // Update the reward state
      setReward({
        ...reward,
        claimed: true
      });
    } catch (err) {
      console.error('Error claiming reward:', err);
      setError('Failed to claim reward. Please try again.');
    } finally {
      setClaiming(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
        <Link to="/rewards" className="text-blue-500 hover:underline">
          &larr; Back to All Rewards
        </Link>
      </div>
    );
  }
  
  if (!reward) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Reward not found</span>
        </div>
        <Link to="/rewards" className="text-blue-500 hover:underline">
          &larr; Back to All Rewards
        </Link>
      </div>
    );
  }

  const hasEnoughPoints = currentUser && currentUser.points >= reward.pointsRequired;
  const isExpired = reward.expiryDate && new Date(reward.expiryDate) < new Date();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/rewards" className="text-blue-500 hover:underline">
          &larr; Back to All Rewards
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="h-64 bg-gray-200 md:h-full">
              {reward.image ? (
                <img 
                  src={reward.image} 
                  alt={reward.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-lg">No image available</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 md:w-1/2">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {reward.name}
              </h1>
              
              <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {reward.pointsRequired} Points
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              {reward.description}
            </p>
            
            {reward.category && (
              <div className="mb-4">
                <span className="text-sm text-gray-500">Category:</span>
                <span className="ml-2 text-gray-700">{reward.category}</span>
              </div>
            )}
            
            {reward.expiryDate && (
              <div className="mb-4">
                <span className="text-sm text-gray-500">Expires:</span>
                <span className={`ml-2 ${isExpired ? 'text-red-500' : 'text-gray-700'}`}>
                  {new Date(reward.expiryDate).toLocaleDateString()}
                  {isExpired && ' (Expired)'}
                </span>
              </div>
            )}
            
            {reward.claimed ? (
              <div className="bg-green-100 text-green-800 text-center py-3 px-4 rounded-lg font-medium mb-4">
                You've claimed this reward
              </div>
            ) : isExpired ? (
              <div className="bg-red-100 text-red-800 text-center py-3 px-4 rounded-lg font-medium mb-4">
                This reward has expired
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Your Points:</span>
                    <span className={`font-bold ${hasEnoughPoints ? 'text-green-600' : 'text-red-600'}`}>
                      {currentUser?.points || 0}
                    </span>
                  </div>
                  
                  {!hasEnoughPoints && (
                    <div className="text-sm text-red-600 mt-1">
                      You need {reward.pointsRequired - (currentUser?.points || 0)} more points to claim this reward
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleClaimReward}
                  disabled={!hasEnoughPoints || claiming}
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    hasEnoughPoints 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {claiming ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Claiming Reward...
                    </span>
                  ) : (
                    'Claim Reward'
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardDetails;