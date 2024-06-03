import React, { useEffect, useState } from 'react';
import { useUserContext } from '../ContextApi/userData';
import { Form, Col, Row, Stack, Button, Container, FormGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export const NotificationsList = () => {
  const { userData, isLogged, loginUser } = useUserContext();
  const [notificationData, setNotificationData] = useState([]);

  const getAllNotifications = async () => {
    //e.preventDefault();

    const updateUserUrl = 'http://localhost/StronaZOfertamiPracy/getAllNotifications.php';

    try {
      const response = await axios.post(updateUserUrl);

      if (response.data.status === 'success') {
        setNotificationData(response.data.not_data);

        console.log(notificationData);

        //console.log('succa');
      } else if (response.data.error) {
        console.log(response.data.error);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  const handleDeleteNotification = not_id => {
    const deleteUserUrl = `http://localhost/StronaZOfertamiPracy/deleteNotification.php?not_id=${not_id}`;

    fetch(deleteUserUrl, {
      method: 'DELETE',
    }) // wysyłanie pod podany link żądania delete
      .then(response => response.json()) // przetwoezenie do formatu .json
      .then(data => {
        if (data.success) {
          setNotificationData(prevNot => prevNot.filter(prevNot => prevNot.notification_of_work_id !== not_id));
          console.log('Użytkownik został pomyślnie usunięty.');
        } else {
          console.error('Błąd podczas usuwania użytkownika:', data.error);
        }
      })
      .catch(error => console.error('Błąd sieci:', error));
  };

  return (
    <>
      <Container>
        <ListGroup>
          <h3>Ogłoszenia ({notificationData.length})</h3>

          {notificationData.map(notificationData => (
            <ListGroup.Item key={notificationData.notification_of_work_id}>
              <Row>
                <Col>
                  <p>
                    {notificationData.notification_of_work_id}. {`Tytuł: ${notificationData.notification_title}`}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col>
                  {' '}
                  <Button
                    variant='danger'
                    onClick={() => handleDeleteNotification(notificationData.notification_of_work_id)}>
                    Usuń ogłoszenie
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};
