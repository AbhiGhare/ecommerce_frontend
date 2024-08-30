import React, { useEffect } from 'react';
import { FaChevronLeft ,FaChevronRight} from 'react-icons/fa';
// import 'font-awesome/css/font-awesome.min.css';
import { tns } from 'tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import bg from '../assets/images/hero/slider-bg2.jpg'
import bg1 from '../assets/images/hero/slider-bg1.jpg'
import bg2 from '../assets/images/hero/slider-bnr.jpg'
// import './HeroArea.css'; // Ensure your CSS is in place

const HeroArea = () => {
  useEffect(() => {
    // Function to initialize Tiny Slider
    const initializeSliders = () => {
      const heroSlider = document.querySelector('.hero-slider');
      if (heroSlider) {
        tns({
          container: '.hero-slider',
          slideBy: 'page',
          autoplay: true,
          autoplayButtonOutput: false,
          mouseDrag: true,
          gutter: 0,
          items: 1,
          nav: false,
          controls: true,
          controlsText: [
            '<button class="arrow-button" aria-label="Previous Slide">&larr;</button>',
            '<button class="arrow-button" aria-label="Next Slide">&rarr;</button>'
          ],
        });
      }

      const brandSlider = document.querySelector('.brands-logo-carousel');
      if (brandSlider) {
        tns({
          container: '.brands-logo-carousel',
          autoplay: true,
          autoplayButtonOutput: false,
          mouseDrag: true,
          gutter: 15,
          nav: false,
          controls: false,
          responsive: {
            0: {
              items: 1,
            },
            540: {
              items: 3,
            },
            768: {
              items: 5,
            },
            992: {
              items: 6,
            }
          }
        });
      }
    };

    // Call initialization function
    initializeSliders();

    // Initialize GLightbox if needed
    GLightbox();

  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <section className="hero-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 custom-padding-right">
            <div className="slider-head">
              {/* Start Hero Slider */}
              <div className="hero-slider">
                {/* Start Single Slider */}
                <div 
                  className="single-slider"
                  style={{ backgroundImage: `url(${bg})` }}
                >
                  <div className="content">
                    <h2>
                      <span>No restocking fee ($35 savings)</span>
                      M75 Sport Watch
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <h3>
                      <span>Now Only</span> $320.99
                    </h3>
                    <div className="button">
                      <a href="product-grids.html" className="btn">Shop Now</a>
                    </div>
                  </div>
                </div>
                {/* End Single Slider */}

                {/* Start Single Slider */}
                <div 
                  className="single-slider"
                  style={{ backgroundImage: `url(${bg1})` }}
                >
                  <div className="content">
                    <h2>
                      <span>Big Sale Offer</span>
                      Get the Best Deal on CCTV Camera
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <h3>
                      <span>Combo Only:</span> $590.00
                    </h3>
                    <div className="button">
                      <a href="product-grids.html" className="btn">Shop Now</a>
                    </div>
                  </div>
                </div>
                {/* End Single Slider */}
              </div>
              {/* End Hero Slider */}
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className="row">
              <div className="col-lg-12 col-md-6 col-12 md-custom-padding">
                {/* Start Small Banner */}
                <div 
                  className="hero-small-banner"
                  style={{ backgroundImage: `url(${bg2})` }}
                >
                  <div className="content">
                    <h2>
                      <span>New line required</span>
                      iPhone 12 Pro Max
                    </h2>
                    <h3>$259.99</h3>
                  </div>
                </div>
                {/* End Small Banner */}
              </div>
              <div className="col-lg-12 col-md-6 col-12">
                {/* Start Small Banner */}
                <div className="hero-small-banner style2">
                  <div className="content">
                    <h2>Weekly Sale!</h2>
                    <p>Saving up to 50% off all online store items this week.</p>
                    <div className="button">
                      <a className="btn" href="product-grids.html">Shop Now</a>
                    </div>
                  </div>
                </div>
                {/* End Small Banner */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroArea;
