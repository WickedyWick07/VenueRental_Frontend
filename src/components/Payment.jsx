import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import api from '../../services/api'
import PaymentForm from './PaymentForm'

const Payment = () => {
    const location = useLocation();
    const { venue } = location.state || {};
    const {bookingId} = useParams()
    const [booking, setBooking] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchBooking = async () => {
        try {
          const response = await api.get(`api/booking-details/${bookingId}/`)
          setBooking(response.data)
        } catch (error) {
          console.error('Error fetching booking', error)
          setError('Error fetching booking details...');
        } finally {
          setLoading(false)
        }
      }

      if(bookingId){
        fetchBooking()
      } else {
        setError('Invalid booking ID')
        setLoading(false)
      }
    
  
    }, [bookingId])

    if(loading){
      return <div>Loading...</div>
    }

    if(error){
      return <div>{error}</div>
    }

    
    if(!venue){
        return <div>No venue data</div>
    }



    if(!booking){
      return <div>No Booking Data Available</div>
    }
  return (
    <div className='bg-customGreen min-h-screen '>
      <Header />
      <section className='bg-customLightGreen m-4 p-2'>
        <h1  className='font-bold text-center text-3xl uppercase text-white m-2 p-2'>Booking Details</h1>
        <div>
          <div className=' m-2 p-2 border-b border-b-yellow-800 rounded-s-md text-xl '>
            <p className='text-black font-semibold text-center'>{venue.venue_name}</p>
          </div>
          
          <div className=' m-2 p-2 border-b border-b-yellow-800 rounded-s-md text-xl '>
            <p className='text-black font-semibold text-center'>{booking.booking_date}</p>    
          </div>
          
          <div className=' m-2 p-2 border-b border-b-yellow-800 rounded-s-md text-xl '>
            <p className='text-black font-semibold text-center'>{booking.booking_time}</p>    
          </div>
          
          <div className=' m-2 p-2 border-b border-b-yellow-800 rounded-s-md text-xl '>
            <p className='text-black font-semibold text-center'>{booking.event_type}</p>    
          </div>
          
          <div className=' m-2 p-2 border-b border-b-yellow-800 rounded-s-md text-xl '>
            <p className='text-black font-semibold text-center'>{booking.number_of_guests}</p>    
          </div>
          
          <div className=' m-2 p-2 border-b border-b-yellow-800 rounded-s-md text-xl '>
            <p className='text-black font-semibold text-center'>{booking.deposit_amount}</p>    
          </div>
          
          <div className=' m-2 p-2 border-b border-b-yellow-800 rounded-s-md text-xl '>
            <p className='text-black font-semibold text-center'>{booking.payment_method}</p>    
          </div>
          
          <div className=' m-2 p-2 border-b border-b-yellow-800 rounded-s-md text-xl '>
            <p className='text-black font-semibold text-center'>{booking.phone_number}</p>    
          </div>
          
          <div className=' m-2 p-2 border-b border-b-yellow-800 rounded-s-md text-xl '>
            <p className='text-black font-semibold text-center'>{booking.special_requests}</p>    
          </div>
          
        </div>        
      </section>

      <section className='bg-customLightGreen m-4 p-2'>
        <h1 className='font-bold text-center text-3xl uppercase text-white m-2 p-2'>Payment</h1>
        <div className='bg-customLightGreen grid grid-cols-2'>
          <div className='bg-customGreen flex flex-col border m-2 p-2 rounded-md w-25'>
            <h1 className='text-white font-semibold'>Standard Deposit</h1>
            <p className='text-amber-200 text-sm font-semibold'>R 500</p>
            <ul className='text-sm font-semibold m-2 p-1 text-white'>
              <li>Standard access to all facilities</li>
              <li>Basic event planning assistance</li>
              <li>Standard catering options</li>
              <li>Complimentary parking for guests</li>
              <li>Basic decoration package</li>
            </ul>
            
          </div>
          <div className='bg-customGreen flex flex-col border m-2 p-2 rounded-md w-25'>
            <h1 className='text-white font-semibold'>Premium Deposit</h1>
            <p className='text-amber-200 text-sm font-semibold'>R 800</p>
            <ul className='text-sm font-semibold m-2 p-1 text-white'>
              <li>Priority access to facilities</li>
              <li>Advanced event planning services</li>
              <li>Premium catering options</li>
              <li>Reserved parking for VIPs</li>
              <li>Enhanced decoration package</li>
            </ul>
            
          </div>
          <div className='bg-customGreen flex flex-col border m-2 p-2 rounded-md w-25'>
            <h1 className='text-white font-semibold'>Luxury Deposit</h1>
            <p className='text-amber-200 text-sm font-semibold'>R 1000</p>
            <ul className='text-sm font-semibold m-2 p-1 text-white'>
              <li>Exclusive access to VIP areas</li>
              <li>Dedicated event planner</li>
              <li>Gourmet catering services</li>
              <li>Valet parking service</li>
              <li>Luxury decoration package</li>
            </ul>
            
          </div>
          <div className='bg-customGreen flex flex-col border m-2 p-2 rounded-md w-25'>
            <h1 className='text-white font-semibold'>Ultimate Deposit</h1>
            <p className='text-amber-200 text-sm font-semibold'>R 1200</p>
            <ul className='text-sm font-semibold m-2 p-1 text-white'>
              <li>All-inclusive access to all amenities</li>
              <li>24/7 event management support</li>
              <li>Customized gourmet catering</li>
              <li>Personalized valet and security</li>
              <li>Exclusive, bespoke decoration</li>
            </ul>
            
          </div>
        </div>
      </section>

      <div className='m-4 p-4'>
      <PaymentForm
          userId={booking.user_id} // Assuming user_id is part of the booking data
          bookingId={bookingId}
          
          booking={booking}
          eventType={booking.event_type}
          depositAmount={booking.deposit_amount}
          paymentMethod={booking.payment_method}
        />
      </div>
      <Footer /> 
    </div>
  )
}

export default Payment
