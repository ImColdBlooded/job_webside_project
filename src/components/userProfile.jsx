import React from 'react';
import { useUserContext } from '../ContextApi/userData';

export const UserProfile = () => {
  const { userData, isLogged } = useUserContext();

  return (
    <>
      {isLogged ? (
        <div>
          <h1>User Profile</h1>
          <p>Email: {userData.email}</p>
          <p>Imię: {userData.imie}</p>
        </div>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </>
  );
};
