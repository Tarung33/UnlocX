import React, { useState } from 'react';
import { useGoals } from '../contexts/GoalContext';
import GoalCard from '../components/dashboard/GoalCard';
import PlatformList from '../components/platform/PlatformList';

function Goals() {
  const { goals, loading, addGoal } = useGoals();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetValue: 10,
    platformId: '',
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'targetValue' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim()) {
      return setFormError('Title is required');
    }

    if (formData.targetValue < 1) {
      return setFormError('Target value must be at least 1');
    }

    try {
      await addGoal(formData);
      setShowCreateForm(false);
      setFormData({
        title: '',
        description: '',
        targetValue: 10,
        platformId: '',
      });
    } catch (err) {
      setFormError('Failed to create goal. Please try again.');
    }
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Learning Goals</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {showCreateForm ? 'Cancel' : 'Create New Goal'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Create New Goal</h2>
          
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{formError}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Goal Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                name="title"
                type="text"
                placeholder="E.g., Complete Python Course"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description (Optional)
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                placeholder="Describe your goal"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetValue">
                Target Value
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="targetValue"
                name="targetValue"
                type="number"
                min="1"
                max="100"
                value={formData.targetValue}
                onChange={handleChange}
                required
              />
              <p className="text-gray-600 text-xs mt-1">
                The target number to complete this goal (e.g., 10 lessons, 5 courses)
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="platformId">
                Learning Platform (Optional)
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="platformId"
                name="platformId"
                value={formData.platformId}
                onChange={handleChange}
              >
                <option value="">None</option>
                <option value="udemy">Udemy</option>
                <option value="coursera">Coursera</option>
                <option value="edx">edX</option>
                <option value="khan">Khan Academy</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Create Goal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {goals.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No Goals Yet</h2>
              <p className="text-gray-600 mb-6">
                Create your first learning goal to start tracking your progress.
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Create Your First Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {goals.map((goal) => (
                <GoalCard key={goal._id} goal={goal} />
              ))}
            </div>
          )}
        </div>
        
        <div>
          <PlatformList />
        </div>
      </div>
    </div>
  );
}

export default Goals;