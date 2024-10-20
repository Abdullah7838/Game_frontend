import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [text,setText]=useState('Signup')
    const { setLogin,setNumb, setPass } = useContext(AppContext);
    const navigate = useNavigate();
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (number.length !== 11) {
            setText('Signup')
            toast.error('Number must be of 11 digits.'); // Length validation
            return;
        }
        
        try {
            setText('Loading..')
            const res = await axios.post('https://game-backend-phi.vercel.app/signup', {
                name,
                password,
                number,
            });

            if (res.status === 201) {
                setNumb(number)
                setPass(password)
                setLogin(true);
                toast.success('Signup successful!'); 
                navigate('/');
            }
        } catch (err) {
            setText('Signup');
            console.error('Error:', err);
            if (err.response && err.response.status === 409) {
                toast.error('Number already exists. Please use a different number.');
            } else {
                toast.error('Number already exists.'); 
            }
        }
        
        console.log('Name:', name, 'Number:', number, 'Password:', password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="bg-white p-6 rounded-md shadow-md w-full max-w-sm"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Enter your Whatsapp Number</label>
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="03......."
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
            </form>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                limit={0}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce} // This will need to be imported
            />
        </div>
    );
}

export default Signup;
