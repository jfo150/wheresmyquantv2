import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('sk_test_4eC39HqLyjWDarjtT1zdp7dcY');


function App() {
  return (
    <div className="app-container d-flex justify-content-center align-items">
      <div className="chat-widget bg-light rounded p-4">
        <div className="title-section text-center mb-3">
          <h1>Wheres My QUAAANT!!</h1>
          <p className="subtitle"><em>My quantitative. My math specialist. Look at him.</em></p>
        </div>
        <div className="pricing-section text-center mb-3">
          <p><strong>5 prompts for free!</strong></p>
          <p><strong>Then, $10/month</strong> for up to 50 prompts.</p>
          <p className="additional-text">This is the quant bot, trained specifically to help decipher company financials quickly. Includes all Quartlery Earnings for all S&P500 companies starting Q3 2023.</p>
        </div>
      
        <div className="chat-callout d-flex align-items-center justify-content-center">
          <p className="mr-2">Try for free!</p>
          <i className="bi bi-arrow-down-right"></i>
        </div>
        {/* Chat widget will be loaded here */}
      
  
    <div className="container mt-5">
    <div className="d-flex justify-content-center align-items-center mt-4">
      <button className="btn btn-primary" onClick={handlePaymentClick}>Upgrade to Premium</button>
    </div>
  </div>
  </div>
  </div>
  );

  async function handlePaymentClick() {
    try {
      // Step 1: Create a checkout session on the backend
      const response = await axios.post('http://localhost:3000/create-checkout-session');

      // Extract client secret from the response
      const { clientSecret } = response.data;

      // Step 2: Use the client secret to initiate the Stripe checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: clientSecret });
      
      // If there's an error during redirection (e.g., popup blocked), handle it
      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  }

}


export default App;
