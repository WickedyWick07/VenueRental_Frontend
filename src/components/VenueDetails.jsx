import React, {useEffect, useState, useContext} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import video7 from '../assets/video7.mp4'

const DEPOSIT_AMOUNTS = [
      {value: 500, label: '500'},
      {value: 800, label: '800'},
      {value: 1000, label: '1000'},
      {value: 1200, label: '1200'},

    ]

    const eventTypeOptions = [
  { value: 'WEDDING', label: 'Wedding' },
  { value: 'CONFERENCE', label: 'Conference' },
  { value: 'PARTY', label: 'Party' },
  { value: 'VACATION', label: 'Vacation' },
  { value: 'CONVENTION', label: 'Convention' },
];

const paymentMethodOptions = [
  { value: 'CREDIT CARD', label: 'Credit Card' },
  { value: 'BANK TRANSFER', label: 'Bank Transfer' },
  { value: 'PAYPAL', label: 'PayPal' },
];

const VenueDetails = () => {
    const { venueId } = useParams();
    const [venue, setVenue] = useState(null);
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false);

    const [isImageMenuOpen, setIsImageMenuOpen] = useState(false)
    const {currentUser, fetchCurrentUser, refreshToken, token}= useContext(AuthContext)
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const[formData, setFormData] = useState({
        phone_number: '',
        event_type: eventTypeOptions[0].value,
        booking_date: '',
        booking_time: '',
        number_of_guests: '',
        special_requests: '',
        payment_method: paymentMethodOptions[0].value,
        deposit_amount:DEPOSIT_AMOUNTS[0].value,
        venue: venueId,
    })
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!venueId) {
        setError("No venue ID provided");
        return;
      }
  
      const fetchVenueDetails = async () => {
        try {
          const response = await api.get(`api/venue-detail/${venueId}/`);
          console.log(response.data)
          setVenue(response.data);
        } catch (error) {
          console.error('Error fetching venue details:', error);
          setError("Failed to fetch venue details");
        }
      };
        fetchCurrentUser()
        fetchVenueDetails();

      
    }, []);
  
    if (error) return <div className='bg-customGreen flex items-center justify-center min-h-screen text-3xl font-semibold'>Error: {error}</div>;
    if (!venue) return <div className='bg-customGreen flex items-center justify-center min-h-screen'>
    <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
  </div>;
    
    
   
    console.log('Venue:', venue);
    console.log('Images:', venue?.images);
    console.log('Latitude:', venue.latitude)
    console.log('Longitude:', venue.longitude)

  
    const openBookingForm = () => {
        setIsBookingOpen(true)
    }

    const handleCloseForm = () => {
      setIsBookingOpen(false)
    }

    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData(prevData => ({
        ...prevData, [name]: value
      }))
    }


  const handleSubmit = async (e) => {
      e.preventDefault();

      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(formData.phone_number)) {
          alert("Please enter a valid phone number");
          return;
      }

       console.log('Form data being submitted:', formData); 

       if(!token){
        console.log('No token set')
        await refreshToken()
      }
      try {
       
        const response = await api.post('api/book-venue/', {
          ...formData,
          user: currentUser.username,
          
        });
        console.log('Booking successful:', response.data);
        const bookingId = response.data.id;
        console.log(bookingId)
        handleCloseForm();
        navigate(`/payments/${bookingId}/`, {state:{venue: response.data}});
      } catch (error) {
        console.error('Error booking venue:', error);
      }
    };

  const apiUrl = import.meta.env.NETLIFY_URL || 'https://venueimages.netlify.app';
  console.log('API URL:', apiUrl);

  console.log('Venue images:', venue.images);
  console.log('All env variables:', import.meta.env);
 
  const images = venue.images 
  const getImageUrl = (image) => {
    if (image.startsWith('/static/venues/')) {
      // Remove '/static' prefix and prepend Netlify URL
      return `${apiUrl}${image.replace('/static', '')}`;
    } else if (image.startsWith('/venues/')) {
      // Directly prepend Netlify URL for paths starting with '/venues/'
      return `${apiUrl}${image}`;
    } else if (image.startsWith('http')) {
      // Use full URL directly
      return image;
    } else {
      // Handle other cases or fallback
      return `${apiUrl}${image}`;
    }
  };
  

  const handleViewLocation = ( lat, lng) => {
    lng = venue.longitude
    lat = venue.latitude
   
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
 
  }

 
  return (
    <div className='bg-customGreen min-h-screen flex flex-col'>
    <Header /> 
    <div className='relative bg-customLightGreen w-10/12 h-30 mx-auto rounded overflow-hidden'>
  <video
    src={video7}
    autoPlay
    loop
    muted
    className='absolute opacity-2 inset-0 w-full h-full object-cover'
  />
  <div className='relative flex flex-col z-10'>
    <h1 className='text-amber-700 font-bold text-center m-4 p-4 text-4xl capitalize'>{venue.venue_name}</h1>
    <p className='text-center mb-4 capitalize text-xl text-amber-700 font-bold '>{venue.venue_address}, {venue.venue_country}</p>
    <div className='mx-auto'>
      <button onClick={handleViewLocation} className='bg-white border m-4 rounded p-2 font-semibold'>View Location on Map</button>
      <button onClick={openBookingForm} className='bg-black text-white border-black  hover:bg-amber-700 hover:text-white m-4 rounded p-2 font-semibold'>Book Location</button>
    </div>
  </div>
</div>

    
    <div className='flex justify-center flex-col m-4 p-4'>
      <button className='bg-customLightGreen text-2xl font-bold hover:bg-amber-700 hover:text-white rounded text-black m-4 p-2' onClick={() => setIsImageMenuOpen(!isImageMenuOpen)}>
       { isImageMenuOpen ? 'Hide Venue Images' : "View Venue Images"}
      </button>
      
      {isImageMenuOpen && (
        <div className='bg-customLightGreen m-4 p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {venue.images && venue.images.length > 0 && venue.images.map((image, index) => (
          <div className='relative overflow-hidden rounded-lg shadow-lg bg-white'>
            <img
              className='w-full h-64 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105'
              key={index}
              src={getImageUrl(image)}
              alt={`Image ${index + 1} of ${venue.venue_name}`}
              onError={(e) => {
                console.error(`Error loading image: ${image}`);
                console.log('Full URL:', `${apiUrl}${image}`);
                e.target.src = '/path/to/placeholder-image.jpg'; // Use a placeholder image if the original fails to load
              }}
            />
            <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2 text-white text-sm font-semibold'>
              Image {index + 1}
            </div>
          </div>
        ))}
      </div>
      
      )}
    </div>
      

    

    <div className='bg-customLightGreen m-8 px-10 py-6 rounded-lg shadow-lg'>
  <h1 className='text-center text-2xl text-black font-semibold mb-4 underline'>Venue Comes With</h1>
  <ul className='list-none pl-6'>
    <li className='flex items-start mb-4'>
      <i className='fas fa-bed text-black text-xl mr-3'></i>
      <div>
        <h2 className='text-black text-xl font-semibold'>Bedrooms</h2>
        <p className='text-gray-700'>{venue.venue_bedrooms}</p>
      </div>
    </li>

    <li className='flex items-start mb-4'>
      <i className='fas fa-bath text-black text-xl mr-3'></i>
      <div>
        <h2 className='text-black text-xl font-semibold'>Bathrooms</h2>
        <p className='text-gray-700'>{venue.venue_bathrooms}</p>
      </div>
    </li>

    <li className='flex items-start mb-4'>
      <i className='fas fa-cogs text-black text-xl mr-3'></i>
      <div>
        <h2 className='text-black text-xl font-semibold'>Amenities</h2>
        <p className='text-gray-700 text-sm font-semibold'>{venue.venue_amenities}</p>
      </div>
    </li>

    <li className='flex items-start mb-4'>
      <i className='fas fa-info-circle text-black text-xl mr-3'></i>
      <div>
      <h2 className="text-black text-xl font-semibold">Description</h2>
      <p className="text-gray-700 text-sm font-semibold">
        {expanded ? venue.description : venue.description.substring(0, 150)}
        {venue.description.length > 150 && (
          <span 
            className="text-blue-500 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? ' show less' : '...read more'}
          </span>
        )}
      </p>
    </div>
    </li>

    <li className='flex items-start mb-4'>
      <i className='fas fa-tag text-black text-xl mr-3'></i>
      <div>
        <h2 className='text-black text-xl font-semibold'>Price</h2>
        <p className='text-gray-700 text-sm font-semibold'>R {venue.venue_price}</p>
      </div>
    </li>

    <li className='flex items-start mb-4'>
      <i className='fas fa-calendar-check text-black text-xl mr-3'></i>
      <div>
        <h2 className='text-black text-xl font-semibold'>Available</h2>
        <p className='text-gray-700 text-sm font-semibold'>{venue.available ? "Yes" : "No"}</p>
      </div>
    </li>
  </ul>
