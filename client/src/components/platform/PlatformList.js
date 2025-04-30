import React, { useState, useEffect } from 'react';
import { getPlatforms } from '../../utils/api';

function PlatformList() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        setLoading(true);
        const res = await getPlatforms();
        setPlatforms(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching platforms:', err);
        setError('Failed to load platforms');
        setLoading(false);
      }
    };

    fetchPlatforms();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading platforms...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {platforms.map(platform => (
        <div key={platform._id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <img 
              src={platform.logo} 
              alt={platform.name} 
              className="h-12 w-12 rounded-full mr-4"
            />
            <h3 className="text-lg font-bold">{platform.name}</h3>
          </div>
          
          <p className="text-gray-600 mb-4">{platform.description}</p>
          
          <div className="flex space-x-2">
            {platform.tags && platform.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Goals Available</span>
              <span className="font-medium">{platform.goalsCount || 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlatformList;

