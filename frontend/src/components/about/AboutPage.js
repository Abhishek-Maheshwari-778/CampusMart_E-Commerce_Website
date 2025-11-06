import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Abhishek Maheshwari",
      role: "Team Leader",
      image: "/team/abhishek-m.jpg",
    },
    {
      name: "Abhishek Verma",
      role: "Developer",
      image: "/team/abhishek-v.jpg",
    },
    {
      name: "Govind Gupta",
      role: "Developer",
      image: "/team/govind.jpg",
    },
    {
      name: "Khushi Gupta",
      role: "Developer",
      image: "/team/khushi.jpg",
    },
    {
      name: "Prateek Gupta",
      role: "Developer",
      image: "/team/prateek.jpg",
    },
    {
      name: "Vaishnavi Gupta",
      role: "Developer",
      image: "/team/vaishnavi.jpg",
    },
    {
      name: "Samina",
      role: "Developer",
      image: "/team/samina.jpg",
    },
    {
      name: "Rinku Chaudhary",
      role: "Developer",
      image: "/team/rinku.jpg",
    },
    {
      name: "Soni",
      role: "Developer",
      image: "/team/soni.jpg",
    },
    {
      name: "Palak Yadav",
      role: "Developer",
      image: "/team/palak.jpg",
    }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">About CampusMart</h1>
            <p className="lead mb-4">
              CampusMart is a student marketplace designed to help students buy and sell books, notes, and gadgets within the campus community.
            </p>
            <p className="mb-5">
              Our platform aims to make campus life easier by providing a convenient way for students to find affordable educational resources and connect with fellow students.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Our Mission</h2>
          <div className="d-flex justify-content-center">
            <div className="w-75">
              <p className="text-center">
                CampusMart's mission is to create a sustainable and affordable marketplace for students to exchange educational resources, reduce waste, and build community connections. We believe in making education more accessible by providing a platform where students can find affordable books, quality notes, and essential gadgets for their academic journey.
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Our Mentor</h2>
          <div className="d-flex justify-content-center">
            <Card className="border-0 shadow-sm" style={{ maxWidth: '400px' }}>
              <Card.Body className="text-center p-4">
                <div className="mentor-image mb-3">
                  <img 
                    src="/team/salman-sir.jpg" 
                    alt="Salman Sir" 
                    className="rounded-circle"
                    width="150"
                    height="150"
                  />
                </div>
                <h3 className="mb-1">Salman Sir</h3>
                <p className="text-muted mb-3">Teacher / Mentor</p>
                <p>
                  Our respected mentor who guided us throughout the development of CampusMart with his expertise and valuable insights.
                </p>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="text-center mb-5">Our Team</h2>
          <Row>
            {teamMembers.map((member, index) => (
              <Col lg={3} md={4} sm={6} className="mb-4" key={index}>
                <Card className="team-card h-100 border-0 shadow-sm">
                  <div className="text-center p-3">
                    <div className="team-member-image mb-3">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="rounded-circle"
                        width="120"
                        height="120"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/120?text=" + member.name.charAt(0);
                        }}
                      />
                    </div>
                    <Card.Body className="p-0">
                      <h5 className="mb-1">{member.name}</h5>
                      <p className="text-muted mb-3">{member.role}</p>
                      <div className="social-links">
                        <a href="#" className="me-2 text-secondary">
                          <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="#" className="text-secondary">
                          <FontAwesomeIcon icon={faGithub} />
                        </a>
                      </div>
                    </Card.Body>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;