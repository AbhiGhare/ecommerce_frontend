import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import the icon from Font Awesome
import { useParams, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch session details from your backend
    if(sessionId){
      const fetchSession = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/payments/stripe/retrieve-checkout-session/${sessionId}`);
          console.log(response,'response');
          setSessionData(response.data);
        } catch (err) {
          setError('Failed to fetch session details.');
        } finally {
          setLoading(false);
        }
      };
      fetchSession();
    }
  }, []);

  const deleteAllCartData = async () => {
    try {
      const token = localStorage.getItem('nayahe_hai');
      if (token) {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/cart/deleteAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        // If the deletion was successful, redirect to the home page
        if (response.status === 200) {
          window.location.href = '/'; // Redirect to home page
        }
        
        return response.data; // Return response data if needed
      }
    } catch (error) {
      console.log(error);
    }
  };
  

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
          {/* <a href="/" className="btn btn-success">Home</a> */}
          <button onClick={deleteAllCartData}  className="btn btn-success">Home</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
