import React, { useContext } from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import video8 from '../assets/video8.mp4';
import video5 from '../assets/video4.mp4';

const Home = () => {
  const navigate = useNavigate();
  const { fetchCurrentUser, currentUser, logout } = useContext(AuthContext);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='bg-gradient-to-r from-customGreen to-customLightGreen min-h-screen flex flex-col'>
      <section className='flex flex-col items-center bg-customLightGreen p-4'>
        {currentUser ? (
          <div className='flex flex-col items-center mt-4 first-letter:uppercase'>
            <h1 className='text-2xl font-bold text-center mb-2 first-letter:uppercase'>
              Welcome <span className='text-white uppercase underline '>{currentUser.username}</span> to
            </h1>
            <h2 className='text-4xl font-bold text-center font-serif mb-4'>ALWAYS ON TOP VENUE RENTALS</h2>
            <div className='flex gap-4'>
              <button
                onClick={() => handleNavigation('/dashboard')}
                className='bg-white text-primaryBlue border rounded px-4 py-2 font-semibold uppercase hover:bg-gray-200 transition-all'
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className='bg-slate-700 text-white border rounded px-4 py-2 font-semibold uppercase hover:bg-slate-800 transition-all'
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center mt-4'>
            <h1 className='text-2xl font-bold text-center mb-2 first-letter:uppercase'>
              Welcome <span className='text-white lowercase '>Guest</span>
            </h1>
            <h2 className='text-4xl font-bold text-center font-serif mb-4'>ALWAYS ON TOP VENUE RENTALS</h2>
            <div className='flex gap-4'>
              <button
                onClick={() => handleNavigation('/login')}
                className='bg-white text-primaryBlue border rounded px-4 py-2 font-semibold uppercase hover:bg-gray-200 transition-all'
              >
                Login
              </button>
              <button
                onClick={() => handleNavigation('/register')}
                className='bg-slate-700 text-white border rounded px-4 py-2 font-semibold uppercase hover:bg-slate-800 transition-all'
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </section>

      <section className='bg-gradient-to-r from-customGreen to-customLightGreen flex flex-wrap justify-center items-center p-4'>
        <div className='mt-6 p-4 flex flex-col items-center md:flex-row md:items-start'>
          <video className='w-full h-64 md:w-1/2 md:h-auto mb-4 md:mb-0' src={video2} autoPlay loop muted></video>
          <div className='md:ml-4 md:w-1/2'>
            <h3 className='text-4xl font-bold text-white spacing-2 first-letter:uppercase p-4  mb-2'>Vacation</h3>
            <p className='text-xl text-white font-semibold'>
            Nestled amidst breathtaking natural scenery, Event Haven is a premier venue offering panoramic views of lush gardens and serene water features. Known for its elegant architecture and modern amenities, this versatile space is perfect for hosting weddings, corporate events, and social gatherings. With spacious indoor halls and beautiful outdoor settings, Event Haven provides a captivating backdrop for any occasion, ensuring an unforgettable experience surrounded by nature’s beauty and refined comfort.
             </p>
          </div>
        </div>

        <div className='mt-6 p-4 flex flex-col items-center md:flex-row md:items-start'>
          <div className='md:mr-4 md:w-1/2'>
            <h3 className='text-4xl font-bold text-white spacing-2 first-letter:uppercase p-4  mb-2'>Luxury</h3>
            <p className='text-xl text-white font-semibold'>
            Step into the elegance of Celebration Vista, a highly sought-after venue for weddings and corporate events. Boasting picturesque views of rolling hills and tranquil lakes, this destination offers a perfect blend of sophistication and natural beauty. With its spacious banquet halls, stunning outdoor terraces, and exceptional service, Celebration Vista creates an enchanting atmosphere for any occasion, making it a memorable choice for special events            </p>
          </div>
          <video className='w-full h-64 md:w-1/2 md:h-auto mb-4 md:mb-0' src={video3} autoPlay loop muted></video>
        </div>
      </section>

      <section className='bg-gradient-to-r from-customLightGreen to-customGreen flex flex-wrap justify-center items-center p-4'>
        <div className='mt-6 p-4 flex flex-col items-center md:flex-row md:items-start'>
          <video className='w-full h-64 md:w-1/2 md:h-auto mb-4 md:mb-0' src={video8} autoPlay loop muted></video>
          <div className='md:ml-4 md:w-1/2'>
            <h3 className='text-4xl font-bold text-white spacing-2 first-letter:uppercase p-4  mb-2'>Weddings</h3>
            <p className='text-xl text-white font-semibold'>

            Discover the allure of Horizon Retreat, where modern amenities meet the tranquility of nature. Ideal for any special occasion, this venue features state-of-the-art facilities paired with stunning views of forests and open skies. Whether you're planning a wedding, a corporate event, or a private celebration, Horizon Retreat offers the perfect balance of comfort and natural beauty, ensuring a seamless and unforgettable experience for every guest.            </p>
          </div>
        </div>

        <div className='mt-6 p-4 flex flex-col items-center md:flex-row md:items-start'>
          <div className='md:mr-4 md:w-1/2'>
            <h3 className='text-4xl font-bold text-white spacing-2 first-letter:uppercase p-4  mb-2'>Bedding</h3>
            <p className='text-xl text-white font-semibold'>
            Welcome to Grand Elegance Estate, a destination renowned for its luxurious venues and impeccable service. Offering opulent ballrooms, scenic gardens, and world-class amenities, this venue is perfect for those seeking a truly unforgettable event. Whether hosting a wedding, gala, or corporate gathering, Grand Elegance Estate promises an extraordinary experience, with every detail meticulously crafted to exceed expectations and leave a lasting impression on all guests.            </p>
          </div>
          <video className='w-full h-64 md:w-1/2 md:h-auto mb-4 md:mb-0' src={video5} autoPlay loop muted></video>
        </div>
      </section>

      <section className='bg-customLightGreen rounded p-4 m-8'>
        <ul className='space-y-4'>
          <li className='p-4 border-t hover:translate-x-1 hover:translate-y-3  rounded shadow-sm'>
            <div className='flex items-center mb-2'>
              <i className="fas fa-history text-2xl mr-2"></i>
              <h3 className='text-2xl font-bold'>Our History</h3>
            </div>
            <p className='text-md font-semibold  '>
              Always On Top Venue Rentals started with a mission to provide top-notch venues for all types of events. With over 20 years of experience in the industry, we have become a trusted name known for our exceptional service and stunning venues.
            </p>
          </li>

          <li className='p-4 border-t hover:translate-x-1 hover:translate-y-3 rounded-md shadow-sm'>
            <div className='flex items-center mb-2'>
              <i className="fas fa-eye text-2xl mr-2"></i>
              <h3 className='text-2xl font-bold'>Our Vision</h3>
            </div>
            <p className='text-md font-semibold  '>
              Our vision is to be the leading venue rental service provider, offering a diverse range of venues that cater to various needs and preferences. We aim to make every event unforgettable with our unique and customizable spaces.
            </p>
          </li>

          <li className='p-4 border-t hover:translate-x-1 hover:translate-y-3 rounded-md shadow-sm'>
            <div className='flex items-center mb-2'>
              <i className="fas fa-users text-2xl mr-2"></i>
              <h3 className='text-2xl font-bold'>Our Team</h3>
            </div>
            <p className='text-md font-semibold  '>
              Our team consists of experienced professionals who are dedicated to providing the best customer service. From our venue managers to our event coordinators, each member of our team is committed to ensuring your event runs smoothly and successfully.
            </p>
          </li>

          <li className='p-4 border-t hover:translate-x-1 hover:translate-y-3 rounded-md shadow-sm'>
            <div className='flex items-center mb-2'>
              <i className="fas fa-concierge-bell text-2xl mr-2"></i>
              <h3 className='text-2xl font-bold'>Our Services</h3>
            </div>
            <p className='text-md font-semibold '>
              We offer a wide range of services to make your event planning as seamless as possible. From venue selection and setup to catering and entertainment, we provide comprehensive solutions tailored to your specific needs.
            </p>
          </li>

          <li className='p-4 border-t hover:translate-x-1 hover:translate-y-3 rounded-md shadow-sm'>
            <div className='flex items-center mb-2'>
              <i className="fas fa-comment-alt text-2xl mr-2"></i>
              <h3 className='text-2xl font-bold'>Client Testimonials</h3>
            </div>
            <p className='text-md font-semibold '>
              "Always On Top Venue Rentals exceeded our expectations! The venue was stunning, and the service was impeccable. Our event was a huge success, thanks to their professional team." - Jane Doe
            </p>
          </li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
