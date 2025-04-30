import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Unlock Your Learning Potential
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              UnlocX helps you track your progress across different learning platforms,
              set meaningful goals, and earn rewards as you learn and grow.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-6 rounded-lg border border-blue-600 transition duration-200"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/api/placeholder/600/400"
              alt="Learning dashboard"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How UnlocX Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Platforms</h3>
              <p className="text-gray-600">
                Connect your favorite learning platforms like Coursera, Udemy, 
                and more to track all your progress in one place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Set Goals</h3>
              <p className="text-gray-600">
                Create meaningful learning goals that keep you motivated
                and on track to achieve your dreams.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
              <p className="text-gray-600">
                Earn points as you complete goals and unlock exciting rewards
                to celebrate your achievements.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Learners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">
                "UnlocX has completely transformed how I approach online learning. 
                Being able to track my progress across different platforms keeps me motivated!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                  S
                </div>
                <div>
                  <p className="font-bold">Sarah K.</p>
                  <p className="text-sm text-gray-500">Data Science Student</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">
                "I love how the rewards system gives me that extra push to complete my courses. 
                It's like having a personal learning coach!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                  M
                </div>
                <div>
                  <p className="font-bold">Michael T.</p>
                  <p className="text-sm text-gray-500">Web Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Unlock Your Potential?</h2>
          <p className="text-xl mb-6">
            Join thousands of learners who are achieving their goals with UnlocX.
          </p>
          <Link
            to="/register"
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg transition duration-200"
          >
            Sign Up Now - It's Free!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;