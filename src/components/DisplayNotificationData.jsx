import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../ContextApi/userData';
import { Form, Button, Container, Row, Col, Accordion, Alert, Card, Table } from 'react-bootstrap';

export const DisplayNotificationData = ({ data }) => {
  const { userData, isLogged, loginUser } = useUserContext();
  const [notificationId, setNotificationId] = useState(data);
  const [infoAlert, setInfoAlert] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [buttonInformation, setButtonInformation] = useState({ message: '', state: true });
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleChechApplicationVisibility = (userData, fetchedUserData) => {
    if (userData === fetchedUserData) {
      return false;
    } else {
      return true;
    }
  };

  const JobHeader = ({ children }) => {
    return <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>{children}</div>;
  };

  const JobDetails = ({ children }) => {
    return <div style={{ padding: '10px' }}>{children}</div>;
  };

  const JobRequirements = ({ children }) => {
    return <div style={{ padding: '10px' }}>{children}</div>;
  };

  const JobActions = ({ children }) => {
    return <div style={{ padding: '10px' }}>{children}</div>;
  };

  const handleAddToYourApplications = async () => {
    const addAplicationUrl = 'http://localhost/stronaZOfertamiPracy/addAplication.php';

    const aplicationData = new FormData();
    aplicationData.append('not_id', notificationId);
    aplicationData.append('user_id', userData.user_id);

    try {
      const response = await axios.post(addAplicationUrl, aplicationData);

      if (response.data.status === 'success') {
        setButtonInformation({ message: response.data.status, state: false });
        //console.log('Success');
      } else if (response.data.status === 'error') {
        console.error('Error:' + response.data.message);
      }
    } catch (error) {
      console.error('Error during adding application', error);
    }
    setButtonClicked(true);
  };

  const handleDeleteFromYourApplications = async () => {
    const deleteApplicationUrl = 'http://localhost/stronaZOfertamiPracy/deleteApplication.php';

    const deleteAplicationData = new FormData();
    deleteAplicationData.append('not_id', notificationId);
    deleteAplicationData.append('user_id', userData.user_id);

    try {
      const response = await axios.post(deleteApplicationUrl, deleteAplicationData);
      //console.log('Response:', response.data.status);

      if (response.data.status === 'ApplicationAlreadyDeleted') {
        //console.log('Setting button information');
        setButtonInformation({ message: response.data.message, state: true });
      } else {
        setButtonInformation({ message: '', state: false });
        //console.log('Error status:', response.data.UserNotApplies);
      }
    } catch (error) {
      console.error('Error during adding application', error);
    }
  };

  useEffect(() => {
    if (notificationId > 0) {
      handleGetNotificationData();
    } else {
      setInfoAlert(true);
    }
  }, [notificationId]);

  useEffect(() => {
    if (userData && userData.user_id) {
      checkUserApplication();
    }
  }, [userData, buttonClicked]);

  const checkUserApplication = async () => {
    const checkAplicationUrl = 'http://localhost/stronaZOfertamiPracy/checkApplication.php';

    const checkAplicationData = new FormData();
    checkAplicationData.append('not_id', notificationId);
    checkAplicationData.append('user_id', userData.user_id);

    try {
      const response = await axios.post(checkAplicationUrl, checkAplicationData);
      console.log('Response:', response.data.status);

      if (response.data.status === 'UserAlreadyApplies') {
        console.log('Setting button information');
        setButtonInformation({ message: response.data.message, state: false });
      } else {
        setButtonInformation({ message: '', state: true });
        //console.log('Error status:', response.data.UserNotApplies);
      }
    } catch (error) {
      console.error('Error during adding application', error);
    }
  };

  const handleGetNotificationData = async () => {
    const getNotData = 'http://localhost/stronaZOfertamiPracy/getNotificationDataById.php';

    const notId = new FormData();
    notId.append('not_id', notificationId);

    try {
      const response = await axios.post(getNotData, notId);

      if (response.data.status === 'success') {
        setSelectedData(response.data.not_data);
        //  console.log(JSON.stringify(response.data.not_data));
      } else if (response.data.status === 'error') {
        console.error('Error:' + response.data.message);
      }
    } catch (error) {
      console.error('Error during select notification', error);
    }
  };

  return (
    <>
      {selectedData.length > 0 ? (
        <div>
          {selectedData.map(data => (
            <Container
              key={data.notification_of_work_id}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
              }}>
              <JobHeader>
                <h1 style={{ marginBottom: '20px', color: '#333' }}>{data.notification_title}</h1>
                <p style={{ fontSize: '16px', color: '#666' }}>
                  <strong style={{ color: '#333' }}>Opis:</strong> {data.notification_descript}
                </p>
              </JobHeader>

              <JobDetails>
                <Row>
                  <Col xs={6}>
                    <p style={{ fontSize: '16px', color: '#666' }}>
                      <strong style={{ color: '#333' }}>Pozycja:</strong> {data.work_position} <br />
                      <strong style={{ color: '#333' }}>Poziom pracy:</strong> {data.job_level} <br />
                      <strong style={{ color: '#333' }}>Typ kontraktu:</strong> {data.contract_type} <br />
                    </p>
                  </Col>
                  <Col xs={6}>
                    <p style={{ fontSize: '16px', color: '#666' }}>
                      <strong style={{ color: '#333' }}>Dni pracy:</strong> {data.working_days} <br />
                      <strong style={{ color: '#333' }}>Godziny pracy:</strong> {data.working_hours_start} -{' '}
                      {data.working_hours_end}
                      <br />
                      <strong style={{ color: '#333' }}>Odpowiedzialności:</strong> {data.responsibilities} <br />
                      <strong style={{ color: '#333' }}>Wynagrodzenie:</strong> {data.salary_range_start} zł -{' '}
                      {data.salary_range_end} zł <br />
                      <strong style={{ color: '#333' }}>Data ważności:</strong> {data.date_of_expiry_start} -{' '}
                      {data.date_of_expiry_end} <br />
                    </p>
                  </Col>
                </Row>
              </JobDetails>

              <JobRequirements>
                <p>
                  <strong style={{ color: '#333' }}>Wymagania dla kandydata:</strong> {data.candidate_requirements}
                  <br />
                  <strong style={{ color: '#333' }}>Co oferuje pracodawca:</strong> {data.employer_offers} <br />
                </p>
              </JobRequirements>

              <JobActions>
                <Col>
                  {handleChechApplicationVisibility(data.user_id, userData.user_id) ? (
                    <></>
                  ) : (
                    <>
                      {buttonInformation.state ? (
                        <Button className='primary' onClick={handleAddToYourApplications}>
                          Aplikuj
                        </Button>
                      ) : (
                        <>
                          <Button className='primary' onClick={handleDeleteFromYourApplications}>
                            Zakończ aplikację
                          </Button>
                        </>
                      )}

                      <Button className='primary'>Dodaj do ulubionych</Button>
                    </>
                  )}
                </Col>
              </JobActions>
            </Container>
          ))}
        </div>
      ) : (
        <>
          <h1>Brak danych</h1>
        </>
      )}
    </>
  );
};
