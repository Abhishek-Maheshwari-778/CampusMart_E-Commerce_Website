import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col lg={10} className="mx-auto">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">Privacy Policy</h2>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <div className="privacy-content">
                <section className="mb-4">
                  <h4>1. Information We Collect</h4>
                  <p>
                    We collect information you provide directly to us, such as when you create an account, 
                    list an item for sale, make a purchase, or contact us for support.
                  </p>
                </section>

                <section className="mb-4">
                  <h4>2. How We Use Your Information</h4>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Provide and maintain our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Communicate with you about products and services</li>
                  </ul>
                </section>

                <section className="mb-4">
                  <h4>3. Contact Us</h4>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p>
                    <strong>Email:</strong> privacy@campusmart.com<br />
                    <strong>Address:</strong> CampusMart Privacy Team, 123 University Ave, College Town, ST 12345
                  </p>
                </section>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;