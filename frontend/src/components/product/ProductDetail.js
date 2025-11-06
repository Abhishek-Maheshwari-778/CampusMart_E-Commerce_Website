import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Badge, Tabs, Tab, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faShoppingCart, faUser, faClock, faMapMarkerAlt, faTag, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  
  // Mock product data
  const product = {
    id: productId || 1,
    title: "Data Structures and Algorithms Textbook",
    description: "Comprehensive textbook covering all major data structures and algorithms. Perfect for computer science students. Includes practice problems and solutions. Used for one semester only, in excellent condition with no markings or highlights.",
    price: 450,
    originalPrice: 899,
    condition: "Like New",
    category: "books",
    seller: {
      name: "Abhishek M.",
      rating: 4.8,
      joinedDate: "August 2022",
      id: "seller123"
    },
    location: "Central Library",
    postedDate: "2023-10-15",
    images: ["/product-1.jpg", "/product-1-2.jpg", "/product-1-3.jpg"],
    features: [
      "Author: Thomas H. Cormen",
      "Edition: 3rd Edition",
      "Condition: Like New",
      "ISBN: 9780262033848",
      "Pages: 1312"
    ],
    relatedProducts: [2, 4, 7]
  };
  
  const [mainImage, setMainImage] = useState(product.images[0]);
  
  return (
    <Container className="py-4">
      <Row>
        <Col lg={6} className="mb-4">
          <div className="product-gallery">
            <div className="main-image-container mb-3">
              <img 
                src={mainImage} 
                alt={product.title} 
                className="img-fluid rounded main-product-image" 
              />
            </div>
            <div className="d-flex thumbnail-container">
              {product.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-image-container me-2 ${mainImage === img ? 'active-thumbnail' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${product.title} ${index + 1}`} 
                    className="img-fluid rounded thumbnail-image" 
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
              <span className="current-price me-2">₹{product.price}</span>
              {product.originalPrice && (
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
                      <h6 className="mb-0">{product.seller.name}</h6>
                      <div className="seller-rating text-warning mb-1">
                        {"★".repeat(Math.floor(product.seller.rating))}
                        {"☆".repeat(5 - Math.floor(product.seller.rating))}
                        <span className="text-muted ms-1">({product.seller.rating})</span>
                      </div>
                      <small className="text-muted">
                        <FontAwesomeIcon icon={faClock} className="me-1" />
                        Member since {product.seller.joinedDate}
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
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      style={{ width: '70px' }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="primary" className="w-100 mb-2">
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    Add to Cart
                  </Button>
                  <Button variant="success" className="w-100">
                    Buy Now
                  </Button>
                </Col>
              </Row>
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
          <Tabs defaultActiveKey="description" className="mb-4">
            <Tab eventKey="description" title="Description">
              <Card.Body>
                <p>{product.description}</p>
              </Card.Body>
            </Tab>
            <Tab eventKey="features" title="Features">
              <Card.Body>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Card.Body>
            </Tab>
            <Tab eventKey="seller" title="Seller Information">
              <Card.Body>
                <h5>{product.seller.name}</h5>
                <div className="seller-rating text-warning mb-3">
                  {"★".repeat(Math.floor(product.seller.rating))}
                  {"☆".repeat(5 - Math.floor(product.seller.rating))}
                  <span className="text-muted ms-1">({product.seller.rating})</span>
                </div>
                <p>
                  <strong>Member since:</strong> {product.seller.joinedDate}
                </p>
                <Button variant="outline-primary">
                  Contact Seller
                </Button>
              </Card.Body>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col>
          <h3 className="mb-4">Similar Products</h3>
          <Row>
            {[2, 4, 7].map((productId) => (
              <Col md={4} className="mb-4" key={productId}>
                <Card className="h-100 product-card">
                  <Card.Img variant="top" src={`/product-${productId}.jpg`} />
                  <Card.Body>
                    <Card.Title>Related Product {productId}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">₹399</span>
                      <Button variant="primary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;