import React, { useContext } from 'react';
import { AppContext } from './AppContext'; // Import your context
import { useNavigate } from 'react-router-dom';

function Account() {
  const { login ,setLogin ,name,no} = useContext(AppContext); // Assuming login state is managed in AppContext
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
const Logout=()=>{
  setLogin(false);
}
  return (
    <div className=" flex flex-col items-center justify-center bg-gray-100">
      {login ? (
        <div>
          {/* If logged in, display account information here */}
          <h1 className="text-2xl font-semibold mb-4">Welcome to Your Account</h1>
          <div>Your Name is : <strong>{name}</strong></div>
          <div>Your Number : <strong>{no}</strong></div>

          <button className='w-full bg-blue-500 text-white p-1 rounded-full mt-12' onClick={Logout}>Logout</button>
          {/* Add more details or components related to the account */}
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

export default Account;
