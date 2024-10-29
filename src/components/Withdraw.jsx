import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext'; // Import your context
import { useNavigate } from 'react-router-dom';

function Withdraw() {
  const [amount,Samount] = useState(null)
  const [amount1,famount] = useState(null)
  const { login, Mainbalance } = useContext(AppContext); // Assuming login state is managed in AppContext
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
 useEffect(()=>{
   if(amount>Mainbalance){
    alert('Amount should not be Greater than available Balance');
    Samount(0);
    return;
   }
 famount(amount/100);
 },[amount]);

 const WithdrawAmount=(e)=>{
  e.preventDefault();
  alert('Withdraws are opening on 31st October Stay Connected');
 }
  return (
    <div>
      {login ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 pl-4 pr-4">
          <div className="bg-white p-2 pl-8 pr-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">Withdraw Funds</h1>
            <div className="mb-4">
              {/* Add the withdrawal form or information here */}
              <p className="text-gray-700 mb-2">Current Balance: <span className="font-semibold text-blue-700">{Mainbalance} rupees</span></p>
              <form>
                <label>Enter Amount to Withdraw</label>
                <input onKeyUp={(e)=>Samount(e.target.value)} type='number' className='w-full text-center bg-white text-black border-2 p-2 border-green-600 rounded-md' placeholder='Amount'></input>
                <label>Amount You Received in PKR</label>
                <div className='w-full bg-white text-black border-2 p-2 border-green-600 rounded-md'>{amount1}</div>
                <button onClick={WithdrawAmount} className=' font-bold text-white w-full p-2 bg-blue-400 rounded-md mt-2'>Withdraw</button>
              </form>
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
