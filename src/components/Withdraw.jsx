import React, { useContext } from 'react';
import { AppContext } from './AppContext'; // Import your context
import { useNavigate } from 'react-router-dom';

function Withdraw() {
  const { login, Mainbalance } = useContext(AppContext); // Assuming login state is managed in AppContext
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      {login ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">Withdraw Funds</h1>
            <div className="mb-4">
              {/* Add the withdrawal form or information here */}
              <p className="text-gray-700 mb-2">Current Balance: <span className="font-semibold text-blue-700">{Mainbalance} rupees</span></p>
              <p className="text-gray-600">Please note, withdrawals are opening on:</p>
              <p className="text-blue-700 font-semibold mt-2">31 October 2024</p>
              <p className="text-gray-500 text-sm mt-2">Stay connected for updates!</p>
            </div>
            {/* Add more withdrawal details here */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-xs">
          <img src='1000rupees.png' alt='tasks' className=" mb-4 p-4" />
          <div className="bg-white p-6 rounded-lg shadow-md w-full text-center">
            <h2 className='font-bold text-blue-600 mb-2'>Earn real cash by watching ads</h2>
            <h1 className="text-xl font-semibold mb-4">Please Login First</h1>
            <button
              onClick={handleLoginClick}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
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
