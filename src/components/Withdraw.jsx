import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext'; // Import your context
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function Withdraw() {
  const [amount,Samount] = useState(null)
  const [Bank,setBank] = useState(null)
  const [amount1,famount] = useState(null)
  const { login, Mainbalance,password,no,name,setMBalan } = useContext(AppContext); // Assuming login state is managed in AppContext
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handlesignupClick=()=>{
    navigate('/signup');
  }
 useEffect(()=>{
   if(amount>Mainbalance){
    alert('Amount should not be Greater than Current Balance');
    Samount(' ');
    return;
   }
 famount(amount/100);
 },[amount]);

 const WithdrawAmount=async(e)=>{
  e.preventDefault();
  let number = Mainbalance - amount;
  if(amount1<100){
    toast.error('Receiving Amount Should be greater than 100');
    return;
  }
  try {
    await axios.post('https://game-backend-phi.vercel.app/withdraws',{
      number: no,
      password: password,
      name: name,
      Bank:Bank,
      Amount:amount1,
    });
    await axios.post('https://game-backend-phi.vercel.app/balance', {
      number: no,
      password: password,
      balance: number, 
    });
    alert(`Your Bank Name is ${Bank}, Account Holder Name is ${name}, Account Number is ${no}`);
    setMBalan(number)
    toast.success("Sucessfully wait 24h only")
  } catch (err) {
    console.error('Error in saveBalance:', err); 
    toast.success("Error Try Again!")
  }
  // alert('Withdraws are opening on 11th November Stay Connected');
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
              <form onSubmit={WithdrawAmount}>
                <label>Enter Amount to Withdraw</label>
                <input onChange={(e)=>Samount(e.target.value)} required value={amount} type='number' className='w-full text-center bg-white text-black border-2 p-2 border-green-600 rounded-md' placeholder='Amount'></input>
                <label>Receiving in PKR</label>
                <div className='w-full bg-white text-black border-2 p-2 border-green-600 rounded-md'>{amount1}</div>
                <label>Enter Your Bank Name</label>
                <input onChange={(e)=>setBank(e.target.value)} required value={Bank} type='text' className='w-full text-center bg-white text-black border-2 p-2 border-green-600 rounded-md' placeholder='JazzCash/EasyPaisa'></input>
                <button
                type='submit'
                className=' font-bold text-white w-full p-2 bg-blue-400 rounded-md mt-2'>Withdraw</button>
              </form>
            </div>
            {/* Add more withdrawal details here */}
          </div>
          <ToastContainer
                position="top-center"
                autoClose={5000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-md">
        <img src='1000rupees.png' alt='tasks' className=" mb-4 p-2" />
        <div className="bg-white p-6 rounded-lg shadow-md w-full text-center">
          <h2 className='font-bold text-blue-600 mb-2'>Earn real cash by watching ads</h2>
          <h1 className="text font-semibold mt-4">already have account?</h1>
          <button
            onClick={handleLoginClick}
            className="bg-blue-500 font-bold text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
          >
            Login
          </button>
          <h1 className="text-blue-700 font-semibold mt-4">no account yet?</h1>
          <button
            onClick={handlesignupClick}
            className="bg-blue-500 font-bold text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
          >
            SignUp
          </button>
          
        </div>
      </div>
      )}
    </div>
  );
}

export default Withdraw;
