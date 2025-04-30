import React, { useState, useEffect } from 'react';
import { getRewards } from '../utils/api';
import RewardList from '../components/rewards/RewardList';
import { useAuth } from '../contexts/AuthContext';

function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const res = await getRewards();
      setRewards(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching rewards:', err);
      setLoading(false);
    }
  };

  const handleRewardClaimed = () => {
    fetchRewards();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reward Center</h1>
        <p className="text-gray-600">
          Earn points by completing your learning goals and unlock these exciting rewards!
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-center">
        <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold">Your Current Points</p>
          <p className="text-2xl font-bold">{currentUser?.points || 0} Points</p>
        </div>
      </div>

      <RewardList rewards={rewards} onRewardClaimed={handleRewardClaimed} />
    </div>
  );
}

export default Rewards;