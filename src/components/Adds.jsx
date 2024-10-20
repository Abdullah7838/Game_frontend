import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';

function Adds() {
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();
  const {setAdd} = useContext(AppContext)

  useEffect(() => {
    if (timeLeft === 0) {
     setAdd('Watch')
      navigate('/');
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);


  return (
    <div>
      <div className='text-center font-bold mb-4'>Reward in {timeLeft} seconds...</div>
      <div>Ad center</div>
    </div>
  );
}

export default Adds;
