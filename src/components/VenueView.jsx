import React,{useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import AuthContext from '../../context/AuthContext'
import { events, cities } from './constants/constants'
import outsidePhoto from '../assets/venue_1/outside photo.jpg';
import outsidePhoto2 from '../assets/venue_2/hotel outside 2.jpg';
import outsidePhoto3 from '../assets/venue_3/hotel outside 3.jpg';
import outsidePhoto4 from '../assets/venue_4/hotel outside 4.jpg';
import outsidePhoto5 from '../assets/venue_5/hotel outside 5.jpg';
import Header from './Header'
import Footer from './Footer'

const images = [outsidePhoto, outsidePhoto2, outsidePhoto3, outsidePhoto4, outsidePhoto5];






const VenueView = () => {
  const navigate = useNavigate()
  const [venues, setVenue] = useState([])
  const {fetchCurrentUser} = useContext(AuthContext)

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await api.get('api/venue-view/');
        console.log(response.data);
        setVenue(response.data);
      } catch (error) {
        console.error('Error fetching venues', error);
      } 
    };
    
    fetchVenues();
    fetchCurrentUser()
    
  }, []); // Correct placement of the dependencies array
 

  const handleVenueSelection = (venueId) => {
    console.log("Venue ID:", venueId); 
    if (venueId === undefined) {
      console.error("Venue ID is undefined");
      return;  // Don't navigate if ID is undefined
    }
    navigate(`/venue-details/${venueId}`);
  }


  return (
    <div>

    
    <div className='min-h-screen flex flex-col bg-customGreen '>

      <Header/>

      <div className='py-4'>
        {venues.length > 0 ? (
          <ul className='flex flex-col'>
            {venues.map((venue, index) => (
              <li key={venue.id} className='border m-4 p-4 rounded flex'>
                <div className="w-1/4 flex-shrink-0 mr-4">
                  <img src={images[index % images.length]} alt={`venue ${index}`} className="w-full h-auto rounded" />
                </div>
                <div className="w-3/4">
                  <h2 className='text-white text-3xl font-semibold text-justify py-4'>{venue.venue_name}</h2>
                  <p className='text-white py-2'>Address: {venue.venue_address}</p>
                  <p className='text-white py-2'>Country: {venue.venue_country}</p>
                  <button className='bg-amber-700 p-4 rounded-xl text-white font-bold' onClick={() => handleVenueSelection(venue.id)}>View Venue Details</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
              <div className='bg-customGreen flex items-center justify-center min-h-screen'>
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                </div>       
              )}
      </div>
      </div>

      <footer>
        <Footer />
      </footer>

     
     
   </div>
  )
}

export default VenueView