import React from 'react';
import { DisplayNotificationData } from '../components/DisplayNotificationData';
import { useLocation } from 'react-router-dom';

export const NotificationPage = () => {
  const location = useLocation();
  const { notificationId } = location.state || {};
  return (
    <>
      <DisplayNotificationData data={notificationId} />
    </>
  );
};
