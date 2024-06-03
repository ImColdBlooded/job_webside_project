import React, { useEffect, useState } from 'react';
import { useUserContext } from '../ContextApi/userData';
import { Form, Col, Row, Stack, Button, Container, FormGroup } from 'react-bootstrap';
import '../css/UserPage.css';
import { AdminControls } from '../components/AdminControls';
import { NotificationsList } from '../components/NotificationsList';
import { SerwerConnectionsTest } from '../components/SerwerConnectionsTest';

export const AdminPage = () => {
  const { userData, isLogged, loginUser } = useUserContext();
  const [editProfile, setEditProfile] = useState(true);

  return (
    <>
      {isLogged ? (
        <>
          <Container style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px' }}>
            <Row>
              <h2>Administrator: {userData.name}</h2>
            </Row>
            <br></br>
            <Row>
              <SerwerConnectionsTest />
            </Row>
            <br></br>
            <Row>
              <Col>
                <AdminControls />
              </Col>
              <Col>
                <NotificationsList />
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </>
  );
};
