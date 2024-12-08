// src/components/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading]= useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError(null);
    try {
      const result = await login(email, password);
      if (result.success) {
        setIsLoading(false)
        navigate('/dashboard'); // Navigate to dashboard after successful login
      } else {
        setIsLoading(false)

        setError(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  if (isLoading) return (
  <div className='bg-customGreen flex items-center justify-center min-h-screen'>
    <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);


  const goToRegister = () =>{
    setIsLoading(true)
    navigate('/register')
  }

  return (
    <div className='bg-customGreen min-h-screen flex flex-col'>
      <div className='flex-grow flex items-center justify-center'>
        <form className='bg-customLightGreen m-4 p-8 rounded-lg shadow-md w-full max-w-md' onSubmit={handleSubmit}>
          <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
          <div className='mb-4'>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='w-full p-2 font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-customBlue'
            />
          </div>
          <div className='mb-6'>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full p-2 font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-customBlue'
            />
          </div>
          <button type="submit" className='w-full py-2 text-xl font-semibold shadow:md m-4 p-2 border border-b-customGreen hover:bg-amber-700 bg-customBlue text-white rounded hover:bg-customDarkBlue transition duration-200'>
            Submit
          </button>
          <p className='font-bold items-baseline'>Dont have an account yet ? <span><button className='underline text-blue-700 font-semibold' onClick={goToRegister}>Register</button></span></p>
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
