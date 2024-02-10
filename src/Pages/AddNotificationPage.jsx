import React from 'react';
import { AddNotification } from '../components/AddNotofication';
import { useUserContext } from '../ContextApi/userData';
import { Alert } from 'react-bootstrap';

export const AddNotificationPage = () => {
  const { userData, isLogged, loginUser } = useUserContext();
  return (
    <>
      <h1>Add a Notification</h1>
      <AddNotification />
    </>
  );
};
