import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useCart } from '../../contexts/CartContext';

const Cart = () => {
  const {
    cartItems,
    cartSummary,
    loading,
    error,
    loadCart,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Container className="py-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Your Cart</h2>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {(!cartItems || cartItems.length === 0) ? (
        <Alert variant="info">Your cart is empty.</Alert>
      ) : (
        <Row>
          <Col md={8}>
            {cartItems.map((item) => (
              <Card className="mb-3" key={item.product?._id || item._id}>
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={6}>
                      <h5 className="mb-1">{item.product?.name || 'Product'}</h5>
                      <div className="text-muted">Quantity: {item.quantity}</div>
                    </Col>
                    <Col md={6} className="text-end">
                      <Button
                        variant="outline-secondary"
                        className="me-2"
                        onClick={() => updateQuantity(item.product?._id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </Button>
                      <Button
                        variant="outline-secondary"
                        className="me-2"
                        onClick={() => updateQuantity(item.product?._id, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => removeFromCart(item.product?._id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>Summary</h5>
                <div className="d-flex justify-content-between">
                  <span>Items</span>
                  <span>{cartSummary.totalItems}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>₹{cartSummary.subtotal}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>₹{cartSummary.shipping}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₹{cartSummary.total}</span>
                </div>
                <Button variant="primary" className="w-100 mt-3">
                  Checkout
                </Button>
                <Button variant="outline-danger" className="w-100 mt-2" onClick={clearCart}>
                  Clear Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;