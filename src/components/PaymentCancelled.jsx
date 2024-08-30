import React from 'react';
import { FaTimesCircle } from 'react-icons/fa'; // Import the cancel icon from Font Awesome

const PaymentCancelled = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row text-center justify-content-center">
        <div className="col-md-8 col-lg-6">
          {/* Heading */}
          <h2 className="text-danger mb-4">Payment Cancelled</h2>
          
          {/* Cancel Icon */}
          <FaTimesCircle className="text-danger mb-4" style={{ fontSize: '4rem' }} />
          
          {/* Cancellation Message */}
          <p className="text-center text-muted" style={{ fontSize: '1.25rem' }}>
            Your payment has been cancelled. If you believe this is a mistake, please try again or contact support for assistance.
          </p>
          
          {/* Home Button */}
          <a href="/" className="btn btn-danger">Home</a>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
