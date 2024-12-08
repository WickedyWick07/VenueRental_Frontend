import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProfileView from './components/ProfileView'
import ContactUs from './components/ContactUs'
import Home from './components/Home'
import About from './components/About'
import VenueView from './components/VenueView'
import VenueDetails from './components/VenueDetails'
import Payment from './components/Payment'
import CheckOut from './components/CheckOut'

const App = () => {
  return (
   
      <Router>
        <AuthProvider>
        <Routes>
        <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} /> 
          <Route path='/' element={<Home />} /> 
          <Route path='/dashboard' element={<Dashboard />} /> 
          <Route path='/about-us' element={<About />} /> 
          <Route path='/profile-view' element={<ProfileView />} /> 
          <Route path='/venue-view' element={<VenueView />} /> 
          <Route path='/venue-details/:venueId' element={<VenueDetails />} /> 
          <Route path='/contact-us' element={<ContactUs />} /> 
          <Route path='/payments/:bookingId' element={<Payment />} /> 
          <Route path='/checkout/:bookingId' element={<CheckOut />} />

        </Routes>
        </AuthProvider>
      </Router>
    
  )
}

export default App
