import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [name,setname]=useState('')
  const [no,setno]=useState('')
  const [balance, setBalance] = useState(0);
  const [number, setNumb] = useState(() => localStorage.getItem('number') || '');
  const [password, setPass] = useState(() => localStorage.getItem('password') || '');
  const [login, setLogin] = useState(() => localStorage.getItem('login') === 'true');
  const [add, setAdd] = useState(() => localStorage.getItem('add') || 'Watch');

  useEffect(() => {
    localStorage.setItem('login', login);
  }, [login]);

  useEffect(() => {
    localStorage.setItem('number', number);
  }, [number]);

  useEffect(() => {
    localStorage.setItem('password', password);
  }, [password]);

  useEffect(() => {
    localStorage.setItem('add', add);
  }, [add]);

  const handleLogout = () => {
    setLogin(false);
    setNumb('');
    setPass('');
    localStorage.removeItem('number');
    localStorage.removeItem('password');
  };
useEffect(()=>{
  const fetchall=async()=>{
  const res =await axios.post('https://game-backend-phi.vercel.app/login',{number,password});
  setBalance(res.data.user.balance);
  setname(res.data.user.name)
  setno(res.data.user.number)
};
fetchall();
})
  return (
    <AppContext.Provider value={{ add, setAdd, login, setLogin, balance, setBalance, number, setNumb, password, setPass, handleLogout ,name,no}}>
      {children}
    </AppContext.Provider>
  );
};
