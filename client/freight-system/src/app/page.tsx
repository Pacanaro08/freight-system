'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function index() {

  const [warning, setWarning] = useState('')
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function validateLogin() {
    if (login && password || login! > '' && password! > '') {
      try {
        fetch('http://127.0.0.1:8000/db-procedures/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            'user_code': login,
            'user_password': password,
          })
        })
          .then(response => response.json())
          .then((data) => {
            if (data) {
              if (data.valid == true) {
                router.push('/branch')
              } else {
                setWarning('Usuário ou senha inválidos!')
              }
            } else {
              setWarning('Ocorreu um erro, tente novamente mais tarde!')
            }
          })
          .catch((error) => {
            setWarning(error)
          })
      } catch (err) {
        console.log(err)
        setWarning('Ocorreu um erro, tente novamente mais tarde!')
      }
    } else {
      setWarning('Insira Login e Senha!')
    };
  }

  return (
    <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
      <div className='bg-gray-400 p-8 rounded shadow-md w-96'>
        <h2 className='text-2xl font-bold text-center mb-7'>FREIGHT2U</h2>
        <div className='mb-4'>
          <input
            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700'
            type='email'
            id='email'
            placeholder='User or E-Mail'
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className='mb-7'>
          <input
            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700'
            type='password'
            id='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {
          warning && (
            <div className='-mt-4 mb-3 flex items-center justify-center'>
              <p className='text-red-800'>
                {warning}
              </p>
            </div>
          )
        }
        <button onClick={() => validateLogin()} className='w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-900 transition cursor-pointer'>
          Log in
        </button>
      </div>
    </div>
  );
}

export default index;