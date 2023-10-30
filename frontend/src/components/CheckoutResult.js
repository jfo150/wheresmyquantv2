// src/components/CheckoutResult.js

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './CheckoutResult.css'; 

function CheckoutResult() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentStatus, setPaymentStatus] = useState('checking'); // 'checking', 'succeeded', 'failed'

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payments/session-status?session_id=${sessionId}`);
        const status = response.data.status;

        if (status === 'succeeded') {
          setPaymentStatus('succeeded');
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setPaymentStatus('failed');
      }
    };

    if (sessionId) {
      checkPaymentStatus();
    }
  }, [sessionId]);

  const renderContent = () => {
    switch (paymentStatus) {
      case 'checking':
        return <p>Checking payment status...</p>;
      case 'succeeded':
        return (
          <div className="checkout-result-container">
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase. Enjoy the premium bot</p>
            <div className="chatbot-container">
              <h2>Here's your quant!!</h2>
              <div className="chat-display">
                {/* Chat messages will be displayed here */}
              </div>
              <form>
                <input type="text" placeholder="Type your message..." />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        );
      case 'failed':
      default:
        return (
          <div>
            <h2>Payment Failed.</h2>
            <p>There was an issue processing your payment. Please try again.</p>
          </div>
        );
    }
  };

  return <div>{renderContent()}</div>;
}

export default CheckoutResult;
