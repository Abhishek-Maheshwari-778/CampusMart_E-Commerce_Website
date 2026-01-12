import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="mb-4">
          <Col md={3} sm={6} className="mb-4">
            <h4 className="fw-bold text-primary mb-3">CampusMart</h4>
            <p className="text-light mb-4">
              Your premier campus marketplace — connecting students to buy and sell textbooks, digital notes, and tech gadgets at unbeatable prices.
            </p>
            <div className="social-icons d-flex">
              <a href="https://facebook.com" className="me-3 text-light social-icon-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a href="https://twitter.com" className="me-3 text-light social-icon-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="https://instagram.com" className="me-3 text-light social-icon-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://linkedin.com" className="text-light social-icon-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2"><Link to="/" className="text-light">Home</Link></li>
              <li className="mb-2"><Link to="/marketplace" className="text-light">Marketplace</Link></li>
              <li className="mb-2"><Link to="/books" className="text-light">Books</Link></li>
              <li className="mb-2"><Link to="/notes" className="text-light">Notes</Link></li>
              <li className="mb-2"><Link to="/gadgets" className="text-light">Gadgets</Link></li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5 className="fw-bold mb-3">Support</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2"><Link to="/faq" className="text-light">FAQ</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-light">Contact Us</Link></li>
              <li className="mb-2"><Link to="/privacy" className="text-light">Privacy Policy</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-light">Terms of Service</Link></li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5 className="fw-bold mb-3">Contact</h5>
            <address className="text-light">
              <p><FontAwesomeIcon icon={faEnvelope} className="me-2" /> info@campusmart.com</p>
              <p><FontAwesomeIcon icon={faPhone} className="me-2" /> +91 1234567890</p>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> University Campus, India</p>
            </address>
          </Col>
        </Row>

        <hr className="mt-4 border-secondary" />

        <Row>
          <Col className="text-center py-3">
            <p className="mb-0 text-light">&copy; {new Date().getFullYear()} CampusMart. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;