'use client';
import React, { useEffect } from 'react';

export default function Adstera4() {
  useEffect(() => {
    // Create and append the ad script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl24144557.cpmrevenuegate.com/547a40980660e6dcb0a576b996171ec3/invoke.js';
    document.body.appendChild(script);

    // Create and append the ad container
    const adContainer = document.createElement('div');
    adContainer.id = 'container-547a40980660e6dcb0a576b996171ec3';
    document.body.appendChild(adContainer);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(adContainer);
    };
  }, []);

  return (
    <div className="flex justify-center my-4 ">
      <div id="container-547a40980660e6dcb0a576b996171ec3"></div>
    </div>
  );
}
