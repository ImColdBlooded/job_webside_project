import React, { useEffect, useState } from 'react';
import { useUserContext } from '../ContextApi/userData';
import { Form, Col, Row, Stack, Button, Container, FormGroup } from 'react-bootstrap';
import '../css/UserPage.css';
import { AdminControls } from '../components/AdminControls';
import { DisplayUserProfileData } from '../components/DisplayUserProfileData';
import { EditProfileForm } from '../components/EditProfileForm';

export const UserProfile = () => {
  const { userData, isLogged, loginUser } = useUserContext();
  const [editProfile, setEditProfile] = useState(true);

  function checkAdmin(userData) {
    if (userData === '1') {
      return (
        <Stack gap={2}>
          <AdminControls />
          <br />
        </Stack>
      );
    }
    return 'false';
  }

  function checkVisibility(userData) {
    if (userData === '1') {
      return { visibility: 'visible' };
    }
    return { visibility: 'hidden' };
  }

  const handleChangeUserData = () => {
    setEditProfile(prevEditProfile => !prevEditProfile);
  };

  return (
    <>
      {isLogged ? (
        <>
          <Container>
            {editProfile ? (
              <Container className='userDisplay'>
                <DisplayUserProfileData />
                <Button variant='secondary' onClick={handleChangeUserData}>
                  Change Data
                </Button>
              </Container>
            ) : (
              <Container className='userDisplay'>
                <EditProfileForm />
                <Button variant='secondary' onClick={handleChangeUserData}>
                  Cancel
                </Button>
              </Container>
            )}

            <br />
            <Container className='adminDisplay' style={checkVisibility(userData.isAdmin)}>
              {checkAdmin(userData.isAdmin)}
            </Container>
          </Container>
        </>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </>
  );
};
