import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
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

      <Modal show={show} onHide={handleClose} centered className="position-relative bottom-0 start-0">
        <Modal.Header closeButton>
          <Modal.Title>Pricing Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Choose a plan</p>
          <ul>
            <li>Standard: $10 per month for 50 prompts per month</li>
            <li>Premium: $99 per year for up to 250 prompts per month</li>
          </ul>
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
  );
}

export default App;
