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
  const [newEmail, setNewEmail] = useState(userData.email);
  const [newBirthDate, setNewBirthDate] = useState(userData.birth_date);
  const [newTelNumber, setNewTelNumber] = useState(userData.tel_number);
  const [newResidencePlace, setResidencePlace] = useState(userData.residence_place);
  const [newCurrentPosition, setNewCurrentPosition] = useState(userData.curr_position);
  const [newCurrentPositionDescr, setNewCurrentPositionDescr] = useState(userData.curr_position_description);

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

  const handleSaveChages = () => {};

  const handleChangeName = newName => {
    setNewName(newName);
  };

  const handleChangeSurname = newSurname => {
    setNewSurname(newSurname);
  };

  const handleChangeEmail = newEmail => {
    setNewEmail(newEmail);
  };

  const handleChangeBirthDate = newBirthDate => {
    setNewBirthDate(newBirthDate);
  };

  const handleChangeTelNumber = newTelNumber => {
    setNewTelNumber(newTelNumber);
  };

  const handleChangeResidencePlace = newResidencePlace => {
    setResidencePlace(newResidencePlace);
  };

  const handleChangeCurrentPosition = newCurrentPosition => {
    setNewCurrentPosition(newCurrentPosition);
  };

  const handleChangeCurrentPositionDescr = newCurrentPositionDescr => {
    setNewCurrentPositionDescr(newCurrentPositionDescr);
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
                {editProfile ? (
                  <span>
                    <strong>Email:</strong>
                    <input type='text' value={newEmail} onChange={e => handleChangeEmail(e.target.value)} />
                  </span>
                ) : (
                  <span>
                    <strong>Email:</strong> {userData.email}
                  </span>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {editProfile ? (
                  <span>
                    <strong>Birth Date:</strong>
                    <input type='text' value={newBirthDate} onChange={e => handleChangeBirthDate(e.target.value)} />
                  </span>
                ) : (
                  <span>
                    <strong>Birth Date:</strong> {userData.birth_date}
                  </span>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {editProfile ? (
                  <span>
                    <strong>Phone Number:</strong>
                    <input type='text' value={newTelNumber} onChange={e => handleChangeTelNumber(e.target.value)} />
                  </span>
                ) : (
                  <span>
                    <strong>Phone Number:</strong> {userData.tel_number}
                  </span>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {editProfile ? (
                  <span>
                    <strong>Residence Place:</strong>
                    <input
                      type='text'
                      value={newResidencePlace}
                      onChange={e => handleChangeResidencePlace(e.target.value)}
                    />
                  </span>
                ) : (
                  <span>
                    <strong>Residence Place:</strong> {userData.residence_place}
                  </span>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {editProfile ? (
                  <span>
                    <strong>Current Position:</strong>
                    <input
                      type='text'
                      value={newCurrentPosition}
                      onChange={e => handleChangeCurrentPosition(e.target.value)}
                    />
                  </span>
                ) : (
                  <span>
                    <strong>Current Position:</strong> {userData.curr_position}
                  </span>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {editProfile ? (
                  <span>
                    <strong>Current Position Description:</strong>
                    <br></br>
                    <textarea
                      cols={50}
                      rows={10}
                      value={newCurrentPositionDescr}
                      onChange={e => handleChangeCurrentPositionDescr(e.target.value)}
                    />
                  </span>
                ) : (
                  <span>
                    <strong>Current Position Description:</strong> {userData.curr_position_description}
                  </span>
                )}
              </Col>
            </Row>

            <Row>
              <Stack gap={2} className='col-md-5 mx-auto'>
                {editProfile ? (
                  <>
                    <Button variant='primary' onClick={handleSaveChages}>
                      Save Changes
                    </Button>
                    <Button variant='danger' onClick={() => handleChangeUserData(true)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant='secondary' onClick={() => handleChangeUserData(false)}>
                    Change Data
                  </Button>
                )}
              </Stack>
            </Row>
          </Container>
          <br />
          <Container className='adminDisplay' style={checkVisibility(userData.isAdmin)}>
            {checkAdmin(userData.isAdmin)}
          </Container>
        </Container>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </>
  );
};
