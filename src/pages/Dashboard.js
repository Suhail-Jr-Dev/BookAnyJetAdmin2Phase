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
      <h1 className="mb-4 text-2xl font-bold">Welcome to the Admin Panel</h1>
      <p className="mb-8">Manage all your Charter and Emptyleg related details and view related analytics and  bookings.</p>
      
      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
        {/* Card 1: Charters */}
        <div className="relative overflow-hidden transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl">
          <div className="p-6">
            <h2 className="mb-2 text-xl font-semibold">All Charter Details</h2>
            <p className="text-gray-600">Manage all your charter settings and view related analytics.</p>
            <div className='flex justify-start'>
                <button className='p-2 mt-4 text-white bg-blue-600 rounded-md' onClick={handleChartersNav}>Explore more</button>
            </div>
          </div>
        </div>
        
        {/* Card 2: Emptylegs */}
        <div className="relative overflow-hidden transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl">
          <div className="p-6">
            <h2 className="mb-2 text-xl font-semibold">All Emptyleg Details</h2>
            <p className="text-gray-600">View and manage emptylegs data and settings.</p>
            <div className='flex justify-start'>
                <button className='p-2 mt-4 text-white bg-blue-600 rounded-md' onClick={handleEmptynav}>Explore more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
