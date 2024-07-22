// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleChartersNav = () => {
    navigate('/charters');
  };

  const handleEmptynav = () => {
    navigate('/emptylegs');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Panel</h1>
      <p className="mb-8">Here you can manage your charter applications settings, view analytics, and more.</p>
      
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Card 1: Charters */}
        <div className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Charters</h2>
            <p className="text-gray-600">Manage your charter settings and view related analytics.</p>
            <div className='flex justify-start'>
                <button className='text-white bg-blue-800 p-2 rounded-md mt-4' onClick={handleChartersNav}>Explore more</button>
            </div>
          </div>
        </div>
        
        {/* Card 2: Emptylegs */}
        <div className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Emptylegs</h2>
            <p className="text-gray-600">View and manage emptylegs data and settings.</p>
            <div className='flex justify-start'>
                <button className='text-white bg-blue-800 p-2 rounded-md mt-4' onClick={handleEmptynav}>Explore more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
