import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DisplayNotificationByCategory = ({ category }) => {
  const [notifications, setNotifications] = useState([]);

  const getNotificationsUrl = 'http://localhost/StronaZOfertamiPracy/getNotificationByCategory.php';

  useEffect(() => {
    const formData = new URLSearchParams();
    formData.append('not_category', category);

    //nah w tym miejscu mi się odechciało ~w~

    axios
      .post(getNotificationsUrl, formData)
      .then(response => {
        if (response.data.error) {
          console.log('Błąd: Brak danych');
        } else {
          const notificationsData = response.data.notificationData;
          console.log(notificationsData);
          setNotifications(notificationsData);
        }
      })
      .catch(error => {
        console.log('Błąd pobierania danych: ', error);
      });
  }, [category]);

  /*return (
    <>
      <h2>Prace z kategorii: {category}</h2>
      {notifications.length > 0 ? (
        <div>
          {notifications.map(notification => (
            <div key={notification.notification_of_work_id}>
              <h3>{notification.notification_title}</h3>
              <p>{notification.notification_descript}</p>
            </div>
          ))}
        </div>
      ) : (
        //<p>Brak danych do wyświetlenia</p>;

        {notifications.map(notification => (
          <div key={notification.notification_of_work_id}>
            <h3>{notification.notification_title}</h3>
            <p>{notification.notification_descript}</p>
          </div>
        ))}
      )}
    </>
  );*/
};
