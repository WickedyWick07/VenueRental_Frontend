import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'




const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close the menu on navigation
  };

  const isActive = (path) => location.pathname === path ? 'bg-blue-700' : 'bg-amber-700';

  return (
    <header className='p-4'>
      <div className='container mx-auto flex justify-between items-center bg-customLightGreen border p-4 rounded'>
        <img src={logo} alt="logo" width={60} height={20} className='rounded-full' />
        <nav className='hidden md:flex'>
          <button onClick={() => handleNavigation('/profile-view')} className={`${isActive('/profile-view')} font-bold rounded text-white px-4 py-2 mx-2`}>Profile View</button>
          <button onClick={() => handleNavigation('/venue-view')} className={`${isActive('/venue-view')} font-bold rounded px-4 text-white py-2 mx-2`}>Venue View</button>
          <button onClick={() => handleNavigation('/contact-us')} className={`${isActive('/contact-us')} font-bold rounded px-4 text-white py-2 mx-2`}>Contact Us</button>
          <button onClick={() => handleNavigation('/dashboard')} className={`${isActive('/dashboard')} font-bold rounded px-4 text-white py-2 mx-2`}>Dashboard</button>
          <button onClick={() => handleNavigation('/')} className={`${isActive('/')} font-bold rounded px-4 text-white py-2 mx-2`}>Home</button>
        </nav>
        <div className='md:hidden'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='font-bold bg-amber-700 rounded text-white px-4 py-2 mx-2'
          >
            ☰
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className='md:hidden bg-customLightGreen border p-4 rounded mt-2'>
          <button onClick={() => handleNavigation('/profile-view')} className={`${isActive('/profile-view')} block font-bold rounded text-white px-4 py-2 mx-2 my-1`}>Profile View</button>
          <button onClick={() => handleNavigation('/venue-view')} className={`${isActive('/venue-view')} block font-bold rounded px-4 text-white py-2 mx-2 my-1`}>Venue View</button>
          <button onClick={() => handleNavigation('/contact-us')} className={`${isActive('/contact-us')} block font-bold rounded px-4 text-white py-2 mx-2 my-1`}>Contact Us</button>
          <button onClick={() => handleNavigation('/dashboard')} className={`${isActive('/dashboard')} block font-bold rounded px-4 text-white py-2 mx-2 my-1`}>Dashboard</button>
          <button onClick={() => handleNavigation('/')} className={`${isActive('/')} font-bold rounded px-4 text-white py-2 mx-2`}>Home</button>

        </div>
      )}
    </header>
  );
};

export default Header;
