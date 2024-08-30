import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, fetchCartData, updateItemQuantity } from '../redux/slice/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const stripePromise = loadStripe('pk_test_51PqzylF3Gw8WOVEszq0jJNerrtxK8hRYteyFXddZKmrUzodpMX5yglJiDLU7iudwy1ITLeoY11PrfOwUYWDgbFe800FWObyiB9');

// CartItem component
const formatPriceInINR = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const { product, quantity } = item

  return (
    <div className="cart-single-list">
      <div className="row align-items-center">
        <div className="col-lg-1 col-md-1 col-12">
          <a href={item.detailsLink}>
            <img src={product.image} alt={product.name} />
          </a>
        </div>
        <div className="col-lg-4 col-md-3 col-12">
          <h5 className="product-name">
            <a href={product.detailsLink}>{product.name}</a>
          </h5>
          {/* <p className="product-des">
            <span><em>Type:</em> {item.type}</span>
            <span><em>Color:</em> {item.color}</span>
          </p> */}
        </div>
        <div className="col-lg-2 col-md-2 col-12">
          <p>{formatPriceInINR(product.price)}</p>
        </div>
        <div className="col-lg-2 col-md-2 col-12">
          <div className="quantity-controls d-flex">
            <button
              className="btn btn-secondary"
              onClick={() => onQuantityChange(product._id, -1)}
              disabled={item.quantity <= 1}
            >
              {/* <FaMinus /> */}-
            </button>
            <input
              type="text"
              value={item.quantity}
              readOnly
              className="form-control text-center"
            />
            <button
              className="btn btn-secondary"
              onClick={() => onQuantityChange(product._id, 1)}
            >
              {/* <FaPlus /> */}+
            </button>
          </div>
        </div>

        <div className="col-lg-2 col-md-2 col-12">
          <p>{formatPriceInINR(product.price * quantity)}</p>
        </div>

        <div className="col-lg-1 col-md-2 col-12">
          <button
            className="btn btn-link text-danger"
            onClick={() => onRemove(product._id)}
            aria-label="Remove item"
          >
            <FaTrash style={{ fontSize: '1.25rem' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Cart component
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: productsInCart, status, error } = useSelector((state) => state.cart);


  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('nayahe_hai');
    if (isLoggedIn) {
      dispatch(fetchCartData());
    } else {
      toast.info('Please log in to view your cart.', {
        autoClose: 5000,
      });
      navigate('/login');
    }
    
  }, [dispatch]);
  console.log(productsInCart, 'productsInCart');

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: 'assets/images/cart/01.jpg',
      name: 'Canon EOS M50 Mirrorless Camera',
      type: 'Mirrorless',
      color: 'Black',
      quantity: 1,
      subtotal: 910.00,
      discount: 29.00,
      detailsLink: 'product-details.html'
    },
    {
      id: 2,
      image: 'assets/images/cart/02.jpg',
      name: 'Apple iPhone X 256 GB Space Gray',
      type: 'Smartphone',
      color: 'Space Gray',
      quantity: 1,
      subtotal: 1100.00,
      discount: 0.00,
      detailsLink: 'product-details.html'
    },
    {
      id: 3,
      image: 'assets/images/cart/03.jpg',
      name: 'HP LaserJet Pro Laser Printer',
      type: 'Laser',
      color: 'White',
      quantity: 1,
      subtotal: 550.00,
      discount: 0.00,
      detailsLink: 'product-details.html'
    }
  ]);



  const handleDelete = async (id) => {
    await dispatch(deleteItem(id));
    // Fetch updated cart data after deleting item
    dispatch(fetchCartData());
  };

  const handleQuantityChange = async (id, delta) => {
    const product = productsInCart.find(p => p.product._id === id);
    if (product) {
      const newQuantity = Math.max(product.quantity + delta, 1);
      await dispatch(updateItemQuantity({ productId: id, quantity: newQuantity }));
      // Fetch updated cart data after updating quantity
      dispatch(fetchCartData());
    }
  };

  const calculateTotalPrice = () => {
    return productsInCart.reduce((total, product) => total + (product.product.price * product.quantity), 0);
  };

  const calculateDiscount = (totalPrice) => {
    return totalPrice * 0.1;
  };

  const totalPrice = calculateTotalPrice();
  const discount = calculateDiscount(totalPrice);
  const finalPrice = totalPrice - discount;

  const makePayment = async () => {
    const stripe = await stripePromise;
    const body = {
      products: productsInCart.map(product => ({
        dish: product.product.name, // Adjust field names as needed
        imgdata: product.product.image,
        price: product.product.price,
        qnty: product.quantity
      }))
    };
    const headers = {
      "Content-Type": "application/json"
    };
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    const session = await response.json();
    const result = stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <div className="shopping-cart section">
      <div className="container">
        <div className="cart-list-head">
          <div className="cart-list-title">
            <div className="row">
              <div className="col-lg-1 col-md-1 col-12"></div>
              <div className="col-lg-4 col-md-3 col-12"><p>Product Name</p></div>
              <div className="col-lg-2 col-md-2 col-12"><p>Price</p></div>
              <div className="col-lg-2 col-md-2 col-12"><p>Quantity</p></div>
              <div className="col-lg-2 col-md-2 col-12"><p>Total</p></div>
              {/* <div className="col-lg-2 col-md-2 col-12"><p>Discount</p></div> */}
              <div className="col-lg-1 col-md-2 col-12"><p>Remove</p></div>
            </div>
          </div>
          {productsInCart.map(item => (
            <CartItem
              key={item._id}
              item={item}
              onRemove={handleDelete}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="total-amount">
              <div className="row">
                <div className="col-lg-8 col-md-6 col-12">
                  <div className="left">
                    <div className="coupon">
                      <form action="#" target="_blank">
                        <input name="Coupon" placeholder="Enter Your Coupon" />
                        <div className="button">
                          <button className="btn">Apply Coupon</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="right">
                    <ul>
                      <li>Cart Subtotal<span>{formatPriceInINR(totalPrice.toFixed(2))}</span></li>
                      <li>Shipping<span>Free</span></li>
                      <li>You Save<span>{formatPriceInINR(discount.toFixed(2))}</span></li>
                      <li className="last">You Pay<span>{formatPriceInINR(finalPrice.toFixed(2))}</span></li>
                    </ul>
                    <div className="button">
                      <button className="btn" onClick={makePayment}>Checkout</button>
                      <a href="/" className="btn btn-alt">Continue shopping</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
