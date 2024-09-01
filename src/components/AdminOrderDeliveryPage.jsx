import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert } from 'react-bootstrap';

const AdminOrderDeliveryPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/sessions`);
      setOrders(response.data);
    } catch (error) {
      setError('Failed to fetch orders.');
    }
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setDeliveryStatus(order.deliveryStatus || '');
    setEstimatedDeliveryTime(order.estimatedDeliveryTime || '');
    setDeliveryLocation(order.deliveryLocation || {
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    });
  };

  const handleUpdateDelivery = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/sessions/${selectedOrder.sessionId}`, {
        deliveryStatus,
        estimatedDeliveryTime,
        deliveryLocation
      });
      setSuccess('Delivery information updated successfully.');
      fetchOrders(); // Refresh the order list
    } catch (error) {
      setError('Failed to update delivery information.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Row className="mt-4">
        <Col>
          <h1>Admin Order Delivery Management</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Orders</h2>
          {orders.length > 0 ? (
            <ListGroup>
              {orders.map((order) => (
                <ListGroup.Item key={order._id} onClick={() => handleOrderSelect(order)} style={{ cursor: 'pointer' }}>
                  Order ID: {order.sessionId} - Status: {order.deliveryStatus || 'Not Set'}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No orders found.</p>
          )}
        </Col>
        {selectedOrder && (
          <Col>
            <Card>
              <Card.Header>Update Delivery Information</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formDeliveryStatus">
                    <Form.Label>Delivery Status</Form.Label>
                    <Form.Control
                      type="text"
                      value={deliveryStatus}
                      onChange={(e) => setDeliveryStatus(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEstimatedDeliveryTime">
                    <Form.Label>Estimated Delivery Time</Form.Label>
                    <Form.Control
                      type="text"
                      value={estimatedDeliveryTime}
                      onChange={(e) => setEstimatedDeliveryTime(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formDeliveryLocation">
                    <Form.Label>Delivery Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      value={deliveryLocation.address}
                      onChange={(e) => setDeliveryLocation({ ...deliveryLocation, address: e.target.value })}
                    />
                    <Form.Control
                      type="text"
                      placeholder="City"
                      value={deliveryLocation.city}
                      onChange={(e) => setDeliveryLocation({ ...deliveryLocation, city: e.target.value })}
                      className="mt-2"
                    />
                    <Form.Control
                      type="text"
                      placeholder="State"
                      value={deliveryLocation.state}
                      onChange={(e) => setDeliveryLocation({ ...deliveryLocation, state: e.target.value })}
                      className="mt-2"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Postal Code"
                      value={deliveryLocation.postalCode}
                      onChange={(e) => setDeliveryLocation({ ...deliveryLocation, postalCode: e.target.value })}
                      className="mt-2"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Country"
                      value={deliveryLocation.country}
                      onChange={(e) => setDeliveryLocation({ ...deliveryLocation, country: e.target.value })}
                      className="mt-2"
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleUpdateDelivery}>
                    Update Delivery Information
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default AdminOrderDeliveryPage;
