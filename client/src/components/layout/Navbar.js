import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Navbar() {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">UnlocX</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'bg-blue-700 text-white' 
                    : 'text-white hover:bg-blue-500'
                }`}
              >
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/dashboard' 
                        ? 'bg-blue-700 text-white' 
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/goals" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/goals' 
                        ? 'bg-blue-700 text-white' 
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    Goals
                  </Link>
                  <Link 
                    to="/rewards" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/rewards' 
                        ? 'bg-blue-700 text-white' 
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    Rewards
                  </Link>
                  
                  <div className="ml-4 relative flex items-center">
                    <button 
                      onClick={logout}
                      className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600"
                    >
                      Logout
                    </button>
                    <div className="ml-4 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                        {currentUser?.name?.charAt(0)}
                      </div>
                      <span className="ml-2">{currentUser?.name}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/login' 
                        ? 'bg-blue-700 text-white' 
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/register' 
                        ? 'bg-blue-700 text-white' 
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/' 
                  ? 'bg-blue-700 text-white' 
                  : 'text-white hover:bg-blue-500'
              }`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/dashboard' 
                      ? 'bg-blue-700 text-white' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/goals" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/goals' 
                      ? 'bg-blue-700 text-white' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                  onClick={toggleMenu}
                >
                  Goals
                </Link>
                <Link 
                  to="/rewards" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/rewards' 
                      ? 'bg-blue-700 text-white' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                  onClick={toggleMenu}
                >
                  Rewards
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-500 hover:bg-red-600 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/login' 
                      ? 'bg-blue-700 text-white' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/register' 
                      ? 'bg-blue-700 text-white' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
