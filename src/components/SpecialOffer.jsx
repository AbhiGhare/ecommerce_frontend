import React, { useState, useEffect } from 'react';
import p3 from '../assets/images/products/product-3.jpg';
import p13 from '../assets/images/banner/banner-3-bg.jpg';
import p8 from '../assets/images/products/product-8.jpg';
import p6 from '../assets/images/products/product-6.jpg';
import p7 from '../assets/images/offer/offer-image.jpg';

// Set your target end date here
const targetDate = new Date('2024-09-01T00:00:00'); // YYYY-MM-DDTHH:MM:SS format

const SpecialOffer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };

    if (difference < 0) {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  }

  return (
    <section className="special-offer section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Special Offer</h2>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                suffered alteration in some form.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-12 col-12">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-12">
                {/* Start Single Product */}
                <div className="single-product">
                  <div className="product-image">
                    <img src={p3} alt="WiFi Security Camera" />
                    <div className="button">
                      <a href="product-details.html" className="btn">
                        <i className="lni lni-cart"></i> Add to Cart
                      </a>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="category">Camera</span>
                    <h4 className="title">
                      <a href="product-grids.html">WiFi Security Camera</a>
                    </h4>
                    <ul className="review">
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><span>5.0 Review(s)</span></li>
                    </ul>
                    <div className="price">
                      <span>$399.00</span>
                    </div>
                  </div>
                </div>
                {/* End Single Product */}
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                {/* Start Single Product */}
                <div className="single-product">
                  <div className="product-image">
                    <img src={p8} alt="Apple MacBook Air" />
                    <div className="button">
                      <a href="product-details.html" className="btn">
                        <i className="lni lni-cart"></i> Add to Cart
                      </a>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="category">Laptop</span>
                    <h4 className="title">
                      <a href="product-grids.html">Apple MacBook Air</a>
                    </h4>
                    <ul className="review">
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><span>5.0 Review(s)</span></li>
                    </ul>
                    <div className="price">
                      <span>$899.00</span>
                    </div>
                  </div>
                </div>
                {/* End Single Product */}
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                {/* Start Single Product */}
                <div className="single-product">
                  <div className="product-image">
                    <img src={p6} alt="Bluetooth Speaker" />
                    <div className="button">
                      <a href="product-details.html" className="btn">
                        <i className="lni lni-cart"></i> Add to Cart
                      </a>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="category">Speaker</span>
                    <h4 className="title">
                      <a href="product-grids.html">Bluetooth Speaker</a>
                    </h4>
                    <ul className="review">
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star-filled"></i></li>
                      <li><i className="lni lni-star"></i></li>
                      <li><span>4.0 Review(s)</span></li>
                    </ul>
                    <div className="price">
                      <span>$70.00</span>
                    </div>
                  </div>
                </div>
                {/* End Single Product */}
              </div>
            </div>
            {/* Start Banner */}
            <div 
              className="single-banner right"
              style={{ backgroundImage: `url(${p13})`, marginTop: '30px' }}
            >
              <div className="content">
                <h2>Samsung Notebook 9</h2>
                <p>Lorem ipsum dolor sit amet, <br />eiusmod tempor incididunt ut labore.</p>
                <div className="price">
                  <span>$590.00</span>
                </div>
                <div className="button">
                  <a href="product-grids.html" className="btn">Shop Now</a>
                </div>
              </div>
            </div>
            {/* End Banner */}
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <div className="offer-content">
              <div className="image">
                <img src={p7} alt="Bluetooth Headphone" />
                <span className="sale-tag">-50%</span>
              </div>
              <div className="text">
                <h2><a href="product-grids.html">Bluetooth Headphone</a></h2>
                <ul className="review">
                  <li><i className="lni lni-star-filled"></i></li>
                  <li><i className="lni lni-star-filled"></i></li>
                  <li><i className="lni lni-star-filled"></i></li>
                  <li><i className="lni lni-star-filled"></i></li>
                  <li><i className="lni lni-star-filled"></i></li>
                  <li><span>5.0 Review(s)</span></li>
                </ul>
                <div className="price">
                  <span>$200.00</span>
                  <span className="discount-price">$400.00</span>
                </div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry incididunt ut
                  eiusmod tempor labores.</p>
              </div>
              <div className="box-head">
                <div className="box">
                  <h1>{timeLeft.days.toString().padStart(3, '0')}</h1>
                  <h2>Days</h2>
                </div>
                <div className="box">
                  <h1>{timeLeft.hours.toString().padStart(2, '0')}</h1>
                  <h2>Hours</h2>
                </div>
                <div className="box">
                  <h1>{timeLeft.minutes.toString().padStart(2, '0')}</h1>
                  <h2>Minutes</h2>
                </div>
                <div className="box">
                  <h1>{timeLeft.seconds.toString().padStart(2, '0')}</h1>
                  <h2>Seconds</h2>
                </div>
              </div>
              {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
                <div className="alert" style={{ background: 'rgb(204, 24, 24)' }}>
                  <h1 style={{ padding: '50px 80px', color: 'white' }}>We are sorry, Event ended!</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
