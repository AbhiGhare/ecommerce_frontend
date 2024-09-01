import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Alert } from 'react-bootstrap';

const OrderDeliveryPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(null);

  const getSessionUSer = async () => {
    try {
      const token = localStorage.getItem('nayahe_hai');
      if (token) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/sessions/userSession`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }
      throw new Error('No token found');
    } catch (error) {
      console.error('Failed to fetch session data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSessionUSer();
        setOrderData(data);
      } catch (error) {
        setError('Failed to fetch order data.');
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mt-4">
        <Col>
          <h1>Order Details</h1>
        </Col>
      </Row>
      {orderData.length > 0 ? (
        orderData.map((order) => (
          <Row key={order._id} className="mb-4">
            <Col>
              <Card>
                <Card.Header>Order ID: {order.sessionId}</Card.Header>
                <Card.Body>
                  <Card.Title>Customer Information</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Name:</strong> {order.customerName}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {order.customerEmail}</ListGroup.Item>
                    <ListGroup.Item><strong>Address:</strong> {order.customerAddress.line1}, {order.customerAddress.city}, {order.customerAddress.state}, {order.customerAddress.postal_code}, {order.customerAddress.country}</ListGroup.Item>
                  </ListGroup>
                  <Card.Title className="mt-3">Order Items</Card.Title>
                  <ListGroup>
                    {order.lineItems.map((item) => (
                      <ListGroup.Item key={item.id}>
                        <strong>{item.productName}</strong> - {item.quantity} x {item.unitAmount / 100} {item.currency}
                        <br />
                        <img src={item.productImages[0]} alt={item.productName} style={{ width: '100px' }} />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Card.Footer className="mt-3">
                    <h5>Total: {order.amountTotal / 100} {order.currency}</h5>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Delivery Information</Card.Header>
                <Card.Body>
                  <Card.Title>Delivery Status</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Status:</strong> {order.deliveryStatus || 'Pending'}</ListGroup.Item>
                    <ListGroup.Item><strong>Estimated Delivery Time:</strong> {order.estimatedDeliveryTime || 'Not Available'}</ListGroup.Item>
                    <ListGroup.Item><strong>Delivery Location:</strong> {order.deliveryLocation.address || 'Not Available'}, {order.deliveryLocation.city || 'Not Available'}, {order.deliveryLocation.state || 'Not Available'}, {order.deliveryLocation.postalCode || 'Not Available'}, {order.deliveryLocation.country || 'Not Available'}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))
      ) : (
        <Row>
          <Col>No orders found.</Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderDeliveryPage;
