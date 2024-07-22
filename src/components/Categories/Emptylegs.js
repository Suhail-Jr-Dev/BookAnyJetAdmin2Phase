import React from 'react';
import { useNavigate } from 'react-router-dom';


const Emptylegs = () => {
  const navigate = useNavigate();

  const handleCategories = () => {
    navigate('/emptylegsAllCategories');
  };

  const handleBookings = () => {
    navigate('/emptylegsAllCategories');
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Emptylegs Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Charter Categories Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Emptylegs Categories</h2>
            <p className="text-gray-600">Explore various categories of charters available.</p>
            <div className='flex justify-start'>
                <button className='text-white bg-blue-800 p-2 rounded-md mt-4' onClick={handleCategories}>Explore more</button>
            </div>
          </div>
        </div>

        {/* Charter Bookings Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Emptylegs Bookings</h2>
            <p className="text-gray-600">Manage and view all your charter bookings here.</p>
            <div className='flex justify-start'>
                <button className='text-white bg-blue-800 p-2 rounded-md mt-4' onClick={handleBookings}>Explore more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emptylegs;
