'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function index() {

  const router = useRouter();
  // const [message, setMessage] = useState('Loading...');

  // useEffect(() => {
  //   fetch('http://localhost:8000/api/home')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMessage(data.message)
  //     });
  // }, []);

  function validateLogin() {
    router.push('/branch')
  };

  return (
    <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
      <div className="bg-gray-400 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-7">FREIGHT2U</h2>
        <div className="mb-4">
          <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700" type="email" id="email" placeholder="User or E-Mail" />
        </div>
        <div className="mb-7">
          <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700" type="password" id="password" placeholder="Password" />
        </div>
        <button onClick={() => validateLogin()} className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-900 transition cursor-pointer">
          Log in
        </button>
      </div>
    </div>
  );
}

export default index;