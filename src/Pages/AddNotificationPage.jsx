import React from 'react';
import { AddNotification } from '../components/AddNotofication';
import { useUserContext } from '../ContextApi/userData';

export const AddNotificationPage = () => {
  const { userData, isLogged, loginUser } = useUserContext();
  return (
    <>
      <AddNotification />
    </>
  );
};
