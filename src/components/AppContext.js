import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [Mainbalance, setMBalan] = useState(0);
  const [name, setName] = useState('');
  const [no, setNo] = useState('');
  const [number, setNumb] = useState('')
  const [password, setPass] = useState('')
  const [login, setLogin] = useState(false);
  const [add, setAdd] = useState('Watch')

  useEffect(() => {
    const saveBalance = async () => {
      if (Mainbalance !== 0) { 
        try {
          await axios.post('https://game-backend-phi.vercel.app/balance', {
            number: no,
            password: password,
            balance: Mainbalance, 
          });
        } catch (err) {
          console.error('Error in saveBalance:', err); 
        }
      }
    };
    saveBalance();
  }, [Mainbalance, no, password]); 

  useEffect(() => {
    localStorage.setItem('login', login);
  }, [login]);

  // useEffect(() => {
  //   localStorage.setItem('number', number);
  // }, [number]);

  // useEffect(() => {
  //   localStorage.setItem('password', password);
  // }, [password]);


  // Logout function
  const handleLogout = () => {
    setLogin(false);
    setNumb('');
    setPass('');
    localStorage.removeItem('number');
    localStorage.removeItem('password');
  };

  useEffect(() => {
    const fetchAll = async () => {
      if (number && password) { 
        try {
          const res = await axios.post('https://game-backend-phi.vercel.app/login', { number, password });
          setMBalan(res.data.user.balance); 
          setName(res.data.user.name);
          setNo(res.data.user.number);
        } catch (err) {
          console.error('Error while fetching details in context:', err);
        }
      }
    };
    fetchAll();
  }, [number, password]); 

  return (
    <AppContext.Provider value={{ 
      add, 
      setAdd, 
      login, 
      setLogin, 
      number, 
      setNumb, 
      password, 
      setPass, 
      handleLogout, 
      name, 
      no, 
      Mainbalance, 
      setMBalan 
    }}>
      {children}
    </AppContext.Provider>
  );
};
