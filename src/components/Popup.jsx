import React, { useState, useEffect } from 'react';

function Popup() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const popupClosed = localStorage.getItem('popupClosed');
        if (popupClosed === 'true') {
            setIsVisible(false);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('popupClosed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-40 left-1/2 transform -translate-x-1/2 z-50 bg-zinc-700 w-72 h-56 rounded-lg flex flex-col items-center justify-center shadow-lg transition-transform duration-300 ease-in-out">
            <div className="font-bold text-center text-white text-xl mb-2">Announcement</div>
            <div className="text-center text-blue-400 p-2">
                Withdraws are Open Now!.
                Watch ads to earn cash as much as you can.
                Share and increase the community.
            </div>
            <button
                onClick={handleClose}
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
            >
                Close
            </button>
        </div>
    );
}

export default Popup;
