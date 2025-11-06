import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faStickyNote, faLaptop, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold">CampusMart</h1>
              <h2 className="h3 mb-4">Your Campus Marketplace</h2>
              <p className="lead mb-4">
                Buy and sell books, notes, and gadgets with fellow students. 
                Save money and help others while making your campus life easier!
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/marketplace" variant="light" size="lg">
                  Browse Marketplace
                </Button>
                <Button as={Link} to="/sell" variant="outline-light" size="lg">
                  Sell Your Items
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0">
              <img 
                src={process.env.PUBLIC_URL ? process.env.PUBLIC_URL + "/hero-image.png" : "/hero-image.png"} 
                alt="Students trading items" 
                className="img-fluid rounded shadow" 
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Browse Categories</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="text-center py-5">
                  <FontAwesomeIcon icon={faBook} size="4x" className="mb-3 text-primary" />
                  <Card.Title>Books</Card.Title>
                  <Card.Text>
                    Find textbooks, novels, and reference materials at student-friendly prices.
                  </Card.Text>
                  <Button as={Link} to="/books" variant="outline-primary">
                    Browse Books
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="text-center py-5">
                  <FontAwesomeIcon icon={faStickyNote} size="4x" className="mb-3 text-success" />
                  <Card.Title>Notes & Study Materials</Card.Title>
                  <Card.Text>
                    Access high-quality notes, guides, and study materials from top students.
                  </Card.Text>
                  <Button as={Link} to="/notes" variant="outline-success">
                    Browse Notes
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="text-center py-5">
                  <FontAwesomeIcon icon={faLaptop} size="4x" className="mb-3 text-danger" />
                  <Card.Title>Gadgets & Electronics</Card.Title>
                  <Card.Text>
                    Buy and sell laptops, calculators, and other tech essentials for your studies.
                  </Card.Text>
                  <Button as={Link} to="/gadgets" variant="outline-danger">
                    Browse Gadgets
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="bg-light py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Featured Items</h2>
            <Button as={Link} to="/marketplace" variant="link">
              View All <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
          <Row>
            {[1, 2, 3, 4].map((item) => (
              <Col md={3} sm={6} className="mb-4" key={item}>
                <Card className="h-100 shadow-sm product-card">
                  <div className="product-img-container">
                    <Card.Img variant="top" src={`/product-${item}.jpg`} className="product-img" />
                  </div>
                  <Card.Body>
                    <Card.Title>Product Name {item}</Card.Title>
                    <Card.Text className="text-muted">Category</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">₹499</span>
                      <Button as={Link} to={`/product/${item}`} variant="primary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">What Students Say</h2>
          <Carousel indicators={false} className="testimonial-carousel">
            {[1, 2, 3].map((item) => (
              <Carousel.Item key={item}>
                <Row className="justify-content-center">
                  <Col md={8} lg={6}>
                    <Card className="border-0 shadow text-center p-4">
                      <div className="testimonial-avatar mx-auto mb-4">
                        <img 
                          src={`/avatar-${item}.jpg`} 
                          alt={`Student ${item}`}
                          className="rounded-circle" 
                          width="80"
                          height="80"
                        />
                      </div>
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <p>
                            "CampusMart helped me find all my textbooks at half the bookstore price. 
                            The platform is so easy to use and I've met great people through it!"
                          </p>
                          <footer className="blockquote-footer mt-3">
                            Student Name {item}, <cite title="Source Title">Computer Science</cite>
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">How CampusMart Works</h2>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="text-center">
                <div className="step-circle mb-3">1</div>
                <h4>List Your Items</h4>
                <p>Create an account and list your books, notes, or gadgets for sale in minutes.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="text-center">
                <div className="step-circle mb-3">2</div>
                <h4>Connect with Buyers</h4>
                <p>Interested students will contact you through our secure messaging system.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div className="step-circle mb-3">3</div>
                <h4>Complete the Sale</h4>
                <p>Meet on campus to exchange items and payment safely.</p>
              </div>
            </Col>
          </Row>
          <div className="text-center mt-5">
            <Button as={Link} to="/register" variant="primary" size="lg">
              Get Started Today
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;