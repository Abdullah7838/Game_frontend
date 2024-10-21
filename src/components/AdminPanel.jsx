import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Check authentication when the component mounts
    useEffect(() => {
        if (!isAuthenticated) {
            const storedUsername = sessionStorage.getItem('username');
            const storedPassword = sessionStorage.getItem('password');

            // Check stored credentials
            if (storedUsername === 'user' && storedPassword === '1') {
                setIsAuthenticated(true);
                fetchUsers(); // Fetch users if authenticated
            } else {
                promptLogin();
            }
        }
    }, [isAuthenticated]);

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

    if (loading) {
        return <div className="text-center p-5">Loading...</div>;
    }

    if (!isAuthenticated) {
        return null; 
    }

    return (
        <div className="container mx-auto p-5">
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
    );
};

export default AdminPanel;
