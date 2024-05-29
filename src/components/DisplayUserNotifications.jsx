import React, { useState, useEffect } from 'react';
import { useUserContext } from '../ContextApi/userData';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const DisplayUserNotifications = () => {
  const [userNotifications, setUserNotifications] = useState([]);
  const { userData, isLogged, loginUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.user_id > 0) {
      handleGetNotificationData();
    }
  }, [userData.user_id]);

  const handleGetNotificationData = async () => {
    const getNotData = 'http://localhost/stronaZOfertamiPracy/getNotificationByUserId.php';

    const userId = new FormData();
    userId.append('user_id', userData.user_id);

    try {
      const response = await axios.post(getNotData, userId);

      console.log('seima');
      if (response.data.status === 'success') {
        setUserNotifications(response.data.notificationData);
      } else if (response.data.status === 'error') {
        console.error('Error:' + response.data.message);
      }
    } catch (error) {
      console.error('Error during select notification', error);
    }
  };

  const goTonotificationPage = notificationId => {
    navigate('/notification-page', { state: { notificationId } });
  };

  return (
    <>
      <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
        <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Twoje ogłoszenia</h1>
        <Row>
          <Col>
            {userNotifications.map(data => (
              <Container
                key={data.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}>
                <Row>
                  <h2 style={{ color: '#337ab7', fontSize: '18px', fontWeight: 'bold' }}>{data.notification_title}</h2>
                  <Col style={{ fontSize: '16px', color: '#666' }}>{data.notification_descript}</Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={() => goTonotificationPage(data.notification_of_work_id)}>Przejdz</Button>
                  </Col>
                </Row>
              </Container>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};
