import React, { useEffect } from 'react';
import { useUserContext } from '../ContextApi/userData';
import { Form, Col, Row, Stack, Button, Container } from 'react-bootstrap';
import '../css/UserPage.css';

export const UserProfile = () => {
  const { userData, isLogged, loginUser } = useUserContext();

  useEffect(() => {
    const storeData = localStorage.getItem('UserData');

    if (storeData && !isLogged) {
      loginUser(JSON.parse(storeData));
    }
  }, [loginUser]);

  function checkAdmin(userData) {
    if (userData == '1') {
      return <span>Admin</span>;
    } else {
      return <span>No admin</span>;
    }
  }

  return (
    <>
      {isLogged ? (
        <Container className='userDisplay'>
          <p> Twoje dane:</p>
          <Row>
            <Col md={6}>
              <strong>Imie:</strong> {userData.name}
            </Col>
          </Row>

          <Row>
            <Col>
              <strong>Nazwisko:</strong> {userData.surname}
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <strong>Email:</strong> {userData.email}
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <strong>Birth Date:</strong> {userData.birth_date}
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <strong>Birth Date:</strong> {userData.tel_number}
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <strong>Birth Date:</strong> {userData.residence_place}
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <strong>Birth Date:</strong> {userData.curr_position}
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <strong>Birth Date:</strong> {userData.curr_position_description}
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <strong>Admin permission:</strong> {checkAdmin(userData.isAdmin)}
            </Col>
          </Row>
          <Row>
            <Stack gap={2} className='col-md-5 mx-auto'>
              <Button variant='secondary'>Change Data</Button>
              <Button variant='secondary'>Change Password</Button>
            </Stack>
          </Row>
        </Container>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </>
  );
};
