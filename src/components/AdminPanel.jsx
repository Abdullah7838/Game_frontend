import React, { useEffect, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [withdraws, setWithdraws] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activePage, setActivePage] = useState('userAccounts');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        const storedPassword = sessionStorage.getItem('password');

        if (storedUsername === 'user' && storedPassword === '1') {
            setIsAuthenticated(true);
            fetchUsers();
        } else {
            promptLogin();
        }
    }, []);

    const promptLogin = () => {
        const inputUsername = prompt('Enter username:');
        const inputPassword = prompt('Enter password:');

        if (inputUsername === 'user' && inputPassword === '1') {
            sessionStorage.setItem('username', inputUsername);
            sessionStorage.setItem('password', inputPassword);
            setIsAuthenticated(true);
            fetchUsers();
        } else {
            alert('Invalid credentials! Access denied.');
            window.location.reload();
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://game-backend-phi.vercel.app/allaccounts');
            const data = await response.json();
            setUsers(data.reverse());
        } catch (error) {
            console.error("Error fetching user accounts:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWithdraws = async () => {
        try {
            const response = await fetch('https://game-backend-phi.vercel.app/withdraws');
            const data = await response.json();
            setWithdraws(data);
        } catch (error) {
            console.error("Error fetching withdraws:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch('https://game-backend-phi.vercel.app/users', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: userId }),
                });

                if (response.ok) {
                    setUsers(users.filter(user => user._id !== userId));
                    alert('User deleted successfully.');
                } else {
                    const errorData = await response.json();
                    alert(errorData.message);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };


    const handleDeleteWithdrawal = async (withdrawNumber) => {
        if (window.confirm('Are you sure you want to delete this withdrawal?')) {
            try {
                const response = await fetch('https://game-backend-phi.vercel.app/del/withdraws', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ number: withdrawNumber }),
                });

                if (response.ok) {
                    setWithdraws(withdraws.filter(withdraw => withdraw.number !== withdrawNumber));
                    toast.success('Withdrawal deleted successfully.');
                } else {
                    const errorData = await response.json();
                    alert(errorData.message);
                }
            } catch (error) {
                console.error('Error deleting withdrawal:', error);
            }
        }
    };

    if (loading) {
        return <div className="text-center p-5">Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className={`bg-gray-800 text-white p-4 w-64 space-y-2 absolute md:relative md:translate-x-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="md:hidden text-white bg-red-500 p-1 rounded-lg absolute top-4 right-4"
                >
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
                <ul>
                    <li
                        onClick={() => setActivePage('userAccounts')}
                        className={`cursor-pointer p-2 ${activePage === 'userAccounts' ? 'bg-gray-700' : ''}`}
                    >
                        User Accounts
                    </li>
                    <li
                        onClick={() => setActivePage('withdraws')}
                        className={`cursor-pointer p-2 ${activePage === 'withdraws' ? 'bg-gray-700' : ''}`}
                    >
                        Withdraws
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-5">
                {/* Menu button for small screens */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden text-white bg-blue-500 p-2 rounded-lg mb-4"
                >
                    Menu
                </button>

                {activePage === 'userAccounts' && (
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-5">User Accounts</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users.map(user => (
                                <div key={user._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold">{user.name}</h2>
                                        <p className="mt-2 text-gray-500">ID: {user._id}</p>
                                        <p className="text-gray-600">Number: {user.number}</p>
                                        <p className="text-gray-600">Balance: {user.balance}</p>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activePage === 'withdraws' && (
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-5">Withdraws</h1>
                        <button onClick={fetchWithdraws} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Fetch Withdraws</button>
                        <div className="space-y-4">
                            {withdraws.map((withdraw, index) => (
                                <div key={index} className="bg-blue-200 shadow-md rounded-lg p-4">
                                    <p><strong>Name:</strong> {withdraw.name}</p>
                                    <p><strong>Number:</strong> {withdraw.number}</p>
                                    <p><strong>Amount:</strong> {withdraw.Amount}</p>
                                    <p><strong>Bank:</strong> {withdraw.Bank}</p>
                                    <p><strong>Date:</strong> {new Date(withdraw.date).toLocaleString()}</p>
                                    <button
                                        onClick={() => handleDeleteWithdrawal(withdraw.number)}
                                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                                    >
                                        Delete Withdrawal
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
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
};

export default AdminPanel;
