import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGoals, createGoal, updateGoalProgress, deleteGoal } from '../utils/api';
import { useAuth } from './AuthContext';

const GoalContext = createContext();

export function useGoals() {
  return useContext(GoalContext);
}

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchGoals();
    } else {
      setGoals([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const res = await getGoals();
      setGoals(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching goals:', err);
      setLoading(false);
    }
  };

  const addGoal = async (goalData) => {
    try {
      const res = await createGoal(goalData);
      setGoals([...goals, res.data.data]);
      return res.data.data;
    } catch (err) {
      console.error('Error adding goal:', err);
      throw err;
    }
  };

  const updateProgress = async (id, progressData) => {
    try {
      const res = await updateGoalProgress(id, progressData);
      setGoals(goals.map(goal => goal._id === id ? res.data.data : goal));
      return res.data.data;
    } catch (err) {
      console.error('Error updating goal progress:', err);
      throw err;
    }
  };

  const removeGoal = async (id) => {
    try {
      await deleteGoal(id);
      setGoals(goals.filter(goal => goal._id !== id));
    } catch (err) {
      console.error('Error deleting goal:', err);
      throw err;
    }
  };

  const value = {
    goals,
    loading,
    fetchGoals,
    addGoal,
    updateProgress,
    removeGoal,
    completedGoals: goals.filter(goal => goal.completed),
    inProgressGoals: goals.filter(goal => !goal.completed),
  };

  return (
    <GoalContext.Provider value={value}>
      {children}
    </GoalContext.Provider>
  );
}