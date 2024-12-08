import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Footer from './Footer'
import Header from './Header'
import api from '../../services/api'

const ProfileView = () => {
  const navigate = useNavigate()
  const {fetchCurrentUser, currentUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [bookingHistory, setBookingHistory] = useState([])
  const [error, setError] = useState(false)

  

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await api.get('booking-history/')
        console.log(response.data)
        setBookingHistory(response.data)
      } catch (error) {
        console.log("error fetching history details"
        )
        setError(true)
      }

    }
  
      const loadUser = async () =>  {
        await fetchCurrentUser()}
      setLoading(false)
    
      loadUser()
      fetchBookingHistory()
    
  }, [])

 
  if (loading) return <div>Loading...</div>
  

  if (!currentUser) return <div>Error: User not found...</div>

  return (
    <div className='min-h-screen bg-customGreen'>
      <Header />
      <div className='container mx-auto px-4 py-8 bg-customLightGreen m-4 p-4 rounded-lg shadow-lg'>
        <div className='flex justify-center p-2 m-4 '>
          
          {/* Profile Section */}
          <div className='bg-customLightGreen rounded-lg shadow-2xl p-6'>
            <h2 className='text-2xl font-bold mb-2 hover:text-amber-700'>Username: {currentUser.username}</h2>
            <h3 className='text-xl font-bold mb-4 hover:text-amber-700'>About Me</h3>
            
            <p className='text-md font-bold mb-2'>Email: {currentUser.email}</p>
            <p className='text-md font-bold mb-2'>Email: {currentUser.first_name}</p>
            <p className='text-md font-bold mb-2'>Email: {currentUser.last_name}</p>

            <p className='text-md font-bold mb-2'>Date Joined: {new Date(currentUser.date_joined).toLocaleDateString()}</p>
          </div>
        </div>
  
        {/* Booking History Section */}
        <div className='mt-8'>
          <h3 className='text-2xl font-bold mb-4 text-center'>Booking History</h3>
          {bookingHistory && bookingHistory.length > 0 ? (
            <table className="min-w-full bg-amber-500 border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className='bg-gray-200'>
                  <th className="py-2 px-4 border-b">Booking Date</th>
                  <th className="py-2 px-4 border-b">Booking Time</th>
                  <th className="py-2 px-4 border-b">Deposit Amount</th>
                  <th className="py-2 px-4 border-b">Event Type</th>
                  <th className="py-2 px-4 border-b">Number of Guests</th>
                  <th className="py-2 px-4 border-b">Payment Method</th>
                  <th className="py-2 px-4 border-b">Phone Number</th>
                  <th className="py-2 px-4 border-b">Special Requests</th>
                </tr>
              </thead>
              <tbody>
                {bookingHistory.map((booking) => (
                  <tr key={booking.id} className="text-center border-b hover:bg-gray-100">
                    <td className="py-2 px-4 font-bold">{new Date(booking.booking_date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 font-bold">{booking.booking_time}</td>
                    <td className="py-2 px-4 font-bold">{booking.deposit_amount}</td>
                    <td className="py-2 px-4 font-bold">{booking.event_type}</td>
                    <td className="py-2 px-4 font-bold">{booking.number_of_guests}</td>
                    <td className="py-2 px-4 font-bold">{booking.payment_method}</td>
                    <td className="py-2 px-4 font-bold">{booking.phone_number}</td>
                    <td className="py-2 px-4 font-bold">{booking.special_requests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center mt-4">No booking history found.</p>
          )}
        </div>
      </div>
  
      <footer>
        <Footer /> 
      </footer>
    </div>
  );
}  
export default ProfileView