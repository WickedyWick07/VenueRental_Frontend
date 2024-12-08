import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'


const PaymentForm = ({ userId, bookingId, booking, depositAmount, paymentMethod, eventType }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)

    const formatExpiryDate = (date) => {
        // Remove non-digit characters
        const cleanedDate = date.replace(/\D/g, '');
        
        // Format as MM/YY
        if (cleanedDate.length <= 2) {
          return cleanedDate; // Return as is if only month is provided
        } else {
          return `${cleanedDate.slice(0, 2)}/${cleanedDate.slice(2, 4)}`;
        }
      };

    const formatCardNumber = (number) => {
        return number
          .replace(/\s+/g, '') // Remove any existing spaces
          .replace(/(\d{4})(?=\d)/g, '$1 '); // Add space every 4 digits
      };
  
    const validateCardNumber = (number) => {
      const sanitizedNumber = number.replace(/\s+/g, '');
      const regex = /^\d{13,19}$/;
      return regex.test(sanitizedNumber);
    };
  
    const validateExpiryDate = (expiryDate) => {
      // Remove any non-digit characters
      const cleanedDate = expiryDate.replace(/\D/g, '');
    
      // Check for MMYY format
      const regex = /^(0[1-9]|1[0-2])\d{2}$/;
      if (!regex.test(cleanedDate)) {
        return false;
      }
    
      // Extract month and year
      const [month, year] = cleanedDate.match(/.{1,2}/g);
      const expiry = new Date(`20${year}`, month - 1);
      const now = new Date();
    
      return expiry > now;
    };
    
  
      const validateCVV = (cvv) => {
        const regex = /^\d{3,4}$/;
        return regex.test(cvv);
      };
      
  
    const handleCardNumberChange = (e) => {
      const formattedNumber = formatCardNumber(e.target.value);
      setCardNumber(formattedNumber);
    };

    const handleExpiryDateChange = (e) => {
        const formattedDate = formatExpiryDate(e.target.value);
        setExpiryDate(formattedDate);
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
        const rawCardNumber = cardNumber.replace(/\s+/g, ''); // Remove spaces
        const rawExpiryDate = expiryDate.replace(/\D/g, ''); // Remove slashes
      const newErrors = {};
      if (!validateCardNumber(rawCardNumber)) newErrors.cardNumber = 'Invalid card number';
      if (!validateExpiryDate(rawExpiryDate)) newErrors.expiryDate = 'Invalid expiry date';
      if (!validateCVV(cvv)) newErrors.cvv = 'Invalid CVV';
      if (name.length < 2) newErrors.name = 'Name is too short';
     
      if (!eventType) newErrors.eventType = 'Event type is required';
      if (!depositAmount) newErrors.depositAmount = 'Deposit amount is required';
  
      if (Object.keys(newErrors).length === 0) {

        const paymentData = {
          user_id: currentUser.id,
          booking_id: bookingId,
          payment_status: 'Pending',
          payment_method: paymentMethod,
          event_type: eventType,
          deposit_amount: depositAmount,
          card_number: rawCardNumber,
          cvv: cvv,
          expiry_date: rawExpiryDate
        };
        console.log('Sending payment data:', paymentData);
        try {
          const response = await api.post('payment-confirmation/', paymentData );
          console.log(response.data)
  
          if (response.data.status === 'success') {
            console.log('Payment successful');
            const paymentDetails = paymentData
            console.log(paymentDetails)
            navigate(`/checkout/${bookingId}`, {
              state: { paymentDetails: paymentDetails },
          } )
          }
        } catch (error) {
          console.error('Payment error:', error.response?.data?.error || 'An error occurred');
          setErrors({ submit: error.response?.data?.error || 'An error occurred' });
        }
      } else {
        setErrors(newErrors);
      }
    };
  
    return (
      <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
          </div>
  
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              maxLength="5"
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            {errors.expiryDate && <p className="mt-1 text-xs text-red-500">{errors.expiryDate}</p>}
          </div>
  
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              maxLength="3"
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
          </div>
  
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
  
          
  
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <input
              type="text"
              id="eventType"
              value={eventType}
              
              placeholder="Wedding, Birthday, etc."
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            {errors.eventType && <p className="mt-1 text-xs text-red-500">{errors.eventType}</p>}
          </div>
  
          <div>
            <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Deposit Amount
            </label>
            <input
              type="number"
              id="depositAmount"
              value={depositAmount}
              readOnly
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            {errors.depositAmount && <p className="mt-1 text-xs text-red-500">{errors.depositAmount}</p>}
          </div>
  
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Pay Now
          </button>
  
          {errors.submit && <p className="mt-1 text-xs text-red-500">{errors.submit}</p>}
        </form>
      </div>
 
  );
};

export default PaymentForm;
