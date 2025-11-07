import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TermsOfService = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col lg={10} className="mx-auto">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">Terms of Service</h2>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <div className="terms-content">
                <section className="mb-4">
                  <h4>1. Acceptance of Terms</h4>
                  <p>
                    By accessing and using CampusMart, you agree to be bound by these Terms of Service. 
                    If you do not agree to these terms, please do not use our platform.
                  </p>
                </section>

                <section className="mb-4">
                  <h4>2. Use of Service</h4>
                  <p>You agree to use CampusMart only for lawful purposes and in accordance with these Terms. You are responsible for all activities that occur under your account.</p>
                </section>

                <section className="mb-4">
                  <h4>3. Buying and Selling</h4>
                  <p>All transactions are between buyers and sellers. CampusMart provides a platform for connection but is not responsible for transaction disputes.</p>
                </section>

                <section className="mb-4">
                  <h4>4. User Content</h4>
                  <p>You retain ownership of content you post, but grant us a license to use, display, and distribute it on our platform.</p>
                </section>

                <section className="mb-4">
                  <h4>5. Limitation of Liability</h4>
                  <p>CampusMart shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>
                </section>

                <section className="mb-4">
                  <h4>6. Contact Us</h4>
                  <p>
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <p>
                    <strong>Email:</strong> legal@campusmart.com<br />
                    <strong>Address:</strong> CampusMart Legal Team, 123 University Ave, College Town, ST 12345
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

export default TermsOfService;