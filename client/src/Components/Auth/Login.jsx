import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../Main/Main.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    // Add your login logic here, such as sending a request to the server
    // with the email and password for authentication.
    // You can use the 'email' and 'password' state variables.
  };

  return (
    <div className='mx-auto p-8 md:p-20 mt-12 h-[93vh] flex justify-center items-center bg-[#F6F6F6]'>
      <div className='p-6 rounded-lg bg-white md:w-[40%] w-[95%] md:h-4/5 h-[70%] shadow-lg flex flex-col justify-center items-center'>
        <h2 className='text-3xl font-medium mb-6'>Login</h2>
        <form onSubmit={(e)=>{e.preventDefault();}} className='w-[70%] max-w-md'>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 text-md font-medium mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-700 text-md font-medium mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
          </div>
          <div className='flex items-center justify-center'>
            <Link to='/generator'>
            <button
              type='submit'
              onClick={handleLogin}
              className='custom-button mt-5 hover:text-black py-3 px-8 md:px-16'
            >
              <span className="button-text">Login</span>
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

