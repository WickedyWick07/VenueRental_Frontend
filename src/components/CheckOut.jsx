import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Header from './Header';
import Footer from './Footer';
import PaymentForm from './PaymentForm';

const CheckOut = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const paymentDetails = location.state?.paymentDetails || {};
  const [booking, setBooking] = useState([]);
  const [payment, setPayment] = useState(paymentDetails);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch booking details
        const bookingResponse = await api.get(`api/booking-details/${bookingId}/`);
        setBooking(bookingResponse.data);

        console.log('payment details:', payment)

        // Fetch payment details only if not available in the state
       

        console.log(bookingResponse.data);
       
      } catch (error) {
        console.error('Error fetching details', error);
        setError('Error fetching details...');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchDetails();
    } else {
      setError('Invalid booking ID');
      setLoading(false);
    }
  }, []);

  if (isLoading) return (
    <div className='bg-customGreen flex items-center justify-center min-h-screen'>
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (!booking || !payment) {
    return <div>No data available</div>;
  }

  return (
    <div className='bg-customGreen min-h-screen'>
      <Header />
      <section className='bg-customLightGreen mx-20 m-4 p-2 rounded'>
        <h1 className='font-bold text-center text-3xl uppercase text-white m-2 p-2'>Booking Details</h1>
        <div>
          <div className='border-b-2 flex justify-center gap-2 items-baseline hover:translate-x-1 hover:bg-amber-700 hover:text-white border-b-amber-700 m-2 p-2 rounded-md '>
            <label className='text-md font-semibold' htmlFor="Date">Date</label>
            <p className='text-black text-xl lowercase first-letter:uppercase hover:text-white  font-semibold text-center'>{booking.booking_date}</p>
          </div>
          <div className='border-b-2 flex justify-center gap-2 items-baseline hover:bg-amber-700  hover:translate-x-1 hover:text-white border-b-amber-700 m-2 p-2 rounded-md '>
            <label className='text-md font-semibold' htmlFor="time">Time</label>
            <p className='text-black text-xl lowercase first-letter:uppercase hover:text-white  font-semibold text-center'>{booking.booking_time}</p>
          </div>
          <div className='border-b-2 flex justify-center gap-2 items-baseline hover:bg-amber-700  hover:translate-x-1 hover:text-white border-b-amber-700 m-2 p-2 rounded-md '>
            <label className='text-md font-semibold' htmlFor="event_type">Event Type</label>
            <p className='text-black text-xl lowercase first-letter:uppercase hover:text-white  font-semibold text-center'>{booking.event_type}</p>
        </div></
        div>
      </section>

      <section className='bg-customLightGreen m-4 p-2 rounded'>
        <h1 className='font-bold text-center text-3xl uppercase text-white m-2 p-2'>Payment Details</h1>
        <div>
          <div className='border-b-2 flex justify-center gap-2 items-baseline hover:bg-amber-700  hover:translate-x-1 hover:text-white border-b-amber-700 m-2 p-2 rounded-md '>
            <label className='text-md font-semibold' htmlFor="status">Status</label>
            <p className='text-black text-xl lowercase first-letter:uppercase hover:text-white  font-semibold text-center'>{payment.payment_status}</p>
          </div>
          <div className='border-b-2 flex justify-center gap-2 items-baseline hover:bg-amber-700  hover:translate-x-1 hover:text-white border-b-amber-700 m-2 p-2 rounded-md '>
            <label className='text-md font-semibold' htmlFor="payment_method">Payment Method</label>
            <p className='text-black text-xl lowercase first-letter:uppercase hover:text-white  font-semibold text-center'>{payment.payment_method}</p>
          </div>
          
          <div className='border-b-2 flex justify-center gap-2 items-baseline hover:bg-amber-700  hover:translate-x-1 hover:text-white border-b-amber-700 m-2 p-2 rounded-md '>
            <label className='text-md font-semibold' htmlFor="card_number">Card Number</label>
            <p className='text-black text-xl lowercase first-letter:uppercase hover:text-white  font-semibold text-center'>{payment.card_number}</p>
          </div>
          <div className='border-b-2 flex justify-center gap-2 items-baseline hover:bg-amber-700  hover:translate-x-2 hover:text-white border-b-amber-700 m-2 p-2 rounded-md '>
            <label className='text-md font-semibold' htmlFor="Deposit">Deposit</label>
            <p className='text-black text-xl lowercase first-letter:uppercase hover:text-white  font-semibold text-center'>R{payment.deposit_amount}</p>
        </div></
        div>
      </section>

      <div className='flex justify-center'>
        <button onClick={() => navigate('/')} className='border m-2 p-2 rounded text-black font-semibold hover:bg-white  text-2xl bg-amber-700'>Checkout</button>
      </div>

      <Footer />
    </div>
  );
};

export default CheckOut;
