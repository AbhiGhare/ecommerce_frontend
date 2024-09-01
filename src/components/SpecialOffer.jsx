import React, { useState, useEffect } from 'react';
import p3 from '../assets/images/products/product-3.jpg';
import p13 from '../assets/images/banner/banner-3-bg.jpg';
import p8 from '../assets/images/products/product-8.jpg';
import p6 from '../assets/images/products/product-6.jpg';
import p7 from '../assets/images/offer/offer-image.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaRegStar, FaStar } from 'react-icons/fa';
const formatPriceInINR = (price) => {
  console.log(price, 'price');
  console.log(typeof (price), 'price');

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

const Product = ({ id, image, category, title, reviews, price, discountPrice, saleTag, newTag }) => {

  const navigate = useNavigate();
  // Inline styles
  const productImageContainerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%', // Ensure container takes full width of parent
    height: '200px', // Fixed height for the image container
    display: 'flex',
    alignItems: 'center', // Center the image vertically
    justifyContent: 'center', // Center the image horizontally
  };

  const imgStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain', // Ensure the whole image fits within the container
    display: 'block',
  };

  const tagStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: 'rgba(0, 0, 0, 0.6)', // Slightly transparent background
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: 'bold',
  };

  const saleTagStyle = {
    ...tagStyle,
    background: '#e74c3c', // Red background for sale tag
  };

  const newTagStyle = {
    ...tagStyle,
    background: '#2ecc71', // Green background for new tag
  };

  const productInfoStyle = {
    padding: '15px',
  };

  const priceStyle = {
    fontWeight: 'bold',
  };

  const discountPriceStyle = {
    color: '#e74c3c', // Red color for discount price
    textDecoration: 'line-through', // Strikethrough for original price
  };



  return (
    <div className="col-lg-4 col-md-4 col-12">
      <div className="single-product">
        <div className="product-image" style={productImageContainerStyle}>
          <img
            src={image}
            alt={title}
            style={imgStyle}
          />
          {saleTag && <span style={saleTagStyle}>{saleTag}</span>}
          {newTag && <span style={newTagStyle}>{newTag}</span>}
          <div className="button">
            <a onClick={() => navigate(`/product-details/${id}`)} className="btn">
              <FaEye size={20} color="white" /> <span></span> View Item
            </a>
          </div>
        </div>
        <div className="product-info" style={productInfoStyle}>
          <span className="category">{category}</span>
          <h4 className="title">
            <a href="product-grids.html">{title}</a>
          </h4>
          <ul className="review">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                {i < reviews ? (
                  <FaStar size={24} color="gold" /> // Filled star
                ) : (
                  <FaRegStar size={24} color="gold" /> // Empty star
                )}
              </li>
            ))}
            <li><span>{reviews}.0 Review(s)</span></li>
          </ul>
          <div className="price" style={priceStyle}>
            <span>{formatPriceInINR(price)}</span>
            {/* <span>{price}</span> */}
            {discountPrice && <span style={discountPriceStyle}>{discountPrice}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Set your target end date here
const targetDate = new Date('2024-09-03T00:00:00'); // YYYY-MM-DDTHH:MM:SS format

const SpecialOffer = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        const allProducts = response.data;
        if (Array.isArray(allProducts)) {
          const randomProducts = getRandomProducts(allProducts, 4); // Get 4 random products
          setProducts(randomProducts);
          console.log(randomProducts, 'randomProducts');
          console.log(randomProducts[0], 'randomProducts');

        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();

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

  function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
              <Product
                key={products[0]?._id}
                id={products[0]?._id}
                image={products[0]?.image}
                category={products[0]?.category}
                title={products[0]?.name}
                reviews={5} // You may need to adjust this based on your actual review data
                price={products[0]?.price}
                discountPrice={products[0]?.price > 500 ? `${products[0]?.price - 50}` : undefined} // Example condition for discount
                saleTag={products[0]?.price > 500 ? '-10%' : undefined} // Example condition for sale tag
                newTag={products[0]?.stock < 5 ? 'New' : undefined} // Example condition for new tag
              />
              <Product
                key={products[1]?._id}
                id={products[1]?._id}
                image={products[1]?.image}
                category={products[1]?.category}
                title={products[1]?.name}
                reviews={5} // You may need to adjust this based on your actual review data
                price={products[1]?.price}
                discountPrice={products[1]?.price > 500 ? `${products[1]?.price - 50}` : undefined} // Example condition for discount
                saleTag={products[1]?.price > 500 ? '-10%' : undefined} // Example condition for sale tag
                newTag={products[1]?.stock < 5 ? 'New' : undefined} // Example condition for new tag
              />
              <Product
                key={products[2]?._id}
                id={products[2]?._id}
                image={products[2]?.image}
                category={products[2]?.category}
                title={products[2]?.name}
                reviews={5} // You may need to adjust this based on your actual review data
                price={products[2]?.price}
                discountPrice={products[2]?.price > 500 ? `${products[2]?.price - 50}` : undefined} // Example condition for discount
                saleTag={products[2]?.price > 500 ? '-10%' : undefined} // Example condition for sale tag
                newTag={products[2]?.stock < 5 ? 'New' : undefined} // Example condition for new tag
              />
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
                  <span>{formatPriceInINR(400)}</span>
                </div>
                <div className="button">
                  <a href="#" className="btn">Shop Now</a>
                </div>
              </div>
            </div>
            {/* End Banner */}
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <div className="offer-content">
              <div className="image">
                <img src={products[3]?.image} alt="Bluetooth Headphone" />
                <span className="sale-tag">-50%</span>
              </div>
              <div className="text">
                <h2><a href="product-grids.html">{products[3]?.name}</a></h2>
                <ul className="review">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>
                      {i < 5 ? (
                        <FaStar size={24} color="gold" /> // Filled star
                      ) : (
                        <FaRegStar size={24} color="gold" /> // Empty star
                      )}
                    </li>
                  ))}
                  <li><span>{5}.0 Review(s)</span></li>
                </ul>
                <div className="price">
                  <span>{formatPriceInINR(products[3]?.price)}</span>
                  {/* <span className="discount-price">{formatPriceInINR(400)}</span> */}
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
