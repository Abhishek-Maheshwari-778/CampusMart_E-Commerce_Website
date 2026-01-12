import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge, Tabs, Tab, Form, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faShoppingCart, faUser, faClock, faMapMarkerAlt, faTag, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import './ProductDetail.css';
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      // Find variant that matches selected options
      const variant = product.variants.find(v => {
        return Object.entries(selectedOptions).every(([key, value]) =>
          v.options.get(key) === value
        );
      });
      setSelectedVariant(variant);
    }
  }, [selectedOptions, product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      setMainImage(response.data.images?.[0] || '/placeholder-product.jpg');
      setError('');
    } catch (err) {
      setError('Failed to load product details. Please try again.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Validate required options are selected
    if (product.options && Object.keys(product.options).length > 0) {
      const requiredOptions = Object.keys(product.options);
      for (let option of requiredOptions) {
        if (!selectedOptions[option]) {
          setCartMessage(`Please select ${option}`);
          return;
        }
      }
    }

    try {
      setAddingToCart(true);
      const cartData = {
        productId: product._id,
        quantity: quantity,
        options: selectedOptions,
        variantId: selectedVariant?._id
      };
      await addToCart(product._id, quantity, cartData);
      setCartMessage('Product added to cart successfully!');
      setTimeout(() => setCartMessage(''), 3000);
    } catch (err) {
      setCartMessage('Failed to add to cart. Please try again.');
      setTimeout(() => setCartMessage(''), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading product details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          {error}
          <Button variant="outline-primary" className="ms-3" onClick={fetchProduct}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-4">
        <Alert variant="info">Product not found.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4 product-detail-container">
      {cartMessage && (
        <Alert
          variant={cartMessage.includes('successfully') ? 'success' : 'danger'}
          dismissible
          onClose={() => setCartMessage('')}
        >
          {cartMessage}
        </Alert>
      )}

      <Row>
        <Col lg={6} className="mb-4">
          <div className="product-gallery">
            <div className="main-image-container mb-3">
              <img
                src={mainImage}
                alt={product.title}
                className="img-fluid rounded main-product-image"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
            <div className="d-flex thumbnail-container">
              {product.images?.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail-image-container me-2 ${mainImage === img ? 'active-thumbnail' : ''}`}
                  onClick={() => setMainImage(img)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="img-fluid rounded thumbnail-image"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col lg={6}>
          <div className="product-info">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Badge bg="secondary" className="category-badge">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
              <div>
                <Button variant="outline-secondary" size="sm" className="me-2">
                  <FontAwesomeIcon icon={faHeart} /> Save
                </Button>
                <Button variant="outline-secondary" size="sm">
                  <FontAwesomeIcon icon={faShare} /> Share
                </Button>
              </div>
            </div>

            <h2 className="product-title mb-3">{product.title}</h2>

            <div className="pricing mb-3">
              <span className="current-price me-2" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#28a745' }}>
                ₹{selectedVariant ? selectedVariant.price : product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && !selectedVariant && (
                <>
                  <span className="original-price text-muted text-decoration-line-through me-2">
                    ₹{product.originalPrice}
                  </span>
                  <span className="discount-percentage text-success">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            {/* Product Options */}
            {product.options && Object.keys(product.options).length > 0 && (
              <div className="product-options mb-4">
                <h6>Select Options:</h6>
                {Object.entries(product.options).map(([optionName, optionValues]) => (
                  <div key={optionName} className="option-group mb-3">
                    <label className="option-label fw-bold mb-2">{optionName}:</label>
                    <div className="option-values">
                      {optionValues.map((value) => (
                        <Button
                          key={value}
                          variant={selectedOptions[optionName] === value ? "primary" : "outline-secondary"}
                          size="sm"
                          className="me-2 mb-2"
                          onClick={() => setSelectedOptions(prev => ({
                            ...prev,
                            [optionName]: value
                          }))}
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Variant Selection */}
            {product.variants && product.variants.length > 0 && selectedOptions && Object.keys(selectedOptions).length > 0 && (
              <div className="variant-info mb-3">
                {selectedVariant ? (
                  <div className="selected-variant">
                    <Badge bg="success">Selected: {selectedVariant.name}</Badge>
                    {selectedVariant.stock <= 5 && (
                      <Badge bg="warning" text="dark" className="ms-2">
                        Only {selectedVariant.stock} left
                      </Badge>
                    )}
                  </div>
                ) : (
                  <Badge bg="warning">Please select all options to see available variants</Badge>
                )}
              </div>
            )}

            <div className="condition mb-3">
              <Badge bg={
                product.condition === "New" ? "success" :
                  product.condition === "Like New" ? "info" :
                    product.condition === "Good" ? "primary" :
                      "warning"
              }>
                {product.condition}
              </Badge>
            </div>

            <div className="seller-info mb-4">
              <Card className="border-0 bg-light">
                <Card.Body className="py-3">
                  <div className="d-flex align-items-center">
                    <div className="seller-avatar me-3">
                      <FontAwesomeIcon icon={faUser} size="2x" />
                    </div>
                    <div>
                      <h6 className="mb-0">{product.seller?.name || 'CampusMart Seller'}</h6>
                      {product.seller?.rating && (
                        <div className="seller-rating text-warning mb-1">
                          {"★".repeat(Math.floor(product.seller.rating))}
                          {"☆".repeat(5 - Math.floor(product.seller.rating))}
                          <span className="text-muted ms-1">({product.seller.rating})</span>
                        </div>
                      )}
                      <small className="text-muted">
                        <FontAwesomeIcon icon={faClock} className="me-1" />
                        Posted on {new Date(product.createdAt || product.postedDate).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="product-meta mb-4">
              <div className="d-flex mb-2">
                <div className="meta-icon me-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <strong>Location:</strong> {product.location}
                </div>
              </div>
              <div className="d-flex mb-2">
                <div className="meta-icon me-2">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <strong>Posted:</strong> {new Date(product.postedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="d-flex">
                <div className="meta-icon me-2">
                  <FontAwesomeIcon icon={faTag} />
                </div>
                <div>
                  <strong>Product ID:</strong> #{product.id}
                </div>
              </div>
            </div>

            <div className="purchase-options mb-4">
              <Row className="align-items-center">
                <Col xs="auto">
                  <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max={product.stock || 10}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{ width: '70px' }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    className="w-100 mb-2 btn-cart"
                    onClick={handleAddToCart}
                    disabled={addingToCart || product.stock === 0}
                  >
                    {addingToCart ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Adding...
                      </>
                    ) : product.stock === 0 ? (
                      'Out of Stock'
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button variant="success" className="w-100 btn-buy" disabled={product.stock === 0}>
                    Buy Now
                  </Button>
                </Col>
              </Row>
              {product.stock > 0 && product.stock <= 5 && (
                <p className="text-warning mt-2 mb-0">
                  <small>Only {product.stock} left in stock!</small>
                </p>
              )}
            </div>

            <div className="secure-transaction">
              <div className="d-flex align-items-center text-success mb-2">
                <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                <span>Secure transaction through CampusMart</span>
              </div>
              <p className="text-muted small">
                CampusMart ensures safe transactions between buyers and sellers.
                Meet on campus in public places for exchanges.
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Tabs defaultActiveKey="description" className="mb-4 product-tabs">
            <Tab eventKey="description" title="Description">
              <Card.Body>
                <p>{product.description}</p>
                {product.features && product.features.length > 0 && (
                  <div className="mt-4">
                    <h6>Key Features:</h6>
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Tab>
            <Tab eventKey="specifications" title="Specifications">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Condition:</strong> {product.condition}</p>
                    <p><strong>Brand:</strong> {product.brand || 'Not specified'}</p>
                    <p><strong>Model:</strong> {product.model || 'Not specified'}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Location:</strong> {product.location}</p>
                    <p><strong>Posted:</strong> {new Date(product.createdAt || product.postedDate).toLocaleDateString()}</p>
                    <p><strong>Stock:</strong> {product.stock || 0} available</p>
                    <p><strong>Product ID:</strong> #{product._id || product.id}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Tab>
            <Tab eventKey="seller" title="Seller Information">
              <Card.Body>
                <h5>{product.seller?.name || 'CampusMart Seller'}</h5>
                {product.seller?.rating && (
                  <div className="seller-rating text-warning mb-3">
                    {"★".repeat(Math.floor(product.seller.rating))}
                    {"☆".repeat(5 - Math.floor(product.seller.rating))}
                    <span className="text-muted ms-1">({product.seller.rating})</span>
                  </div>
                )}
                <p>
                  <strong>Contact:</strong> Safe and secure through CampusMart
                </p>
                <Button variant="outline-primary">
                  Contact Seller
                </Button>
              </Card.Body>
            </Tab>
          </Tabs>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h4>Similar Products</h4>
          <div className="similar-products">
            <Card className="similar-product-card">
              <Card.Img variant="top" src="https://via.placeholder.com/150x150?text=Similar+Product" />
              <Card.Body>
                <Card.Title>Similar Product 1</Card.Title>
                <Card.Text>$99.99</Card.Text>
              </Card.Body>
            </Card>
            <Card className="similar-product-card">
              <Card.Img variant="top" src="https://via.placeholder.com/150x150?text=Similar+Product" />
              <Card.Body>
                <Card.Title>Similar Product 2</Card.Title>
                <Card.Text>$79.99</Card.Text>
              </Card.Body>
            </Card>
            <Card className="similar-product-card">
              <Card.Img variant="top" src="https://via.placeholder.com/150x150?text=Similar+Product" />
              <Card.Body>
                <Card.Title>Similar Product 3</Card.Title>
                <Card.Text>$89.99</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;