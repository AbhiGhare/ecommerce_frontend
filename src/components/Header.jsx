import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaPhone, FaHeart, FaShoppingCart, FaChevronDown, FaChevronRight, FaTwitter, FaFacebookF, FaWhatsapp, FaBars, FaSignOutAlt } from 'react-icons/fa';
// import logo from '../assets/images/logo/logo.svg';
import logo from '../assets/images/logo/logo2.svg';
import p1 from '../assets/images/header/cart-items/item1.jpg';
import p2 from '../assets/images/header/cart-items/item2.jpg';
import { categories, menuItems, socialLinks2 } from './data';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../redux/slice/cartSlice';
import { fetchFavoriteProducts } from '../redux/slice/favoritesSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
// Data arrays
const currencies = [
  { value: '0', label: '$ USD' },
  { value: '1', label: '€ EURO' },
  { value: '2', label: '$ CAD' },
  { value: '3', label: '₹ INR' },
  { value: '4', label: '¥ CNY' },
  { value: '5', label: '৳ BDT' },
];

const languages = [
  { value: '0', label: 'English' },
  { value: '1', label: 'Español' },
  { value: '2', label: 'Filipino' },
  { value: '3', label: 'Français' },
  { value: '4', label: 'العربية' },
  { value: '5', label: 'हिन्दी' },
  { value: '6', label: 'বাংলা' },
];

const menuLinks = [
  { href: 'index.html', label: 'Home' },
  { href: 'about-us.html', label: 'About Us' },
  { href: 'contact.html', label: 'Contact Us' },
];

const cartItems = [
  {
    id: 1,
    image: p1,
    title: 'Apple Watch Series 6',
    quantity: '1x',
    amount: '$99.00',
  },
  {
    id: 2,
    image: p2,
    title: 'Wi-Fi Smart Camera',
    quantity: '1x',
    amount: '$35.00',
  },
];

