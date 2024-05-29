import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useUserContext } from '../ContextApi/userData';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const DisplayUserAplications = () => {
  const { userData } = useUserContext();
  const navigate = useNavigate();
  const [userApplications, setUserApplications] = useState([]);

  const handleGetApplicationData = async () => {
    const getApplicationsUrl = 'http://localhost/stronaZOfertamiPracy/getUserApplications.php';

    const userId = new FormData();
    userId.append('user_id', userData.user_id);

    try {
      const response = await axios.post(getApplicationsUrl, userId);

      //console.log('seima');
      if (response.data.status === 'success') {
        //console.log('siema');
        setUserApplications(response.data.aplicationsData);
      } else if (response.data.status === 'error') {
        console.error('Error:' + response.data.message);
      }
    } catch (error) {
      console.error('Error during select notification', error);
    }
  };

  useEffect(() => {
    if (userData.user_id > 0) {
      handleGetApplicationData();
    }
  }, [userData.user_id]);

  const goTonotificationPage = notificationId => {
    navigate('/notification-page', { state: { notificationId } });
  };

  return (
    <>
      <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
        <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Twoje aplikacje</h1>
        <Row>
          <Col>
            {userApplications.length > 0 ? (
              <>
                {userApplications.map(data => (
                  <Container
                    key={data.user_aplication_id}
                    style={{
                      border: '1px solid #ddd',
                      padding: '15px',
                      borderRadius: '10px',
                      marginBottom: '20px',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    }}>
                    <Row>
                      <h2 style={{ color: '#337ab7', fontSize: '18px', fontWeight: 'bold' }}>
                        {data.notification_title}
                      </h2>
                      <Col style={{ fontSize: '16px', color: '#666' }}>
                        Data zgłoszenia: <span style={{ fontWeight: 'bold' }}>{data.date}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button onClick={() => goTonotificationPage(data.notification_of_work_id)}>Przejdz</Button>
                      </Col>
                    </Row>
                  </Container>
                ))}
              </>
            ) : (
              <>
                <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>
                  Nie aplikujesz do żadnego ogłoszenia
                </h1>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
