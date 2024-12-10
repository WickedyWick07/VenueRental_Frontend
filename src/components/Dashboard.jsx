import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import bar6 from '../assets/bar 6.jpg'
import video1 from '../assets/video01.mp4'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './Header'
import Footer from './Footer'
import testimonial1 from '../assets/testimonial1.jpg'
import testimonial2 from '../assets/testimonial2.jpg'
import testimonial3 from '../assets/testimonial3.jpg'
import api from '../../services/api';


const Dashboard = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleNavigation = (path) => {
    navigate(path)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/subscribe/', { email });
      if (response.status === 200) {
        setMessage('Subscription successful! Please check your email.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Subscription error:', error);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-customGreen'>
      <Header />

      <main className='flex-grow'>
      <section className='relative p-7' style={{ backgroundImage: `url(${bar6})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay with 50% opacity */}
        
        <h2 className='relative text-center font-semibold text-white text-4xl uppercase'>All on top venue rentals</h2>
        <p className='relative text-center font-semibold text-white text-xl uppercase'>for all your rental needs</p>
      </section>


      <section className='container mx-auto my-8'>
        <video className='w-full h-64 object-cover' src={video1} autoPlay loop></video>
      </section>

      <section className='py-8 bg-customLightGreen'>
  <h2 className='text-white font-bold text-5xl text-center'>Features And Benefits</h2>
  <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
    <div className='p-4 rounded'>
      <div className='bg-customGreen rounded m-4 p-6'>
        <h2 className='text-white text-xl font-semibold'>Variety of Venues</h2>
        <p className='text-white text-sm'>
          Always on Top offers a wide selection of venues to suit any event, from weddings to corporate functions. Our diverse portfolio ensures you find the perfect location to make your event memorable.
        </p>
      </div>
    </div>
    <div className='p-4 rounded'>
      <div className='bg-customGreen rounded m-4 p-6'>
        <h2 className='text-white text-xl font-semibold'>Affordable Rates</h2>
        <p className='text-white text-sm'>
          We offer competitive pricing on all our venues, ensuring you get the best value for your budget. Our transparent pricing model means no hidden fees, making your planning stress-free.
        </p>
      </div>
    </div>
    <div className='p-4 rounded'>
      <div className='bg-customGreen rounded m-4 p-6'>
        <h2 className='text-white text-xl font-semibold'>Expert Support</h2>
        <p className='text-white text-sm'>
          Our experienced team is dedicated to helping you every step of the way, from selecting the right venue to finalizing details. We're here to ensure your event is a success.
        </p>
      </div>
    </div>
    <div className='p-4 rounded'>
      <div className='bg-customGreen rounded m-4 p-6'>
        <h2 className='text-white text-xl font-semibold'>Convenient Booking</h2>
        <p className='text-white text-sm'>
          Our user-friendly booking platform makes it easy to find and secure your ideal venue in just a few clicks. Manage your bookings and stay updated with our seamless online system.
        </p>
      </div>
    </div>
  </div>
</section>

<section className='py-8'>
  <h2 className='text-white font-bold text-5xl text-center mb-6 py-4'>Testimonials</h2>
  <div className='container mx-auto flex flex-wrap items-center justify-center space-x-4 m-4'>
    <div className='bg-customLightGreen m-4 p-4 rounded w-80 h-80 overflow-hidden'>
      <img src={testimonial2} alt="profile picture" className='w-20 h-20 rounded-full border' />
      <div className='flex flex-col'>
        <p className='m-2 p-2 text-black text-xl font-bold'>Jane Doe</p>
        <p className='text-sm m-2 p-2 text-black overflow-hidden text-ellipsis'>
          "Always on Top made our wedding day unforgettable. The venue was stunning, and the staff went above and beyond to ensure everything was perfect. We couldn't have asked for a better experience."
        </p>
      </div>
    </div>

    <div className='bg-customLightGreen m-4 p-4 rounded w-80 h-80 overflow-hidden'>
      <img  src={testimonial1} alt="profile picture" className='w-20 h-20 rounded-full border' />
      <div className='flex flex-col'>
        <p className='m-2 p-2 text-black text-xl font-bold'>John Smith</p>
        <p className='text-sm m-2 p-2 text-black overflow-hidden text-ellipsis'>
          "The venue for our corporate event was top-notch. The booking process was smooth, and the support team was incredibly helpful. We received numerous compliments from our guests. Highly recommend Always on Top!"
        </p>
      </div>
    </div>

    <div className='bg-customLightGreen m-4 p-4 rounded w-80 h-80 overflow-hidden'>
      <img  src={testimonial3} alt="profile picture" className='w-20 h-20 rounded-full border' />
      <div className='flex flex-col'>
        <p className='m-2 p-2 text-black text-xl font-bold'>Emily Johnson</p>
        <p className='text-sm m-2 p-2 text-black overflow-hidden text-ellipsis'>
          "From start to finish, renting a venue with Always on Top was a breeze. The selection was fantastic, and the team helped us find the perfect location for our anniversary celebration. Thank you for an amazing experience!"
        </p>
      </div>
    </div>
  </div>
</section>



<section className='py-4 bg-customLightGreen'>
      <p className='text-white font-bold text-5xl text-center mb-6 py-4'>Subscribe for Weekly Newsletter</p>
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit} className='flex'>
          <input 
            type="email" 
            className='w-8/12 h-12 px-4 rounded-full placeholder-gray-500 text-gray-900 focus:outline-none' 
            placeholder='Enter Your Email Here...' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className='ml-4 bg-blue-500 text-white px-6 py-2 rounded-full'>
            Subscribe
          </button>
        </form>
      </div>
      {message && <p className="text-center mt-4">{message}</p>}
    </section>

<section className='py-8'>
  <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
    <div className='bg-customLightGreen m-4 p-6 rounded shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-black'>Subscribe</h2>
      <p className='text-black font-semibold'>
        Stay updated with our latest news, special offers, and exclusive content by subscribing to our weekly newsletter. Be the first to know about upcoming events, new venue listings, and special promotions. Subscribing ensures you never miss out on what’s happening at Always on Top.
      </p>
    </div>
    <div className='bg-customLightGreen m-4 p-6 rounded shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-black'>Sign Up</h2>
      <p className='text-black font-semibold'>
        Create an account with Always on Top to enjoy a personalized experience. Sign up to easily manage your bookings, save your favorite venues, and receive recommendations tailored to your preferences. Our seamless signup process ensures you get the most out of our services with minimal effort.
      </p>
    </div>
  </div>
</section>


<section className='py-8 bg-customGreen'>
<h2 className='text-white font-bold text-5xl text-center'>More Features And Benefits</h2>

  <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
    <div className='p-4 rounded m-4 h-60 bg-customLightGreen'>
      <h2 className='text-black text-xl font-bold mb-2'>Exclusive Venues</h2>
      <p className='text-black font-semibold text-md'>
        Explore exclusive venues that are not available elsewhere. Host your event in unique locations that provide a memorable atmosphere and setting for any occasion.
      </p>
    </div>
    <div className='p-4 rounded m-4 h-60 bg-customLightGreen'>
      <h2 className='text-black text-xl font-bold mb-2'>Customizable Packages</h2>
      <p className='text-black font-semibold text-md'>
        Tailor your event with customizable packages that meet your specific needs. From catering options to decor arrangements, we offer flexibility to ensure your event is personalized to perfection.
      </p>
    </div>
    <div className='p-4 rounded m-4 h-60 bg-customLightGreen'>
      <h2 className='text-black text-xl font-bold mb-2'>Seamless Booking Experience</h2>
      <p className='text-black font-semibold text-md'>
        Enjoy a seamless booking experience with our user-friendly platform. Easily browse venues, check availability, and book online hassle-free. Our intuitive process saves you time and effort.
      </p>
    </div>
  </div>
</section>



        
      </main>

      <Footer /> 
    </div>
  )
}

export default Dashboard
