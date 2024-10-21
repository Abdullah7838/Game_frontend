import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [text,setText]=useState('Login')
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const { setLogin,setNumb, setPass  } = useContext(AppContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        setText('Loading');
        e.preventDefault();
                console.log('Number:', number, 'Password:', password);

        try {
            const response = await axios.post('https://game-backend-phi.vercel.app/login', {
                number,
                password,
            });

            if (response.status === 200) {
                setNumb(number)
                setPass(password)
                toast.success('Login successful!');
                setLogin(true);
                navigate('/'); 
            }
        } catch (error) {
            setText('Login');
            console.error('Login error:', error);
            if (error.response && error.response.status === 400) {
                toast.error('Invalid credentials. Please try again.');
            } else {
                toast.error('Server Error ');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="bg-white p-6 rounded-md shadow-md w-full max-w-sm"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Enter your Mobile Number</label>
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Enter your number"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    {text}
                </button>
                <div className='mt-4'>No account yet? <Link to='/signup'><button className='text-blue-600 text-lg ml-4'>Signup now</button></Link></div>
            </form>
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
    );
}

export default Login;
