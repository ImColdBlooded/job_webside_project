import React, { useEffect, useState } from 'react';
import { useUserContext } from '../ContextApi/userData';
import { Form, Col, Row, Stack, Button, Container } from 'react-bootstrap';
import '../css/UserPage.css';
import { AdminControls } from '../components/AdminControls';

export const UserProfile = () => {
  const { userData, isLogged, loginUser } = useUserContext();
  const [editProfile, setEditProfile] = useState(false);

  //dane
  const [newName, setNewName] = useState(userData.name);
  const [newSurname, setNewSurname] = useState(userData.surname);

  useEffect(() => {
    const storeData = localStorage.getItem('UserData');

    if (storeData && !isLogged) {
      loginUser(JSON.parse(storeData));
    }
  }, [false]);

  function checkAdmin(userData) {
    if (userData === '1') {
      return (
        <Stack gap={2}>
          <AdminControls />
          <br />
        </Stack>
      );
    }
    return '';
  }

  const handleChangeUserData = () => {
    setEditProfile(prevEditProfile => !prevEditProfile);
  };

  const handleChangeName = newName => {
    setNewName(newName);
  };

  const handleChangeSurname = newSurname => {
    setNewSurname(newSurname);
  };

  return (
    <>
      {isLogged ? (
        <Container>
          <Container className='userDisplay'>
            <p> Twoje dane</p>
            <Row>
              <Col md={6}>
                {editProfile ? (
                  <span>
                    <strong>Imie:</strong>
                    <input type='text' value={newName} onChange={e => handleChangeName(e.target.value)} />
                  </span>
                ) : (
                  <span>
                    <strong>Imie:</strong> {userData.name}
                  </span>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                {editProfile ? (
                  <span>
                    <strong>Nazwisko:</strong>
                    <input type='text' value={newSurname} onChange={e => handleChangeSurname(e.target.value)} />
                  </span>
                ) : (
                  <span>
                    <strong>Nazwisko:</strong> {userData.surname}
                  </span>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <strong>Email:</strong> {userData.email}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <strong>Birth Date:</strong> {userData.birth_date}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <strong>Phone Number:</strong> {userData.tel_number}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <strong>Residence Place:</strong> {userData.residence_place}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <strong>Current Position:</strong> {userData.curr_position}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <strong>Current Position Description:</strong> {userData.curr_position_description}
              </Col>
            </Row>

            <Row>
              <Stack gap={2} className='col-md-5 mx-auto'>
                <Button variant='secondary' onClick={() => handleChangeUserData(false)}>
                  Change Data
                </Button>
                <Button variant='secondary'>Add Notofication</Button>
              </Stack>
            </Row>
          </Container>
          <br />
          <Container className='adminDisplay'>{checkAdmin(userData.isAdmin)}</Container>
        </Container>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </>
  );
};
