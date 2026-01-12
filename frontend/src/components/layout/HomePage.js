import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faStickyNote, faLaptop, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import heroImage from '../../hero-image.jpg'; // Removed local import

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
                The premium platform for students to buy and sell textbooks, notes, and gadgets.
                Save money, reduce waste, and connect with your campus community.
              </p>
              <div className="d-flex gap-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button as={Link} to="/marketplace" variant="light" size="lg" className="shadow-lg text-primary fw-bold">
                  Start Trading
                </Button>
                <Button as={Link} to="/sell" variant="outline-light" size="lg">
                  List Item
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
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
          <h2 className="text-center mb-5 fw-bold text-dark">Browse Categories</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm hover-card border-0">
                <Card.Body className="text-center py-5">
                  <div className="mb-4 p-3 rounded-circle d-inline-block bg-indigo-100 text-primary">
                    <FontAwesomeIcon icon={faBook} size="3x" />
                  </div>
                  <Card.Title className="h4">Textbooks</Card.Title>
                  <Card.Text className="text-muted">
                    Save up to 80% on course materials. Buy from seniors who passed with A's.
                  </Card.Text>
                  <Button as={Link} to="/books" variant="outline-primary" className="mt-3 rounded-pill">
                    Browse Books
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm hover-card border-0">
                <Card.Body className="text-center py-5">
                  <div className="mb-4 p-3 rounded-circle d-inline-block bg-pink-100 text-secondary">
                    <FontAwesomeIcon icon={faStickyNote} size="3x" />
                  </div>
                  <Card.Title className="h4">Class Notes</Card.Title>
                  <Card.Text className="text-muted">
                    Access handwritten notes and study guides tailored to your specific courses.
                  </Card.Text>
                  <Button as={Link} to="/notes" variant="outline-secondary" className="mt-3 rounded-pill">
                    Browse Notes
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm hover-card border-0">
                <Card.Body className="text-center py-5">
                  <div className="mb-4 p-3 rounded-circle d-inline-block bg-violet-100 text-danger">
                    <FontAwesomeIcon icon={faLaptop} size="3x" />
                  </div>
                  <Card.Title className="h4">Electronics</Card.Title>
                  <Card.Text className="text-muted">
                    Laptops, calculators, and accessories at student-friendly prices.
                  </Card.Text>
                  <Button as={Link} to="/gadgets" variant="outline-danger" className="mt-3 rounded-pill">
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
            <h2 className="fw-bold text-dark">Featured Listings</h2>
            <Button as={Link} to="/marketplace" variant="link" className="text-decoration-none fw-bold text-primary">
              View All <FontAwesomeIcon icon={faArrowRight} className="ms-1" />
            </Button>
          </div>
          <Row>
            {[
              { id: 1, title: 'Introduction to Algorithms', price: '₹400', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80', cat: 'Books' },
              { id: 2, title: 'MacBook Air M1 (Used)', price: '₹45,000', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=600&q=80', cat: 'Electronics' },
              { id: 3, title: 'Engineering Mathematics Notes', price: '₹50', img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80', cat: 'Notes' },
              { id: 4, title: 'Scientific Calculator fx-991ES', price: '₹500', img: 'https://images.unsplash.com/photo-1574607383476-f517b260d35b?auto=format&fit=crop&w=600&q=80', cat: 'Gadgets' }
            ].map((item) => (
              <Col md={3} sm={6} className="mb-4" key={item.id}>
                <Card className="h-100 shadow-sm product-card border-0">
                  <div className="product-img-container">
                    <Card.Img variant="top" src={item.img} className="product-img" />
                    <div className="wishlist-btn">
                      <i className="far fa-heart"></i>
                    </div>
                  </div>
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>{item.cat}</small>
                      <small className="text-success fw-bold">In Stock</small>
                    </div>
                    <Card.Title className="product-title">{item.title}</Card.Title>
                    <Card.Text className="text-muted small mb-2">Verified Seller • Good Cond.</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="fw-bold fs-5 text-primary">{item.price}</span>
                      <Button as={Link} to={`/product/${item.id}`} variant="primary" size="sm" className="rounded-pill px-3">
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
          <h2 className="text-center mb-5 fw-bold text-dark">Community Trust</h2>
          <Carousel indicators={false} className="testimonial-carousel">
            {[
              { id: 1, name: 'Rahul Sharma', role: 'Computer Science', msg: "I saved over ₹2000 on my first semester books! The quality was exactly as described.", img: 'https://i.pravatar.cc/150?u=rahul' },
              { id: 2, name: 'Priya Patel', role: 'Economics', msg: "Sold my old calculator in 2 days. The platform is super safe because we just meet on campus.", img: 'https://i.pravatar.cc/150?u=priya' },
              { id: 3, name: 'Amit Singh', role: 'Engineering', msg: "Found amazing hand-written notes for Mechanics. Helped me clear the exam!", img: 'https://i.pravatar.cc/150?u=amit' }
            ].map((item) => (
              <Carousel.Item key={item.id}>
                <Row className="justify-content-center">
                  <Col md={8} lg={6}>
                    <Card className="border-0 shadow-lg text-center p-5 glass-panel">
                      <div className="testimonial-avatar mx-auto mb-4">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="rounded-circle shadow"
                          width="80"
                          height="80"
                        />
                      </div>
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <p className="fs-5 fst-italic mb-4 text-muted">
                            "{item.msg}"
                          </p>
                          <footer className="blockquote-footer mt-3">
                            <span className="fw-bold text-dark">{item.name}</span>, <cite title="Source Title" className="text-primary">{item.role}</cite>
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