</div>



{ isBookingOpen && (
  <section className='w-full sm:w-10/12 md:w-10/12 lg:w-9/12 mx-auto p-4 sm:p-6 bg-customLightGreen mx-32  m-4 p-6 shadow-lg rounded-lg'>
    <h2 className='text-center text-3xl font-semibold text-black mb-6'>Booking Form</h2>
    <form 
      onSubmit={handleSubmit} 
      className='bg-customLightGreen rounded-lg shadow-customLightGreen p-4 sm:p-6 w-full sm:max-w-3xl'
    >
      <div className='flex flex-col mb-4'>
        <label className='text-black uppercase text-base sm:text-lg font-semibold mb-2'>Email Address</label>
        <input 
          type="email" 
          readOnly 
          placeholder='Enter your email address' 
          value={currentUser.email} 
          className='rounded-md border border-gray-300 p-2 text-gray-700 w-full' 
          required 
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
        <div className='flex flex-col'>
          <label className='text-black uppercase text-base sm:text-lg font-semibold mb-2'>Phone Number</label>
          <input 
            onChange={handleChange} 
            value={formData.phone_number} 
            type="tel" 
            placeholder='Enter your phone number' 
            name='phone_number' 
            className='rounded-md border border-gray-300 p-2 text-gray-700 w-full' 
            required 
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-black uppercase text-base sm:text-lg font-semibold mb-2'>Event Type</label>
          <select 
            name="event_type" 
            value={formData.event_type} 
            onChange={handleChange} 
            className='rounded-md border border-gray-300 p-2 text-gray-700 w-full'
          >
            {eventTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
        <div className='flex flex-col'>
          <label className='text-black uppercase text-base sm:text-lg font-semibold mb-2'>Booking Date</label>
          <input 
            onChange={handleChange} 
            value={formData.booking_date} 
            type="date" 
            className='rounded-md border border-gray-300 p-2 text-gray-700 w-full' 
            name='booking_date' 
            required 
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-black uppercase text-base sm:text-lg font-semibold mb-2'>Booking Time</label>
          <input 
            onChange={handleChange} 
            value={formData.booking_time} 
            type="time" 
            className='rounded-md border border-gray-300 p-2 text-gray-700 w-full' 
            name='booking_time' 
            required 
          />
        </div>
      </div>

      <div className='flex flex-col mb-4'>
        <label className='text-black uppercase text-base sm:text-lg font-semibold mb-2'>Number of Guests</label>
        <input 
          onChange={handleChange} 
          value={formData.number_of_guests} 
          type="number" 
          placeholder='Enter number of guests' 
          name='number_of_guests' 
          className='rounded-md border border-gray-300 p-2 text-gray-700 w-full' 
          required 
        />
      </div>

      <div className='flex flex-col mb-4'>
        <label className='text-black uppercase text-base sm:text-lg font-semibold mb-2'>Special Requests</label>
        <textarea 
          onChange={handleChange} 
          value={formData.special_requests} 
          placeholder='Any special requests' 
          name='special_requests' 
          className='rounded-md border border-gray-300 p-2 text-gray-700 w-full min-h-[100px]' 
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
        <div className='flex flex-col'>
          <label className='text-black uppercase text-base sm:text-lg font-semibold mb-2'>Payment Method</label>
          <select 
            name="payment_method" 
            value={formData.payment_method} 
            onChange={handleChange} 
            className='rounded-md border border-gray-300 p-2 text-gray-700 w-full'
          >
            {paymentMethodOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <label className='text-black uppercase text-base sm:text-lg font-semibold mb-2'>Deposit Amount</label>
          <select 
            name='deposit_amount' 
            value={formData.deposit_amount} 
            onChange={handleChange} 
            className='rounded-md border border-gray-300 p-2 text-gray-700 w-full'
          >
            <option value="">Select Deposit Amount</option>
            {DEPOSIT_AMOUNTS.map(amount => (
              <option key={amount.value} value={amount.value}>{amount.value}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex items-center mb-4'>
        <input 
          type="checkbox" 
          className='mr-2' 
          required 
        />
        <label className='text-black text-base sm:text-lg font-semibold'>I accept the terms and conditions</label>
      </div>

      <div className='flex flex-col sm:flex-row justify-between gap-4'>
        <button 
          type='submit' 
          className='bg-black text-white rounded-md p-2 font-semibold w-full sm:w-auto mb-2 sm:mb-0'
          onClick={handleSubmit}
        >
          Submit Booking
        </button>
        <button 
          onClick={handleCloseForm} 
          type='button' 
          className='bg-gray-200 text-black rounded-md p-2 font-semibold w-full sm:w-auto'
        >
          Close Booking Form
        </button>
      </div>
    </form>
  </section>
)}

    <Footer /> 

  </div>
  )
}

export default VenueDetails
