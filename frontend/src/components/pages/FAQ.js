import React from 'react';
import { Container, Accordion, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const FAQ = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Register' button in the navigation bar, fill in your details including name, email, and password, then click 'Register'. You'll receive a confirmation email to verify your account."
    },
    {
      question: "How can I search for products?",
      answer: "Use the search bar in the navigation menu. You can search by product name, category, or keywords. The search results will show all matching products available in our marketplace."
    },
    {
      question: "How does the cart work?",
      answer: "Add items to your cart by clicking 'Add to Cart' on any product. You can view your cart anytime by clicking the cart icon in the navigation. Adjust quantities, remove items, or proceed to checkout from your cart page."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, PayPal, and other secure payment gateways. All transactions are encrypted and secure."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is confirmed, you'll receive a tracking number via email. You can track your order status in your profile under 'My Orders' section."
    },
    {
      question: "Can I return or exchange items?",
      answer: "Yes, we offer a 30-day return policy for most items. Items must be unused and in original packaging. Contact our customer service to initiate a return or exchange."
    },
    {
      question: "How do I update my profile information?",
      answer: "Log in to your account and navigate to your profile page. You can update your personal information, shipping address, and contact details from there."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your consent."
    },
    {
      question: "What if I forget my password?",
      answer: "Click on 'Forgot Password' on the login page. Enter your registered email address, and we'll send you instructions to reset your password."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team through the Contact Us page, email us at support@marketplace.com, or call our helpline during business hours."
    }
  ];

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="text-center mb-5">
            <FontAwesomeIcon icon={faQuestionCircle} size="3x" className="mb-3 text-primary" />
            <h1>Frequently Asked Questions</h1>
            <p className="text-muted">
              Find answers to common questions about our marketplace
            </p>
          </div>
          
          <Accordion defaultActiveKey="0" className="mb-5">
            {faqs.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  <strong>{faq.question}</strong>
                </Accordion.Header>
                <Accordion.Body>
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          
          <div className="text-center">
            <h5>Still have questions?</h5>
            <p className="text-muted">
              Don't hesitate to contact us through our Contact Us page. 
              We're here to help!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQ;