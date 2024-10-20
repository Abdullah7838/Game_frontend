import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';

function Tasks() {
  const navigate = useNavigate(); 
  const { add, login, setBalance, Mainbalance, setMBalan } = useContext(AppContext);

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const [do1, sdo1] = useState('Do');
  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem('count')) || 1;
  });

  const [isHiddenShareWithFriends, setIsHiddenShareWithFriends] = useState(() => {
    return localStorage.getItem('isHiddenShareWithFriends') === 'true'; 
  });

  const [isHiddenShareStatus, setIsHiddenShareStatus] = useState(() => {
    return localStorage.getItem('isHiddenShareStatus') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent("I have earned 1000 rupees, go check out this: salidin.com");
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');

    setCount(count + 1);
    sdo1('Try Again');
    if (count === 2) {
      setIsHiddenShareWithFriends(true);
      localStorage.setItem('isHiddenShareWithFriends', true);
      setTimeout(() => {
        setIsHiddenShareWithFriends(true);
      }, 2000);
    }
  };

  const handleWhatsAppStatus = () => {
    const message = encodeURIComponent("I have earned 1000 rupees, go check out this: salidin.com");
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');

    setCount(count + 1);

    setIsHiddenShareStatus(true);
    localStorage.setItem('isHiddenShareStatus', true);
    setTimeout(() => {
      setIsHiddenShareStatus(true);
    }, 2000);
  };

  const handleAdds = () => {
    if (isHiddenShareWithFriends && isHiddenShareStatus) {
      console.log("Ad is available to watch");
    } else {
      alert("Please complete the upper two tasks first.");
    }
  };

  const generateRandomPhoneNumber = () => {
    const middlePart = Math.floor(Math.random() * 90000) + 10000; 
    const lastPart = Math.floor(Math.random() * 9000) + 1000; 
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
    }, 1000); // Updates every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {login ? (
        <div>
          <div className='flex justify-center flex-col items-center'>
            <div>
              <img src='1000rupees.png' alt='tasks' />
            </div>
            <div className='text-md text-lg font-bold mt-2 text-blue-700'>Your Balance is: {Mainbalance} rupees</div>
            <div className='text-md font-bold mb-4 mt-2'>Complete the following tasks</div>

            {/* Share with 2 friends */}
            <div className='flex justify-between items-center w-full max-w-md p-2 bg-gray-100 rounded-lg shadow'>
              <div className='mr-4 ml-2 font-bold text-lg'>Share with 2 friends</div>
              {!isHiddenShareWithFriends && (
                <button 
                  onClick={handleWhatsAppShare}
                  className='bg-blue-600 text-white p-2 px-3 rounded font-bold mr-4'
                >
                  {do1}
                </button>
              )}
            </div>

            {/* Share to WhatsApp Status */}
            <div className='flex justify-between items-center w-full max-w-md p-2 bg-gray-100 rounded-lg shadow'>
              <div className='mr-4 ml-2 font-bold text-lg'>Share to your WhatsApp Status</div>
              {!isHiddenShareStatus && (
                <button 
                  onClick={handleWhatsAppStatus}
                  className='bg-blue-600 text-white p-2 px-3 rounded font-bold mr-4'
                >
                  Do
                </button>
              )}
            </div>

            {/* Watch an Ad */}
            <div className='flex justify-between items-center w-full max-w-md p-2 bg-gray-100 rounded-lg shadow'>
              <div className='mr-4 ml-2 font-bold text-lg'>Watch an Ad & get 10 rupees</div>
              <Link to='/adds' onClick={handleAdds}>
                <button className='bg-blue-600 text-white p-2 px-3 rounded font-bold mr-4'>
                  {add}
                </button>
              </Link>
            </div>

            {/* Random Number and Amount Display */}
            <div className='flex justify-between items-center w-full max-w-md p-2 mt-8 bg-gray-100 rounded-lg shadow'>
              <div className='mr-4 ml-2 font-bold text-lg'>User: {randomPhone}</div>
              <div className='text-green-600 font-bold'>Earned: {randomAmount} rupees</div>
            </div>

          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center bg-gray-100">
            <img src='1000rupees.png' alt='tasks' />
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
        </div>
      )}
    </div>
  );
}

export default Tasks;
