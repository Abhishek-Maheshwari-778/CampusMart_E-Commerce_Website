import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">Contact Us</h2>
            </Card.Header>
            <Card.Body>
              {showAlert && (
                <Alert variant="success" className="mb-4">
                  Thank you for your message! We'll get back to you soon.
                </Alert>
              )}
              
              <Row>
                <Col md={6}>
                  <h4>Get in Touch</h4>
                  <p className="text-muted">
                    Have questions about CampusMart? We're here to help! 
                    Reach out to us using the form or contact information below.
                  </p>
                  
                  <div className="contact-info mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <FontAwesomeIcon icon={faEnvelope} className="text-primary me-3" />
                      <div>
                        <strong>Email</strong><br />
                        <a href="mailto:support@campusmart.com">support@campusmart.com</a>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <FontAwesomeIcon icon={faPhone} className="text-primary me-3" />
                      <div>
                        <strong>Phone</strong><br />
                        <a href="tel:+1234567890">+1 (234) 567-890</a>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary me-3" />
                      <div>
                        <strong>Office</strong><br />
                        CampusMart HQ<br />
                        123 University Ave<br />
                        College Town, ST 12345
                      </div>
                    </div>
                  </div>
                </Col>
                
                <Col md={6}>
                  <h4>Send us a Message</h4>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" className="w-100">
                      Send Message
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;