import React, { useContext } from 'react';
import { AppContext } from './AppContext'; // Import your context
import { useNavigate } from 'react-router-dom';

function Account() {
  const { login, setLogin, name, no, Mainbalance } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setLogin(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      {login ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome to <span className="text-blue-500">EARNINFY</span>
          </h1>
          <div className="flex flex-col items-center">
            <img src='dp.webp' alt='User profile' className='w-24 h-24 rounded-full shadow-md mb-6' />
            <div className='w-full mb-4'>
              <div className='flex justify-between items-center border-b py-2'>
                <p className='text-gray-700 font-medium'>Name:</p>
                <strong className='text-gray-900'>{name}</strong>
              </div>
              <div className='flex justify-between items-center border-b py-2'>
                <p className='text-gray-700 font-medium'>Number:</p>
                <strong className='text-gray-900'>{no}</strong>
              </div>
              <div className='flex justify-between items-center border-b py-2'>
                <p className='text-gray-700 font-medium'>Balance:</p>
                <strong className='text-green-600'>{Mainbalance} rupees</strong>
              </div>
            </div>
            <a href='https://abdullah.kesug.com/contact' className='w-full'>
              <button className='w-full bg-blue-500 text-white py-2 rounded-lg mt-6 hover:bg-blue-600 transition duration-300 shadow'>
                Contact Us
              </button>
            </a>
            <button
              className='w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600 transition duration-300 shadow'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src='1000rupees.png' alt='tasks' className="mb-6 w-48 h-48 object-contain" />
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login First</h1>
            <button
              onClick={handleLoginClick}
              className="bg-blue-500 text-white px-8 py-2 rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
