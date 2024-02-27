import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useUserContext } from '../ContextApi/userData';
import '../css/UserPage.css';

export const DisplayUserProfileData = () => {
  const { userData, isLogged, loginUser } = useUserContext();

  useEffect(() => {
    const storeData = localStorage.getItem('UserData');

    if (storeData && !isLogged) {
      loginUser(JSON.parse(storeData));
    }
  }, [isLogged, loginUser, userData.user_id]);
  
  return (
    <Container className='userDisplay'>
      <Row>
        <Col md={6}>
          <h1>
            {userData.name} {userData.surname}
          </h1>
        </Col>

        <Col></Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Email:</strong> {userData.email}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Birth Date:</strong> {userData.birth_date}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Phone Number:</strong> {userData.tel_number}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Residence Place:</strong> {userData.residence_place}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Current Position:</strong> {userData.curr_position}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Current Position Description:</strong> {userData.curr_position_description}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Career Summary:</strong> {userData.career_summary}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Work Experience:</strong> {userData.work_experience}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Education:</strong> {userData.education}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Language Skills:</strong> {userData.language_skills}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Skills:</strong> {userData.skills}
          </span>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <span>
            <strong>Courses:</strong> {userData.courses}
          </span>
        </Col>
      </Row>
    </Container>
  );
};
