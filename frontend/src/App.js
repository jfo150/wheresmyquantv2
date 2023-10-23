import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import CheckoutResult from './components/CheckoutResult';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    // Add the Stripe script on component mount
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // Cleanup the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <div className="app-container-lg d-flex flex-column vh-100 justify-content-center align-items-center">

            <div className="chat-widget bg-light rounded p-4">
              <div className="title-section text-center mb-4">
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

              <div className="container mt-5">
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <Button className="btn btn-primary" onClick={handleShow}>
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Upgrade to Premium</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>$9.99 per month for 100 prompts per month & PDF uploads</p>
                
                {/* Stripe Buy Button */}
                <stripe-buy-button
                  buy-button-id="buy_btn_1O4RhkD9tqxUSh43nHPht0pm"
                  publishable-key="pk_live_51O330pD9tqxUSh43XDzi8gJY2jbIKkXv4gtr7nqVVNzdLLeX9mqDCBfsOHVuO9JtRB9EK1B2ZH0w7wOdKuJWsKn700nULj4Nr0"
                ></stripe-buy-button>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary">
                  Upgrade Now
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          }/>   
         
        <Route path="/checkout-result" component={CheckoutResult} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/cancel" component={CancelPage} />
      </Routes>
    </Router>
  );
}

export default App;
