// src/components/CheckoutResult.js

import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CheckoutResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payments/session-status?session_id=${sessionId}`);
        const status = response.data.status;

        if (status === 'succeeded') {
          navigate('/success');
        } else {
          navigate('/cancel');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        navigate('/cancel');
      }
    };

    if (sessionId) {
      checkPaymentStatus();
    }
  }, [navigate, sessionId]);

  return (
    <div>
      <p>Checking payment status...</p>
    </div>
  );
}

export default CheckoutResult;
