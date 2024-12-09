import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api'
import director1 from '../assets/director1.jpg'
import director2 from '../assets/director2.jpg'
import director3 from '../assets/director3.jpg'

const ContactUs = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [message, setMessage] = useState(''); // To store success/error messages

  
    

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.username,
        email: currentUser.email,
        message: ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/contact/', { email: formData.email, message: formData.message });
      if (response.status === 200) {
        setMessage('Request has been sent!');
        setFormData({
          name: currentUser ? currentUser.username : '',
          email: currentUser ? currentUser.email : '',
          message: ''
        });
        navigate('dashboard/')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Subscription error:', error);
    }
};


  return (
    <div className='bg-customGreen min-h-screen flex flex-col'>
      <Header />
      <div>
        <h1 className='text-4xl text-white m-4 font-bold text-center mb-4'>Directors</h1>
        <p  className='text-xl text-white m-4 font-semibold text-center mb-4'>
  Our leadership team is composed of seasoned professionals who bring a wealth of experience and expertise to the venue rental industry. Each director plays a vital role in ensuring that our services not only meet but exceed client expectations. With a shared commitment to innovation, operational excellence, and customer satisfaction, they have collectively shaped our company into a market leader. Let us introduce you to the key individuals driving our success:
</p>
      </div>
        

      <section className='flex-1 bg-customLightGreen m-4 p-4 rounded-lg shadow-lg'>
        {[
          {
            person: 'John Doe',
            position: 'CEO',
            image: `${director1}`,
            description: 'John Doe is the visionary leader behind our company’s success in the venue rental industry. With over two decades of experience in business strategy, he has revolutionized the way we approach customer satisfaction and venue management. Under his leadership, the company has expanded its portfolio to include a diverse range of exclusive venues, setting new standards in the industry. John’s commitment to innovation and growth ensures that every event hosted at our venues exceeds expectations.'
          },
          {
            person: 'Jane Smith',
            position: 'CTO',
            image: `${director2}`,
            description: 'As the CTO, Jane Smith is the driving force behind our company’s technological advancements in venue management. With her extensive expertise in digital platforms and smart venue technology, she has streamlined the booking process, making it seamless for customers to reserve their ideal venues. Jane’s innovative approach to integrating cutting-edge solutions, such as AI-powered event planning tools, has positioned us as a leader in the venue rental market.'
          },
          {
            person: 'Mike Johnson',
            position: 'COO',
            image: `${director3}`,
            description: 'Mike Johnson brings a wealth of operational experience to the venue rental business. As the COO, he ensures that every aspect of our operations runs smoothly, from venue maintenance to event logistics. With his background in operations and logistics, Mike has optimized the efficiency of our venue rental services, guaranteeing a flawless experience for clients. His attention to detail and passion for customer satisfaction make him a crucial asset to our team.'
          }
          
        ].map((item, index) => (
          <div key={index} className='flex bg-customGreen m-2 p-4 rounded-lg shadow-md'>
            <div className='flex-shrink-0 w-1/4 mr-4'>
              <img src={item.image} alt="head-pic" className='w-full h-full bg-white rounded-lg object-cover' />
            </div>
            <div className='w-3/4'>
              <h1 className='text-white font-semibold mb-2 text-xl'>{item.title}</h1>
              <p className='text-white text-md font-semibold mb-2'>{item.description}</p>
              <p className='text-white text-md font-semibold mb-4'>{`${item.person} currently serves as the ${item.position} at our company.`}</p>
              <button className='bg-amber-700 p-2 rounded-xl text-white font-bold hover:bg-amber-600'>Learn More</button>
            </div>
          </div>
        ))}
      </section>

      <section className='bg-customLightGreen p-6 m-4 rounded-lg shadow-lg'>
        <h1 className='text-4xl text-black text-center mb-4'>Contact Us</h1>
        <p className='text-md font-semibold text-black text-center mb-6 capitalize'>For any inquiries</p>
        <form className='max-w-lg mx-auto' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-black text-xl font-semibold mb-2' htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              className='w-full border rounded-lg p-2'
              readOnly
            />
          </div>
          <div className='mb-4'>
            <label className='block text-black text-xl font-semibold mb-2' htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className='w-full border rounded-lg p-2'
              readOnly
            />
          </div>
          <div className='mb-4'>
            <label className='block text-black text-xl font-semibold mb-2' htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className='w-full border rounded-lg p-2'
              required
            ></textarea>
          </div>
          <div className='text-center'>
            <button type="submit" className='bg-black text-white p-3 rounded-xl font-bold hover:bg-green-700'>Send Message</button>
          </div>
        </form>
        {message && <p className="text-center font-bold text-md  text-black mt-4">{message}</p>} {/* Display success/error message */}
      </section>

      <Footer />
    </div>
  );
}

export default ContactUs;