const socialLinks = [
  { href: 'javascript:void(0)', iconClass: 'lni lni-facebook-filled' },
  { href: 'javascript:void(0)', iconClass: 'lni lni-twitter-original' },
  { href: 'javascript:void(0)', iconClass: 'lni lni-instagram' },
  { href: 'javascript:void(0)', iconClass: 'lni lni-skype' },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to control dropdown visibility
  const token = localStorage.getItem('nayahe_hai');
  const cartCount = useSelector((state) => state.cart.cartCount);
  const favoriteCount = useSelector((state) => state.favorites.favoritesCount);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (token) {
      dispatch(fetchCartData());
      dispatch(fetchFavoriteProducts());
      const userLoggedIn = localStorage.getItem('nayahe_hai');
      setIsLoggedIn(!!userLoggedIn); // Convert to boolean
    }
  }, [dispatch, token, isLoggedIn]);

  const handleLogout = () => {
    // Remove the key from local storage and update the state
    localStorage.removeItem('nayahe_hai');
    console.log(localStorage.getItem('nayahe_hai'),'localStorage');
    
    setIsLoggedIn(false);
     // Show the toast notification
     toast.success('Logged out successfully!', {
      onClose: () => {
        // Refresh the page after the toast closes
        window.location.reload(); // Hard refresh
      },
    });
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) { // Start searching when input has more than 2 characters
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/search?query=${query}`);
        setSearchResults(response.data);
        setIsDropdownVisible(true);
      } catch (err) {
        console.error(err.message);
        setIsDropdownVisible(false);
      }
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  const handleResultClick = () => {
    setIsDropdownVisible(false); // Hide dropdown when a result is clicked
    setSearchQuery(''); // Clear the search input
  };

  const handlefavoritesClick = (e) => {
    e.preventDefault(); // Prevent default link behavior

    const isLoggedIn = !!localStorage.getItem('nayahe_hai');
    if (isLoggedIn) {
      // Redirect to the cart page if logged in
      navigate('/favorites');
    } else {
      // Show a toast message if not logged in
      toast.info('Please log in to view your cart.', {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      // Optionally redirect to the login page
      navigate('/login');
    }
  };
  const handlecartClick = (e) => {
    e.preventDefault(); // Prevent default link behavior

    const isLoggedIn = !!localStorage.getItem('nayahe_hai');
    if (isLoggedIn) {
      // Redirect to the cart page if logged in
      navigate('/cart');
    } else {
      // Show a toast message if not logged in
      toast.info('Please log in to view your cart.', {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      // Optionally redirect to the login page
      navigate('/login');
    }
  };

  return (
    <header className="header navbar-area">
      {/* Start Topbar */}
      <div className="topbar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-4 col-12">
              <div className="top-left">
                <ul className="menu-top-link">
                  <li>
                    <div className="select-position">
                      <select id="select4" defaultValue="0">
                        {currencies.map(currency => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <li>
                    <div className="select-position">
                      <select id="select5" defaultValue="0">
                        {languages.map(language => (
                          <option key={language.value} value={language.value}>
                            {language.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <div className="top-middle">
                <ul className="useful-links">
                  {menuLinks.map(link => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              {/* <div className="top-end">
                <div className="user">
                  <FaUserCircle size={20} color="white" />
                  <span></span> Hello
                </div>
                <ul className="user-login">
                  <li><a href="/login">Sign In</a></li>
                  <li><a href="/signUp">Register</a></li>
                </ul>
              </div> */}
              <div className="top-end">
                <div className="user">
                  <FaUserCircle size={20} color="white" />
                  <span></span> Hello
                </div>
                <ul className="user-login">
                  {isLoggedIn ? (
                    <li>
                      <button
                        className="btn btn-link text-white d-flex align-items-center"
                        onClick={handleLogout}
                        aria-label="Logout"
                      >
                        <FaSignOutAlt style={{ fontSize: '1.25rem', marginRight: '0.5rem' }} />
                        Logout
                      </button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" className="text-white text-decoration-none">Sign In</Link>
                      </li>
                      <li>
                        <Link to="/signUp" className="text-white text-decoration-none">Register</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Topbar */}

      {/* Start Header Middle */}
      <div className="header-middle">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-3 col-7">
              <a className="navbar-brand" href="/">
                <img src={logo} alt="Logo" />
              </a>
            </div>
            <div className="col-lg-5 col-md-7 d-xs-none">
              <div className="main-menu-search">
                <div className="d-flex align-items-center mx-4 mx-md-8">
                  {/* Search Input */}
                  <div className="flex-grow position-relative">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="form-control bg-light border-0 rounded-pill"
                      style={{ width: '383px' }}
                      aria-label="Search"
                      onFocus={() => setIsDropdownVisible(true)}
                      onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
                    />

                    {/* Dropdown Search Results */}
                    {isDropdownVisible && searchResults.length > 0 && (
                      <ul className="list-group position-absolute top-100 start-0 w-100 bg-white border rounded mt-2 shadow-lg" style={{ maxHeight: '200px', overflowY: 'auto', zIndex: 9999 }}>
                        {searchResults.map((product) => (
                          <li
                            key={product._id}
                            onClick={() => handleResultClick(product)}
                            className="list-group-item d-flex align-items-center cursor-pointer"
                          >
                            <Link to={`/product-details/${product._id}`} className="d-flex align-items-center text-decoration-none text-dark">
                              <img src={product.image} alt={product.name} className="img-thumbnail me-2" style={{ width: '40px', height: '40px' }} />
                              <span>{product.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Search Button
                  <button className="btn btn-primary ms-2">
                    <i className="lni lni-search-alt"></i>
                  </button> */}
                </div>

              </div>
            </div>
            <div className="col-lg-4 col-md-2 col-5">
              <div className="middle-right-area">
                <div className="nav-hotline">
                  {/* <i className="lni lni-phone"></i> */}

                  <h3 className='d-flex'><FaPhone />: <span>(+100) 123 456 7890</span></h3>
                </div>
                <div className="navbar-cart">
                  <div className="wishlist">
                    <Link to="#" className="main-btn" onClick={handlefavoritesClick}>
                      <FaHeart />
                      <span className="total-items">{favoriteCount}</span>
                    </Link>
                  </div>
                  <div className="cart-items">
                    {/* <a href="/cart" className="main-btn">
                      <FaShoppingCart />
                      <span className="total-items">{cartCount}</span>
                    </a> */}
                    <Link to="#" className="main-btn" onClick={handlecartClick}>
                      <FaShoppingCart />
                      <span className="total-items">{cartCount}</span>
                    </Link>
                    {/* <div className="shopping-item">
                      <div className="dropdown-cart-header">
                        <span>{cartItems.length} Items</span>
                        <a href="/cart">View Cart</a>
                      </div>
                      <ul className="shopping-list">
                        {cartItems.map(item => (
                          <li key={item.id}>
                            <a href="javascript:void(0)" className="remove" title="Remove this item">
                              <i className="lni lni-close"></i>
                            </a>
                            <div className="cart-img-head">
                              <a className="cart-img" href="product-details.html">
                                <img src={item.image} alt={item.title} />
                              </a>
                            </div>
                            <div className="content">
                              <h4><a href="product-details.html">{item.title}</a></h4>
                              <p className="quantity">{item.quantity} - <span className="amount">{item.amount}</span></p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="bottom">
                        <div className="total">
                          <span>Total</span>
                          <span className="total-amount">
                            ${cartItems.reduce((total, item) => total + parseFloat(item.amount.slice(1)), 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="button">
                          <a href="checkout.html" className="btn animate">Checkout</a>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Header Middle */}

      {/* Start Header Bottom */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-6 col-12">
            <div className="nav-inner">
              {/* <div className="mega-category-menu">
                <span className="cat-button">
                <FaChevronDown /><span> </span>
                  All Categories
                </span>
                <ul className="sub-category">
                  {categories.map(category => (
                    <li key={category.title}>
                      <a href={category.link}>
                        {category.title} <FaChevronRight    />
                      </a>
                      {category.subCategories && (
                        <ul className="inner-sub-category">
                          {category.subCategories.map(subCategory => (
                            <li key={subCategory.title}>
                              <a href={subCategory.link}>{subCategory.title}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div> */}

              <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler mobile-menu-btn border-0" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <FaBars size={30} color="black" />
                </button>
                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                  <ul id="nav" className="navbar-nav ms-auto">
                    {menuItems.map(menuItem => (
                      <li className="nav-item" key={menuItem.title}>
                        {menuItem.subMenuId ? (
                          <>
                            <NavLink
                              className="dd-menu collapsed"
                              to={menuItem.link}
                              data-bs-toggle="collapse"
                              data-bs-target={`#${menuItem.subMenuId}`}
                              aria-controls={menuItem.subMenuId}
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                            >
                              {menuItem.title} <FaChevronDown />
                            </NavLink>
                            {menuItem.subMenu && (
                              <ul className="sub-menu collapse" id={menuItem.subMenuId}>
                                {menuItem.subMenu.map(subMenuItem => (
                                  <li className="nav-item" key={subMenuItem.title}>
                                    <NavLink to={`categoryName/${subMenuItem.link}`}>{subMenuItem.title}</NavLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <NavLink
                            className="dd-menu"
                            to={menuItem.link}
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                          >
                            {menuItem.title}
                          </NavLink>
                        )}
                      </li>
                    ))}
                  </ul>

                </div>
              </nav>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <div className="nav-social">
              <h5 className="title">Follow Us:</h5>
              <ul>
                {/* {socialLinks2.map(link => (
                  <li key={link.iconClass}>
                    <a href={link.href}><link.iconClass/></a>
                  </li>
                ))} */}
                <li >
                  <a href={'/'}><FaTwitter /></a>
                </li>
                <li >
                  <a href={'/'}><FaWhatsapp /></a>
                </li>
                <li >
                  <a href={'/'}><FaFacebookF /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End Header Bottom */}
    </header>
  );
};

export default Header;
