import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt,FaEye  } from 'react-icons/fa';
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
    <div className="col-lg-3 col-md-6 col-12">
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

export default Product;
