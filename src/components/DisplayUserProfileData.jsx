import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'react-bootstrap';
import { useUserContext } from '../ContextApi/userData';
import '../css/UserPage.css';
import axios from 'axios';

export const DisplayUserProfileData = () => {
  const { userData, isLogged, loginUser } = useUserContext();

  const [userSkills, setUserSkills] = useState([]);
  const [userWorkExp, setUserWorkExp] = useState([]);
  const [userEducation, setUserEducation] = useState([]);

  useEffect(() => {
    const storeData = localStorage.getItem('UserData');

    if (storeData && !isLogged) {
      loginUser(JSON.parse(storeData));
    }
  }, [isLogged, loginUser, userData.user_id]);

  const advacedData_url = 'http://localhost/stronaZOfertamiPracy/getUserAdvancedData.php';

  /*useEffect(() => {
    console.log('Skill: ' + userSkills);
    console.log('Work Exp: ' + userWorkExp);
  }, []);*/

  const sendUserId = async user_id => {
    let UserData = new FormData();
    UserData.append('user_id', user_id);

    try {
      const response = await axios.post(advacedData_url, UserData);

      if (response.data.status === 'success') {
        //console.log(response.data.skill_data);

        //console.log('siema');
        setUserSkills(response.data.skill_data);
        setUserWorkExp(response.data.workExpData);
        setUserEducation(response.data.educationData);
      } else if (response.data.error) {
        console.log('error', response.data.error);
      }
    } catch (error) {
      console.error('Error during fetched:', error);
    }
  };

  useEffect(() => {
    sendUserId(userData.user_id);
  }, []);

  return (
    <Container className='userDisplay'>
      <Row>
        <Card>
          <CardBody>
            <CardTitle>
              <p style={{ width: 'auto' }}>
                <span style={{ fontSize: '40px', fontWeight: 'bold' }}>
                  {userData.name} {userData.surname}
                </span>
                <img
                  src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
                  alt='obraz profilpwy uzytkownka'
                  style={{ float: 'right' }}
                />
              </p>
            </CardTitle>
            <CardText>
              <p>
                <span>
                  <strong>Email:</strong> {userData.email}
                  <br></br>
                  <strong>Phone Number:</strong>
                  {userData.tel_number}
                </span>
              </p>
            </CardText>
          </CardBody>
        </Card>
      </Row>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={6}>
              <Card style={{ border: 'none' }}>
                <CardBody>
                  <CardTitle>
                    <h2>Personal Information</h2>
                  </CardTitle>
                  <CardText>
                    <p>
                      <strong>Birth Date:</strong> {userData.birth_date}
                    </p>
                    <p>
                      <strong>Residence Place:</strong> {userData.residence_place}
                    </p>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{ border: 'none' }}>
                <CardBody>
                  <CardTitle>
                    <h2>Professional Summary</h2>
                  </CardTitle>
                  <CardText>
                    <p>
                      <strong>Current Position:</strong> {userData.curr_position}
                    </p>
                    <p>
                      <strong>Current Position Description:</strong> {userData.curr_position_description}
                    </p>
                    <p>
                      <strong>Career Summary:</strong> {userData.career_summary}
                    </p>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card style={{ border: 'none' }}>
                <CardBody>
                  <CardTitle>
                    <h2>Work Experience</h2>
                  </CardTitle>
                  <CardText>
                    {userWorkExp.length > 0 ? (
                      <ul>
                        {userWorkExp.map(data => (
                          <li key={data.position}>
                            {data.workDate_End !== null ? (
                              <>
                                <p>
                                  Pracował w: {data.company_name} jako {data.position}
                                </p>
                                <p>
                                  Od: {data.workDate_Start} do: {data.workDate_End}
                                </p>
                              </>
                            ) : (
                              <>
                                <p>
                                  Pracuje w: {data.company_name} jako {data.position}
                                </p>
                                <p>Od: {data.workDate_Start}</p>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Użytkownik nie posiada doświadczenia zawodowego</p>
                    )}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{ border: 'none' }}>
                <CardBody>
                  <CardTitle>
                    <h2>Education</h2>
                  </CardTitle>
                  <CardText>
                    {userEducation.length > 0 ? (
                      <ul>
                        {userEducation.map(data => (
                          <li key={data.school_name}>
                            {data.education_dateEnd !== null ? (
                              <>
                                <p>
                                  Uczył się w: {data.education_level} w {data.country}
                                </p>
                                <p>Kierunek: {data.direction}</p>
                                <p>
                                  Od: {data.education_dateStart} do: {data.education_dateEnd}
                                </p>
                                <p>
                                  Aby przejść do strony szkoły{' '}
                                  <a href={data.school_webside} target='_blank'>
                                    kliknij tutaj
                                  </a>
                                </p>
                              </>
                            ) : (
                              <>
                                <p>
                                  Uczył się w: {data.education_level} w {data.country}
                                </p>
                                <p>Kierunek: {data.direction}</p>
                                <p>Od roku {data.education_dateStart} i dalej się uczy </p>
                                <p>
                                  Aby przejść do strony szkoły{' '}
                                  <a href={data.school_webside} target='_blank'>
                                    kliknij tutaj
                                  </a>
                                </p>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Użytkownik nie posiada doświadczenia zawodowego</p>
                    )}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card style={{ border: 'none' }}>
                <CardBody>
                  <CardTitle>
                    <h2>Skills</h2>
                  </CardTitle>
                  <CardText>
                    <>
                      {userSkills.length > 0 ? (
                        <ul>
                          {userSkills.map(data => (
                            <li key={data.skill_name}>{data.skill_name}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>Użytkownik nie posiada zdefiniowanych umiejętności</p>
                      )}
                    </>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{ border: 'none' }}>
                <CardBody>
                  <CardTitle>
                    <h2>Certifications</h2>
                  </CardTitle>
                  <CardText>
                    <p>{userData.certifications}</p>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
