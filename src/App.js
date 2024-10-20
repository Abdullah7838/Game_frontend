import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Tasks from './components/Tasks';
import Account from './components/Account';
import Navbar from './components/Navbar';
import Withdraw from './components/Withdraw';
import Adds from './components/Adds';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  const location = useLocation();

  const noNavbarRoutes = ['/adds','/signup','/login']; 

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/adds" element={<Adds />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Tasks />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
