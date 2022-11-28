import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    
    const booking = useLoaderData();
    const { product, price } = booking;
    // console.log(booking);
    
    return (
        <div>
            <h2 className='text-3xl my-4'>Payment for <span className='border-b-primary border-b-2'>{product}</span></h2>
            <p className='text-xl'>Please pay <strong>{price}</strong> for your order.</p>
            <div className='w-1/3 my-12'>
            <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;