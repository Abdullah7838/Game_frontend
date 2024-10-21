import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import Adstera from './Adstera';
import Adstera2 from './Adstera2';

function Adds() {
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();
  const { setAdd, Mainbalance, setMBalan } = useContext(AppContext);
  const hasUpdated = useRef(false); 

  useEffect(() => {
    if (timeLeft === 0 && !hasUpdated.current) {
      hasUpdated.current = true; 
      console.log('Current Mainbalance:', Mainbalance);
      setMBalan((prevBalance) => prevBalance + 10);
      setAdd('Watch');
      navigate('/');
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate, Mainbalance, setMBalan, setAdd]);

  return (
    <div>
      <div className='text-center font-bold mb-4 mt-1'>Reward in {timeLeft} seconds...</div>
      <div className='text-center'>Ad center</div>
      <Adstera2></Adstera2>
      <Adstera></Adstera>
    </div>
  );
}

export default Adds;
