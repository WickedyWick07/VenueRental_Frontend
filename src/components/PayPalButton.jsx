import React, { useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import api from '../../services/api';

const PayPalButton = () => {
    const [clientId, setClientId] = useState('');
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchConfig() {
            try {
                const response = await api.get('paypal-config/');
                setClientId(response.data.client_id);
                setLoaded(true);
            } catch (err) {
                setError('Failed to fetch PayPal configuration');
                console.error(err);
            }
        }

        fetchConfig();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!loaded) {
        return <div>Loading PayPal...</div>;
    }

    return (
        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: "10.00", // Change this value based on the actual amount
                        },
                    }],
                });
            }}
            onApprove={async (data, actions) => {
                try {
                    await actions.order.capture();
                    // Handle successful payment here, e.g., update the backend or show a success message
                    console.log('Payment successful:', data);
                    alert('Payment successful!');
                } catch (error) {
                    // Handle errors, e.g., show an error message
                    console.error('Payment error:', error);
                    alert('Payment failed. Please try again.');
                }
            }}
            onError={(error) => {
                console.error('PayPal error:', error);
                alert('An error occurred with PayPal. Please try again.');
            }}
        />
    );
};

export default PayPalButton;
