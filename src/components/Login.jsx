import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { FaFacebookF, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import loginLogo from '../assets/images/login.svg'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      const { token } = response.data;

      // Save the token to local storage
      localStorage.setItem('nayahe_hai', token);
      toast.success('Login successful!');
      // toast.success('Login successful!');
      // Redirect user to the home page or any protected route
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-center text-lg-start">
      <style>
        {`
          .cascading-right {
            margin-right: -50px;
          }

          @media (max-width: 991.98px) {
            .cascading-right {
              margin-right: 0;
            }
          }
        `}
      </style>

      <Container className="py-4">
        <Row className="g-0 align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: 'blur(30px)' }}>
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Log In now</h2>
                <Form onSubmit={handleLogin}>
                  {/* <Row>
                    <Col md={6} className="mb-4">
                      <Form.Group>
                        <Form.Control type="email" id="form3Example1" value={email}
                          onChange={(e) => setEmail(e.target.value)} />
                        <Form.Label htmlFor="form3Example1">First name</Form.Label>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-4">
                      <Form.Group>
                        <Form.Control type="text" id="form3Example2" />
                        <Form.Label htmlFor="form3Example2">Last name</Form.Label>
                      </Form.Group>
                    </Col>
                  </Row> */}

                  <Form.Group className="mb-4">
                    <Form.Control type="email" id="form3Example3"  value={email} 
                  onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Label htmlFor="form3Example3">Email address</Form.Label>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Control type="password" id="form3Example4" value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                    <Form.Label htmlFor="form3Example4">Password</Form.Label>
                  </Form.Group>

                  {/* <Form.Check
                    type="checkbox"
                    id="form2Example33"
                    label="Subscribe to our newsletter"
                    defaultChecked
                    className="mb-4"
                  /> */}

                  <Button type="submit" variant="primary" className="btn-block mb-4">
                    Log in
                  </Button>

                  <div className="text-center">
                    <p>or sign up with:</p>
                    <Button variant="link" className="btn btn-link btn-floating mx-1">
                      <FaFacebookF />
                    </Button>
                    <Button variant="link" className="btn btn-link btn-floating mx-1">
                      <FaGoogle />
                    </Button>
                    <Button variant="link" className="btn btn-link btn-floating mx-1">
                      <FaTwitter />
                    </Button>
                    <Button variant="link" className="btn btn-link btn-floating mx-1">
                      <FaGithub />
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>

          <Col lg={6} className="mb-5 mb-lg-0">
            <img
              src={loginLogo}
              className="w-100 rounded-4 shadow-4"
              alt=""
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
