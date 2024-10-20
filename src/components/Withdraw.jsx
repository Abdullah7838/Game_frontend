import React, { useContext } from 'react';
import { AppContext } from './AppContext'; // Import your context
import { useNavigate } from 'react-router-dom';

function Withdraw() {
  const { login ,balance} = useContext(AppContext); // Assuming login state is managed in AppContext
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-gray-100">
      {login ? (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-4">Withdraw Funds</h1>
          {/* Add the withdrawal form or information here */}
          <div>

            </div>
          <p className='text-blue-700'>Opening on 31 October 2024 stay connected</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src='1000rupees.png' alt='tasks' className="mb-4" />
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
            <h1 className="text-2xl font-semibold mb-4 mt-4">Please Login First</h1>
            <button
              onClick={handleLoginClick}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Withdraw;
