import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Card, Button } from 'react-bootstrap';

export const DisplayNotificationByCategory = ({ category }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotificationsUrl = 'http://localhost/StronaZOfertamiPracy/getNotificationByCategory.php';

  useEffect(() => {
    const formData = new URLSearchParams();
    formData.append('not_category', category);

    axios
      .post(getNotificationsUrl, formData)
      .then(response => {
        if (response.data.error) {
          console.log('Błąd: Brak danych');
        } else {
          const notificationsData = response.data.notificationData;
          setNotifications(notificationsData);
        }
      })
      .catch(error => {
        console.log('Błąd pobierania danych: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    console.log('Aktualizacja stanu notifications:', notifications);
  }, [notifications]);

  return (
    <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '10px' }}>
      <strong style={{ fontSize: '25px' }}>Najnowsze zlecenia z kategorii: {category}</strong>
      {loading ? (
        <p>Trwa ładowanie danych...</p>
      ) : notifications.length > 0 ? (
        <Carousel>
          {notifications.map(notification => (
            <Carousel.Item>
              <Card style={{ width: '100%' }}>
                <Card.Body key={notification.notification_of_work_id}>
                  <Card.Title>
                    <strong>{notification.notification_title}</strong>
                  </Card.Title>
                  <Card.Text>
                    {notification.notification_descript.length > 5
                      ? `${notification.notification_descript.substring(0, 63)}...`
                      : notification.notification_descript}
                  </Card.Text>

                  <Button variant='primary'>Przejdz do strony</Button>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>Brak danych do wyświetlenia</p>
      )}
    </div>
  );
};
