import React, { useState, useEffect } from 'react';
import { getPlatforms, connectPlatform, disconnectPlatform } from '../../utils/api';

function PlatformConnect() {
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

  const handleConnect = async (platformId) => {
    try {
      await connectPlatform(platformId);
      // Update connected status
      setPlatforms(platforms.map(platform => 
        platform._id === platformId 
          ? { ...platform, connected: true } 
          : platform
      ));
    } catch (err) {
      console.error('Error connecting platform:', err);
      setError('Failed to connect platform');
    }
  };

  const handleDisconnect = async (platformId) => {
    try {
      await disconnectPlatform(platformId);
      // Update connected status
      setPlatforms(platforms.map(platform => 
        platform._id === platformId 
          ? { ...platform, connected: false } 
          : platform
      ));
    } catch (err) {
      console.error('Error disconnecting platform:', err);
      setError('Failed to disconnect platform');
    }
  };

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
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Connect Your Platforms</h2>
      
      {platforms.length === 0 ? (
        <p className="text-gray-500">No platforms available.</p>
      ) : (
        <div className="space-y-6">
          {platforms.map(platform => (
            <div key={platform._id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center">
                <img 
                  src={platform.logo} 
                  alt={platform.name} 
                  className="h-10 w-10 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium">{platform.name}</h3>
                  <p className="text-gray-500 text-sm">{platform.description}</p>
                </div>
              </div>
              
              <button
                onClick={() => platform.connected ? handleDisconnect(platform._id) : handleConnect(platform._id)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  platform.connected
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {platform.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlatformConnect;
