'use client';
import React, { useEffect, useRef } from 'react';

export default function Adstera() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Create and configure the script element for the ad
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//www.topcreativeformat.com/442e968534a2082b09221b3757de4db4/invoke.js';

    // Create and configure the ad options script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        key: '442e968534a2082b09221b3757de4db4',
        format: 'iframe',
        height: 600,
        width: 160,
        params: {}
      };
    `;

    // Append configuration and script to the container
    adRef.current.appendChild(configScript);
    adRef.current.appendChild(script);

    // Cleanup on component unmount
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = ''; // Clear ad container
      }
    };
  }, []);

  return (
    <div className="my-4 xs:flex sm:flex md:flex lg:flex justify-center ml-24">
      {/* The container where the ad will be rendered */}
      <div ref={adRef} id="container-442e968534a2082b09221b3757de4db4"></div>
    </div>
  );
}
