import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faStickyNote, faLaptop, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import heroImage from '../../hero-image.jpg'; // Import hero image

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold animate-fade-in">CampusMart</h1>
              <h2 className="h3 mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>Your Campus Marketplace</h2>
              <p className="lead mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Buy and sell books, notes, and gadgets with fellow students.
                Save money and help others while making your campus life easier!
              </p>
              <div className="d-flex gap-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button as={Link} to="/marketplace" variant="light" size="lg" className="shadow-lg">
                  Browse Marketplace
                </Button>
                <Button as={Link} to="/sell" variant="outline-light" size="lg">
                  Sell Your Items
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <img
                src={heroImage}
                alt="Students trading items"
                className="img-fluid rounded-3 shadow-lg glass-panel p-2"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Browse Categories</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm hover-card border-0">
                <Card.Body className="text-center py-5">
                  <div className="mb-4 p-3 rounded-circle d-inline-block bg-light">
                    <FontAwesomeIcon icon={faBook} size="3x" className="text-primary" />
                  </div>
                  <Card.Title className="h4">Books</Card.Title>
                  <Card.Text className="text-muted">
                    Find textbooks, novels, and reference materials at student-friendly prices.
                  </Card.Text>
                  <Button as={Link} to="/books" variant="outline-primary" className="mt-3">
                    Browse Books
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm hover-card border-0">
                <Card.Body className="text-center py-5">
                  <div className="mb-4 p-3 rounded-circle d-inline-block bg-light">
                    <FontAwesomeIcon icon={faStickyNote} size="3x" className="text-secondary" />
                  </div>
                  <Card.Title className="h4">Notes & Materials</Card.Title>
                  <Card.Text className="text-muted">
                    Access high-quality notes, guides, and study materials from top students.
                  </Card.Text>
                  <Button as={Link} to="/notes" variant="outline-secondary" className="mt-3">
                    Browse Notes
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm hover-card border-0">
                <Card.Body className="text-center py-5">
                  <div className="mb-4 p-3 rounded-circle d-inline-block bg-light">
                    <FontAwesomeIcon icon={faLaptop} size="3x" className="text-danger" />
                  </div>
                  <Card.Title className="h4">Gadgets</Card.Title>
                  <Card.Text className="text-muted">
                    Buy and sell laptops, calculators, and other tech essentials for your studies.
                  </Card.Text>
                  <Button as={Link} to="/gadgets" variant="outline-danger" className="mt-3">
                    Browse Gadgets
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-white">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="fw-bold">Featured Items</h2>
            <Button as={Link} to="/marketplace" variant="link" className="text-decoration-none fw-bold">
              View All <FontAwesomeIcon icon={faArrowRight} className="ms-1" />
            </Button>
          </div>
          <Row>
            {[1, 2, 3, 4].map((item) => (
              <Col md={3} sm={6} className="mb-4" key={item}>
                <Card className="h-100 shadow-sm product-card border-0">
                  <div className="product-img-container">
                    <Card.Img variant="top" src={`https://placehold.co/600x400?text=Product+${item}`} className="product-img" />
                    <div className="wishlist-btn">
                      <i className="far fa-heart"></i>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title className="product-title">Foundations of Computer Science</Card.Title>
                    <Card.Text className="text-muted small mb-2">CS Department • Condition: Good</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="fw-bold fs-5 text-primary">₹499</span>
                      <Button as={Link} to={`/product/${item}`} variant="primary" size="sm" className="rounded-pill px-3">
                        View
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
          <h2 className="text-center mb-5 fw-bold">What Students Say</h2>
          <Carousel indicators={false} className="testimonial-carousel">
            {[1, 2, 3].map((item) => (
              <Carousel.Item key={item}>
                <Row className="justify-content-center">
                  <Col md={8} lg={6}>
                    <Card className="border-0 shadow-lg text-center p-5 glass-panel">
                      <div className="testimonial-avatar mx-auto mb-4">
                        <img
                          src={`https://placehold.co/100x100?text=User+${item}`}
                          alt={`Student ${item}`}
                          className="rounded-circle shadow"
                          width="80"
                          height="80"
                        />
                      </div>
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <p className="fs-5 fst-italic mb-4">
                            "CampusMart helped me find all my textbooks at half the bookstore price.
                            The platform is so easy to use and I've met great people through it!"
                          </p>
                          <footer className="blockquote-footer mt-3">
                            <span className="fw-bold text-dark">Student Name {item}</span>, <cite title="Source Title">Computer Science</cite>
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
      <section className="py-5 bg-white">
        <Container>
          <h2 className="text-center mb-5 fw-bold">How CampusMart Works</h2>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="text-center p-4">
                <div className="step-circle mb-4 shadow-lg">1</div>
                <h4 className="fw-bold">List Your Items</h4>
                <p className="text-muted">Create an account and list your books, notes, or gadgets for sale in minutes with easy photo upload.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="text-center p-4">
                <div className="step-circle mb-4 shadow-lg">2</div>
                <h4 className="fw-bold">Connect with Buyers</h4>
                <p className="text-muted">Interested students will contact you directly through our secure internal messaging system.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4">
                <div className="step-circle mb-4 shadow-lg">3</div>
                <h4 className="fw-bold">Complete the Sale</h4>
                <p className="text-muted">Meet comfortably on campus to exchange items and payment safely. No shipping hassles!</p>
              </div>
            </Col>
          </Row>
          <div className="text-center mt-5">
            <Button as={Link} to="/register" variant="primary" size="lg" className="px-5 py-3 rounded-pill shadow-lg animate-fade-in">
              Get Started Today
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;