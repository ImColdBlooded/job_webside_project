import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const DisplayNotificationByCategory = ({ category }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    //console.log('Aktualizacja stanu notifications:', notifications);
  }, [notifications]);

  const goTonotificationPage = notificationId => {
    navigate('/notification-page', { state: { notificationId } });
  };

  return (
    <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '10px' }}>
      <strong style={{ fontSize: '25px', color: '#337ab7' }}>Najnowsze zlecenia z kategorii: {category}</strong>
      {loading ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>Trwa ładowanie danych...</p>
      ) : notifications.length > 0 ? (
        <Carousel>
          {notifications.map(notification => (
            <Carousel.Item key={notification.notification_title}>
              <Card style={{ width: '100%', border: 'none', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                  <Card.Title>
                    <strong style={{ fontSize: '18px', color: '#333' }}>{notification.notification_title}</strong>
                  </Card.Title>
                  <Card.Text>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      {notification.notification_descript.length > 5
                        ? `${notification.notification_descript.substring(0, 63)}...`
                        : notification.notification_descript}
                    </p>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      Wynagrodzenie: {notification.salary_range_start} zł - {notification.salary_range_end} zł
                    </p>
                    <p style={{ fontSize: '14px', color: '#666' }}>Typ umowy: {notification.contract_type}</p>
                  </Card.Text>

                  <Button
                    variant='primary'
                    onClick={() => goTonotificationPage(notification.notification_of_work_id)}
                    style={{
                      marginLeft: '70%',
                      marginBottom: '5px',
                      backgroundColor: '#337ab7',
                      borderColor: '#337ab7',
                    }}>
                    Przejdź do strony
                  </Button>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p style={{ color: '#666', fontStyle: 'italic' }}>Brak danych do wyświetlenia</p>
      )}
    </div>
  );
};
