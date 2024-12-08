// src/components/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');  // Navigate to login after successful registration
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className='bg-customGreen min-h-screen flex flex-col'>
    <div className='flex-grow flex items-center justify-center'>
      <form className='bg-customLightGreen m-4 p-8 rounded-lg shadow-md w-full max-w-md' onSubmit={handleSubmit}>
        <h2 className='font-medium text-xl leading-normal uppercase mb-6 text-center'>Register</h2>
        <div className='mb-4'>
          <label htmlFor="firstname" className='block text-sm font-medium text-gray-700'>First Name</label>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
            className='w-full p-2 font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-customBlue'
            />
        </div>
        <div className='mb-4'>
          <label htmlFor="lastname" className='block text-sm font-medium text-gray-700'>Last Name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
            className='w-full p-2 font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-customBlue'
            />
        </div>
        <div className='mb-4'>
          <label htmlFor="username" className='block text-sm font-medium text-gray-700'>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            className='w-full p-2 font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-customBlue'
            />
        </div>
        <div className='mb-4'>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700'>E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className='w-full p-2 font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-customBlue'
            />
        </div>
        <div className='mb-6'>
          <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className='w-full p-2 font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-customBlue'
            />
        </div>
        <button type="submit"  className='w-full py-2 text-xl font-semibold mx-auto shadow:md m-4 p-2 border border-b-customGreen hover:bg-amber-700 bg-customBlue text-white rounded hover:bg-customDarkBlue transition duration-200'>
          Submit
        </button>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </form>
    </div>
    <Footer />
  </div>  );
};

export default Register;
