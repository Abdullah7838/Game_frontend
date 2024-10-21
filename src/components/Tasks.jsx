import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';

function Tasks() {
  const navigate = useNavigate(); 
  const { add, login, setBalance, Mainbalance, setMBalan, name } = useContext(AppContext);

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const [do1, sdo1] = useState('Do');
  const [count, setCount] = useState(() => parseInt(localStorage.getItem('count')) || 1);
  const [isHiddenShareWithFriends, setIsHiddenShareWithFriends] = useState(() => localStorage.getItem('isHiddenShareWithFriends') === 'true');
  const [isHiddenShareStatus, setIsHiddenShareStatus] = useState(() => localStorage.getItem('isHiddenShareStatus') === 'true');

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`Hi, I am ${name} and I’m excited to share that I have earned some income just by watching ads. You can check out the project here: https://earninfy-neon.vercel.app/`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');

    setCount(count + 1);
    sdo1('Try Again');
    if (count === 2) {
      setIsHiddenShareWithFriends(true);
      localStorage.setItem('isHiddenShareWithFriends', true);
    }
  };

  const handleWhatsAppStatus = () => {
    const message = encodeURIComponent(`Hi, I am ${name} and I’m excited to share that I have earned some income just by watching ads. You can check out the project here: https://earninfy-neon.vercel.app/`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');

    setCount(count + 1);
    setIsHiddenShareStatus(true);
    localStorage.setItem('isHiddenShareStatus', true);
  };

  const handleAdds = () => {
    if (isHiddenShareWithFriends && isHiddenShareStatus) {
      console.log("Ad is available to watch");
      navigate('/adds')
    } else {
      alert("Please complete the upper two tasks first.");
      return;
    }
  };

  const generateRandomPhoneNumber = () => {
    const middlePart = Math.floor(Math.random() * 9000) + 1000; 
    const lastPart = Math.floor(Math.random() * 90) + 10; 
    return `03${middlePart}****${lastPart}`;
  };

  const generateRandomAmount = () => {
    return Math.floor(Math.random() * 41) * 10 + 100; 
  };

  const [randomPhone, setRandomPhone] = useState(generateRandomPhoneNumber());
  const [randomAmount, setRandomAmount] = useState(generateRandomAmount());

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomPhone(generateRandomPhoneNumber());
      setRandomAmount(generateRandomAmount());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {login ? (
        <div className="flex flex-col items-center w-full max-w-sm">
          <img src='1000rupees.png' alt='tasks' className="mb-4" />
          <div className='text-lg font-bold text-blue-700 mb-2'>Your Balance is: {Mainbalance} rupees</div>
          <div className='text-md font-bold mb-4'>Complete the following tasks</div>

          {/* Share with 2 friends */}
          <div className='flex justify-between items-center w-full p-3 bg-white rounded-lg shadow-md mb-4'>
            <div className='font-semibold'>Share with 2 friends</div>
            {!isHiddenShareWithFriends && (
              <button 
                onClick={handleWhatsAppShare}
                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition'
              >
                {do1}
              </button>
            )}
          </div>

          {/* Share to WhatsApp Status */}
          <div className='flex justify-between items-center w-full p-3 bg-white rounded-lg shadow-md mb-4'>
            <div className='font-semibold'>Share to your WhatsApp Status</div>
            {!isHiddenShareStatus && (
              <button 
                onClick={handleWhatsAppStatus}
                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition'
              >
                Do
              </button>
            )}
          </div>

          {/* Watch an Ad */}
          <div className='flex justify-between items-center w-full p-3 bg-white rounded-lg shadow-md mb-4'>
            <div className='font-semibold'>Watch an Ad & get 10 rupees</div>
            {/* <Link to='/adds' > */}
              <button onClick={handleAdds} className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition'>
                {add}
              </button>
            {/* </Link> */}
          </div>

          {/* Random Number and Amount Display */}
          <div className='flex justify-between items-center w-full p-3 bg-white rounded-lg shadow-md'>
            <div><p className='font-bold'>User:</p>{randomPhone}</div>
            <div className='text-green-600 font-bold'>Earned: {randomAmount} rupees</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-xs">
          <img src='1000rupees.png' alt='tasks' className=" mb-4" />
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

export default Tasks;
