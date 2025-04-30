import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getGoals, getUserStats } from '../../utils/api';
import GoalCard from './GoalCard';
import ProgressTracker from './ProgressTracker';
import RewardCard from './RewardCard';

function Dashboard() {
  const { currentUser } = useAuth();
  const [goals, setGoals] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [stats, setStats] = useState({
    completedGoals: 0,
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch goals
        const goalsRes = await getGoals({ limit: 3, status: 'active' });
        setGoals(goalsRes.data.data);
        
        // Fetch user stats
        const statsRes = await getUserStats();
        setStats(statsRes.data.data);
        
        // Get featured rewards (assuming the API supports this)
        // In a real app, you might get this from the rewards API with a featured flag
        const rewardsRes = await fetch('/api/rewards/featured');
        const rewardsData = await rewardsRes.json();
        setRewards(rewardsData.data.slice(0, 3)); // Get first 3 featured rewards
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome & Stats */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {currentUser?.name}!</h1>
            <p className="text-gray-600">Here's your progress summary</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <span className="font-semibold mr-1">Level {currentUser?.level || 1}</span>
              <span>• {currentUser?.points || 0} points</span>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-500 text-sm">Completed Goals</p>
            <p className="text-2xl font-bold">{stats.completedGoals}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-500 text-sm">Total Points</p>
            <p className="text-2xl font-bold">{stats.totalPoints}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-500 text-sm">Current Streak</p>
            <p className="text-2xl font-bold">{stats.currentStreak} days</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-500 text-sm">Longest Streak</p>
            <p className="text-2xl font-bold">{stats.longestStreak} days</p>
          </div>
        </div>
      </div>
      
      {/* Progress Tracker */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        <ProgressTracker />
      </div>
      
      {/* Active Goals */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Active Goals</h2>
          <a href="/goals" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </a>
        </div>
        
        {goals.length === 0 ? (
          <p className="text-gray-500">No active goals. Start adding some!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {goals.map(goal => (
              <GoalCard key={goal._id} goal={goal} />
            ))}
          </div>
        )}
      </div>
      
      {/* Featured Rewards */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Featured Rewards</h2>
          <a href="/rewards" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </a>
        </div>
        
        {rewards.length === 0 ? (
          <p className="text-gray-500">No rewards available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewards.map(reward => (
              <RewardCard key={reward._id} reward={reward} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;