import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './HomePage';
// import AboutPage from './AboutPage';
// import ContactPage from './ContactPage';
import HomePage from './components/HomePage';
import Productdetails from './components/productdetails';
import Grid from './components/grid';
import Cart from './components/Cart';
import Header from './components/Header';
import Login from './components/Login';
import Favorites from './components/Favorites';
import SignUpPage from './components/SignUpPage';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancelled from './components/PaymentCancelled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-details/:id" element={<Productdetails />} />
        <Route path="/categoryName/:categoryName" element={<Grid />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/sucess" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentCancelled />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        {/* Add more routes as needed */}
      </Routes>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </Router>
  );
}

export default App;
