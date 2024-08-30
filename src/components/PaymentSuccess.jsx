import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import the icon from Font Awesome

const PaymentSuccess = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row text-center justify-content-center">
        <div className="col-md-8 col-lg-6">
          {/* Heading */}
          <h2 className="text-success mb-4">Success</h2>
          
          {/* Success Icon */}
          <FaCheckCircle className="text-success mb-4" style={{ fontSize: '4rem' }} />
          
          {/* Welcome Message */}
          {/* <h3 className="mb-3">Dear Faisal Khan</h3> */}
          
          {/* Success Message */}
        <p className="text-center text-gray-600">
          Thank you for your purchase! Your transaction has been successfully completed.
        </p>

          
          {/* Login Button */}
          <a href="/" className="btn btn-success">Home</a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
