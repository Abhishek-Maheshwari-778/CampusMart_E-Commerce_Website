import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductList = ({ category }) => {
  // Mock products data
  const products = [
    {
      id: 1,
      title: "Data Structures and Algorithms Textbook",
      category: "books",
      price: 450,
      condition: "Like New",
      seller: "Abhishek M.",
      image: "/product-1.jpg",
      postedDate: "2023-10-15"
    },
    {
      id: 2,
      title: "Computer Networks Notes",
      category: "notes",
      price: 200,
      condition: "New",
      seller: "Khushi G.",
      image: "/product-2.jpg",
      postedDate: "2023-10-18"
    },
    {
      id: 3,
      title: "Scientific Calculator",
      category: "gadgets",
      price: 800,
      condition: "Good",
      seller: "Govind G.",
      image: "/product-3.jpg",
      postedDate: "2023-10-10"
    },
    {
      id: 4,
      title: "Machine Learning Textbook",
      category: "books",
      price: 550,
      condition: "Like New",
      seller: "Vaishnavi G.",
      image: "/product-4.jpg",
      postedDate: "2023-10-20"
    },
    {
      id: 5,
      title: "Operating Systems Notes",
      category: "notes",
      price: 180,
      condition: "New",
      seller: "Prateek G.",
      image: "/product-5.jpg",
      postedDate: "2023-10-17"
    },
    {
      id: 6,
      title: "Wireless Earbuds",
      category: "gadgets",
      price: 1200,
      condition: "Like New",
      seller: "Abhishek V.",
      image: "/product-6.jpg",
      postedDate: "2023-10-12"
    },
    {
      id: 7,
      title: "Database Management Systems",
      category: "books",
      price: 400,
      condition: "Good",
      seller: "Samina",
      image: "/product-7.jpg",
      postedDate: "2023-10-19"
    },
    {
      id: 8,
      title: "Digital Electronics Notes",
      category: "notes",
      price: 220,
      condition: "New",
      seller: "Rinku C.",
      image: "/product-8.jpg",
      postedDate: "2023-10-16"
    }
  ];

  // Filter products based on category if provided
  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  return (
    <Container className="py-4">
      <h2 className="mb-4">{category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}</h2>

      <Row className="mb-4">
        <Col md={3} className="mb-3 mb-md-0">
          <Card className="filter-sidebar">
            <Card.Header className="bg-primary text-white">
              <FontAwesomeIcon icon={faFilter} className="me-2" />
              Filters
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Price Range</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control type="number" placeholder="Min" min="0" />
                    </Col>
                    <Col>
                      <Form.Control type="number" placeholder="Max" min="0" />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Condition</Form.Label>
                  {['New', 'Like New', 'Good', 'Fair'].map((condition) => (
                    <Form.Check
                      key={condition}
                      type="checkbox"
                      id={`condition-${condition}`}
                      label={condition}
                      className="mb-2"
                    />
                  ))}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Category</Form.Label>
                  {['Books', 'Notes', 'Gadgets'].map((cat) => (
                    <Form.Check
                      key={cat}
                      type="checkbox"
                      id={`category-${cat}`}
                      label={cat}
                      className="mb-2"
                      checked={category === cat.toLowerCase()}
                    />
                  ))}
                </Form.Group>

                <Button variant="primary" className="w-100">
                  Apply Filters
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Row className="mb-3">
            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Search products..."
                  aria-label="Search products"
                />
                <Button variant="outline-secondary">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Form.Select aria-label="Sort by">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </Form.Select>
            </Col>
          </Row>

          <Row>
            {filteredProducts.map((product) => (
              <Col lg={4} md={6} className="mb-4" key={product.id}>
                <Card className="h-100 product-card">
                  <div className="product-img-container">
                    <Card.Img variant="top" src={product.image} className="product-img" />
                    <Button
                      variant="light"
                      size="sm"
                      className="wishlist-btn"
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </Button>
                  </div>
                  <Card.Body>
                    <Card.Title as={Link} to={`/product/${product.id}`} className="product-title">
                      {product.title}
                    </Card.Title>
                    <div className="mb-2">
                      <span className="badge bg-secondary me-2">{product.category}</span>
                      <span className="badge bg-info">{product.condition}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold price">₹{product.price}</span>
                      <small className="text-muted">Posted by {product.seller}</small>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between bg-white">
                    <Button
                      as={Link}
                      to={`/product/${product.id}`}
                      variant="primary"
                      size="sm"
                    >
                      View Details
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      Add to Cart
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Button variant="outline-primary" className="me-2">Previous</Button>
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "primary" : "outline-primary"}
                className="me-2"
              >
                {page}
              </Button>
            ))}
            <Button variant="outline-primary">Next</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;