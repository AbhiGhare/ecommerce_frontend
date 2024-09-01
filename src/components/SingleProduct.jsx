import React, { useEffect, useState } from 'react';
// import './SingleProduct.css'; // Ensure you have the corresponding CSS for styling
import p1 from '../assets/images/product-details/01.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from './services/api';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addFavoriteProduct } from '../redux/slice/favoritesSlice';
import { addToCart } from '../redux/slice/cartSlice';
import { FaUserCircle, FaPhone, FaHeart, FaShoppingCart, FaChevronDown, FaChevronRight, FaTwitter, FaFacebookF, FaWhatsapp,FaBars  } from 'react-icons/fa';
import { toast } from 'react-toastify';
const formatPriceInINR = (price) => {
  console.log(price, 'price');
  console.log(typeof (price), 'price');

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};
const SingleProduct = () => {
  const { id } = useParams();  // Use the product ID from the route parameters
  // const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  // const [toast, setToast] = useState({ show: false, message: '', type: '' }); // Toast state

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAction = async (action) => {
    const token = localStorage.getItem('nayahe_hai');
    if (token) {
      if (action === 'addToCart') {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/cart`,
            { productId: product._id, quantity: 1 },
            { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
          );

          if (response.status === 200) {
            // setToast({ show: true, message: 'Added to Cart successfully!', type: 'success' });
            dispatch(addToCart({ product, quantity: 1 }));
          } else {
            setToast({ show: true, message: 'Failed to add to cart.', type: 'error' });
          }
        } catch (error) {
          console.error('Error adding to cart:', error.response ? error.response.data : error.message);
          setToast({ show: true, message: 'Error adding to cart. Please try again.', type: 'error' });
        }
      } else if (action === 'favorite') {
        try {
          // Dispatch the thunk action to add to favorites
          await dispatch(addFavoriteProduct(product._id)).unwrap(); // Use unwrap() to handle errors

          // Fetch updated favorites list
          await dispatch(fetchFavoriteProducts()).unwrap(); // Fetch updated favorites list

          setToast({ show: true, message: 'Added to Favorites successfully!', type: 'success' });
        } catch (error) {
          console.error('Error adding to favorites:', error.message);
          setToast({ show: true, message: 'Error adding to favorites. Please try again.', type: 'error' });
        }
      }
    } else {
      toast.info('Please log in to add your Products.', {
        autoClose: 5000,
      });
      navigate('/login');
    }

  };


  useEffect(() => {
    // Fetch product data
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        console.log(data,'data');
        
        setProduct(data);
      } catch (error) {
        setError('Failed to fetch product details.');  // Set error state
      } finally {
        setLoading(false);  // Set loading to false after fetching data
      }
    };
    fetchProduct();
  }, [id]);
  return (
    <div>
      <style jsx>{`
        .product-images {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .main-img img {
          width: 100%;
          height: auto;
          object-fit: cover; /* Ensures the image covers the container without distortion */
          max-height: 500px; /* Optional: Set a max height for large images */
          border-radius: 8px; /* Optional: Add rounded corners to the image */
        }

        .images {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          justify-content: center; /* Center the thumbnails */
        }

        .images img {
          width: 100px; /* Fixed width for thumbnails */
          height: 100px; /* Fixed height for thumbnails */
          object-fit: cover; /* Crop the image to fill the thumbnail */
          border-radius: 8px; /* Optional: Add rounded corners to the thumbnails */
          cursor: pointer; /* Cursor changes to indicate these are clickable */
          transition: transform 0.3s; /* Smooth transition for hover effect */
        }

        .images img:hover {
          transform: scale(1.1); /* Slight zoom on hover for visual feedback */
        }
      `}</style>
      {/* Start Breadcrumbs */}
      {/* <div className="breadcrumbs">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content">
                <h1 className="page-title">Single Product</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-nav">
                <li><a href="/"><i className="lni lni-home"></i> Home</a></li>
                <li><a href="/shop">Shop</a></li>
                <li>Single Product</li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      {/* End Breadcrumbs */}

      {/* Start Item Details */}
      <section className="item-details section">
        <div className="container">
          <div className="top-area">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-images">
                  <main id="gallery">
                    <div className="main-img">
                      <img src={product?.image} id="current" alt="Product" />
                    </div>
                    <div className="images">
                      <img src={product?.image} className="img" alt="Product Thumbnail 1" />
                      <img src={product?.image} className="img" alt="Product Thumbnail 2" />
                      <img src={product?.image} className="img" alt="Product Thumbnail 3" />
                      <img src={product?.image} className="img" alt="Product Thumbnail 4" />
                      <img src={product?.image} className="img" alt="Product Thumbnail 5" />
                    </div>
                  </main>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-info">
                  <h2 className="title">{product?.name}</h2>
                  {/* <p className="category"><i className="lni lni-tag"></i> Drones: <a href="#">Action cameras</a></p> */}
                  {/* <h3 className="price">$850<span>$945</span></h3> */}
                  <h3 className="price">{formatPriceInINR(product?.price)}</h3>
                  {/* <p className="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                  <p className="info-text">{product?.description}</p>
                  {/* <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="form-group color-option">
                        <label className="title-label" htmlFor="size">Choose color</label>
                        <div className="single-checkbox checkbox-style-1">
                          <input type="checkbox" id="checkbox-1" defaultChecked />
                          <label htmlFor="checkbox-1"><span></span></label>
                        </div>
                        <div className="single-checkbox checkbox-style-2">
                          <input type="checkbox" id="checkbox-2" />
                          <label htmlFor="checkbox-2"><span></span></label>
                        </div>
                        <div className="single-checkbox checkbox-style-3">
                          <input type="checkbox" id="checkbox-3" />
                          <label htmlFor="checkbox-3"><span></span></label>
                        </div>
                        <div className="single-checkbox checkbox-style-4">
                          <input type="checkbox" id="checkbox-4" />
                          <label htmlFor="checkbox-4"><span></span></label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="form-group">
                        <label htmlFor="color">Battery capacity</label>
                        <select className="form-control" id="color">
                          <option>5100 mAh</option>
                          <option>6200 mAh</option>
                          <option>8000 mAh</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="form-group quantity">
                        <label htmlFor="quantity">Quantity</label>
                        <select className="form-control" id="quantity">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
                  <div className="bottom-content">
                    <div className="row align-items-end">
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="button cart-button">
                          <button onClick={() => handleAction('addToCart')} className="btn" style={{ width: '100%' }}><FaShoppingCart/> <span></span> Add to Cart</button>
                        </div>
                      </div>
                      {/* <div className="col-lg-4 col-md-4 col-12">
                        <div className="wish-button">
                          <button className="btn"><i className="lni lni-reload"></i> Compare</button>
                        </div>
                      </div> */}
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="wish-button">
                          <button onClick={() => handleAction('favorite')} className="btn"><FaHeart/> <span></span> To Wishlist</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-details-info">
            <div className="single-block">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="info-body custom-responsive-margin">
                    <h4>Details</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
                    <h4>Features</h4>
                    <ul className="features">
                      <li>Capture 4K30 Video and 12MP Photos</li>
                      <li>Game-Style Controller with Touchscreen</li>
                      <li>View Live Camera Feed</li>
                      <li>Full Control of HERO6 Black</li>
                      <li>Use App for Dedicated Camera Operation</li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="info-body">
                    <h4>Specifications</h4>
                    <ul className="normal-list">
                      <li><span>Weight:</span> 35.5oz (1006g)</li>
                      <li><span>Maximum Speed:</span> 35 mph (15 m/s)</li>
                      <li><span>Maximum Distance:</span> Up to 9,840ft (3,000m)</li>
                      <li><span>Operating Frequency:</span> 2.4GHz</li>
                      <li><span>Manufacturer:</span> GoPro, USA</li>
                    </ul>
                    <h4>Shipping Options:</h4>
                    <ul className="normal-list">
                      <li><span>Courier:</span> 2 - 4 days, $22.50</li>
                      <li><span>Local Shipping:</span> up to one week, $10.00</li>
                      <li><span>UPS Ground Shipping:</span> 4 - 6 days, $18.00</li>
                      <li><span>Unishop Global Export:</span> 3 - 4 days, $25.00</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Item Details */}
    </div>
  );
};

export default SingleProduct;
