import React from 'react';
// import './Banner.css'; // Ensure you import necessary CSS for styling
import b1 from '../assets/images/banner/banner-1-bg.jpg'
import b2 from '../assets/images/banner/banner-2-bg.jpg'
const Banner = () => {
  return (
    <section className="banner section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div 
              className="single-banner" 
              style={{ backgroundImage: `url(${b1})` }}
            >
              <div className="content">
                <h2>Smart Watch 2.0</h2>
                <p>Space Gray Aluminum Case with <br />Black/Volt Real Sport Band</p>
                <div className="button">
                  <a href="product-grids.html" className="btn">View Details</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div 
              className="single-banner custom-responsive-margin"
              style={{ backgroundImage: `url(${b2})` }}
            >
              <div className="content">
                <h2>Smart Headphone</h2>
                <p>Lorem ipsum dolor sit amet, <br />eiusmod tempor incididunt ut labore.</p>
                <div className="button">
                  <a href="product-grids.html" className="btn">Shop Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
