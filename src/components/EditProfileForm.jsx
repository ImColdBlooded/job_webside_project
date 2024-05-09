import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Accordion } from 'react-bootstrap';
import { useUserContext } from '../ContextApi/userData';
import axios from 'axios';

export const EditProfileForm = () => {
  const { userData, isLogged, loginUser } = useUserContext();

  const [newDisableDateWorkCheckbox, setNewDisableDateWorkCheckBox] = useState(false);
  const [newDisableDateEducationCheckbox, setNewDisableDateEducationCheckBox] = useState(false);
  const [newDisableDateCourseCheckbox, setNewDisableDateCourseCheckBox] = useState(false);
  const [workExperienceList, setWorkExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [languageList, setLanguagenList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [linkList, setlinkList] = useState([]);

  const [userName, setUserName] = useState(userData.name || '');
  const [userSurname, setUserSurname] = useState(userData.surname || '');
  const [userBirthDate, setUserBirthDate] = useState(userData.birth_date || '');
  const [userEmail, setUserEmail] = useState(userData.email || '');
  const [userPhone, setUserPhone] = useState(userData.tel_number || '');
  const [userPosition, setUserPosition] = useState(userData.curr_position || '');
  const [userPositionDescript, setUserPositionDescript] = useState(userData.curr_position_description || '');
  const [userCareerSummary, setUserCareerSummary] = useState(userData.career_summary || '');

  const [workExperienceData, setWorkExperienceData] = useState({
    position: '',
    companyName: '',
    location: '',
    startDate: '',
    endDate: '',
    isOngoing: false,
  });

  const [educationData, setEducationData] = useState({
    schoolName: '',
    location: '',
    educationLevel: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    isOngoing: false,
  });

  const [languageData, setLanguageData] = useState({
    language: '',
    level: '',
  });

  const [skillData, setSkillData] = useState({
    skillName: '',
  });

  const [courseData, setCourseData] = useState({
    courseName: '',
    startDate: '',
    endDate: '',
    organiser: '',
  });

  const [linkData, setLinkData] = useState({
    platformName: '',
    source: '',
  });

  useEffect(() => {
    const storeData = localStorage.getItem('UserData');

    if (storeData && !isLogged) {
      loginUser(JSON.parse(storeData));
    }
  }, [isLogged, loginUser]);

  const handleAddWorkExperience = () => {
    const newWorkExperience = { ...workExperienceData };
    setWorkExperienceList([...workExperienceList, newWorkExperience]);

    setWorkExperienceData({
      position: '',
      companyName: '',
      location: '',
      startDate: '',
      endDate: '',
      isOngoing: false,
    });
  };

  const handleAddEducation = () => {
    const newEducation = { ...educationData };
    setEducationList([...educationList, newEducation]);

    setEducationData({
      schoolName: '',
      location: '',
      educationLevel: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      isOngoing: false,
    });
  };

  const handleAddLaunguage = () => {
    const newLaunguage = { ...languageData };
    setLanguagenList([...languageList, newLaunguage]);

    setLanguageData({
      language: '',
      level: '',
    });
  };

  const handleAddSkill = () => {
    const newSkill = { ...skillData };
    setSkillsList([...skillsList, newSkill]);

    setSkillData({
      skillName: '',
    });
  };
  const handleAddLink = () => {
    const newLink = { ...linkData };
    setlinkList([...linkList, newLink]);

    setLinkData({
      platformName: '',
      source: '',
    });
  };

  const handleAddCourse = () => {
    const newCourse = { ...courseData };
    setCourseList([...courseList, newCourse]);

    setCourseData({
      courseName: '',
      startDate: '',
      endDate: '',
      organiser: '',
    });
  };

  const handleDisableEndDateWorkInput = () => {
    setNewDisableDateWorkCheckBox(!newDisableDateWorkCheckbox);
    if (newDisableDateWorkCheckbox) {
      setWorkExperienceData({ ...workExperienceData, endDate: '' });
    }
  };

  const handleDisableEndDateEducationInput = () => {
    setNewDisableDateEducationCheckBox(!newDisableDateEducationCheckbox);
    if (newDisableDateEducationCheckbox) {
      setEducationData({ ...educationData, endDate: '' });
    }
  };

  const handleDisableEndDateCourseInput = () => {
    setNewDisableDateCourseCheckBox(!newDisableDateCourseCheckbox);
    if (newDisableDateCourseCheckbox) {
      setCourseData({ ...courseData, endDate: '' });
    }
  };

  const handleRemoveWorkExperience = index => {
    const updatedWorkExperienceList = [...workExperienceList];
    updatedWorkExperienceList.splice(index, 1);
    setWorkExperienceList(updatedWorkExperienceList);
  };

  const handleRemoveEducation = index => {
    const updatedEducationList = [...educationList];
    updatedEducationList.splice(index, 1);
    setEducationList(updatedEducationList);
  };

  const handleRemoveLanguage = index => {
    const updatedLanguageList = [...languageList];
    updatedLanguageList.splice(index, 1);
    setLanguagenList(updatedLanguageList);
  };

  const handleRemoveSkill = index => {
    const updatedSkillList = [...skillsList];
    updatedSkillList.splice(index, 1);
    setSkillsList(updatedSkillList);
  };

  const handleRemoveCourse = index => {
    const updatedCourseList = [...courseList];
    updatedCourseList.splice(index, 1);
    setCourseList(updatedCourseList);
  };

  const handleRemoveLink = index => {
    const updatedLinkList = [...linkList];
    updatedLinkList.splice(index, 1);
    setlinkList(updatedLinkList);
  };

  const handleUpdateUserProfile = async (e, userId) => {
    e.preventDefault();

    console.log(
      userName,
      userSurname,
      userEmail,
      userBirthDate,
      userPhone,
      userPosition,
      userPositionDescript,
      userCareerSummary
    );

    const updateUserUrl = `http://localhost/StronaZOfertamiPracy/updateProfile.php?user_id=${userId}`;

    let userUpdateData = new FormData();
    userUpdateData.append('name', userName);
    userUpdateData.append('surname', userSurname);
    userUpdateData.append('email', userEmail);
    userUpdateData.append('birth_date', userBirthDate);
    userUpdateData.append('phone', userPhone);
    userUpdateData.append('position', userPosition);
    userUpdateData.append('positionDescr', userPositionDescript);
    userUpdateData.append('career_summary', userCareerSummary);

    userUpdateData.append('workExperienceList', JSON.stringify(workExperienceList));
    userUpdateData.append('educationList', JSON.stringify(educationList));
    userUpdateData.append('languageList', JSON.stringify(languageList));
    userUpdateData.append('skillsList', JSON.stringify(skillsList));
    userUpdateData.append('courseList', JSON.stringify(courseList));
    userUpdateData.append('linkList', JSON.stringify(linkList));

    try {
      const response = await axios.post(updateUserUrl, userUpdateData);
      console.log(skillsList);
      console.log(JSON.stringify(skillsList));

      if (response.data.success) {
        console.log('sukces');
      } else if (response.data.error) {
        console.log(response.data.error);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <Container className='userDisplay'>
      <Row>
        <Col>
          <Form
            onSubmit={e => {
              handleUpdateUserProfile(e, userData.user_id);
            }}>
            <Form.Group className='mb-3'>
              <Form.Label>Imie</Form.Label>
              <Form.Control type='text' value={userName} onChange={e => setUserName(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control type='text' value={userSurname} onChange={e => setUserSurname(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Data urodzenia</Form.Label>
              <Form.Control type='date' value={userBirthDate} onChange={e => setUserBirthDate(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' value={userEmail} onChange={e => setUserEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Numer telefonu</Form.Label>
              <Form.Control type='text' value={userPhone} onChange={e => setUserPhone(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Stanowisko pracy</Form.Label>
              <Form.Control type='text' value={userPosition} onChange={e => setUserPosition(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Opis zajmowanego stanowiska pracy</Form.Label>
              <Form.Control
                type='text'
                value={userPositionDescript}
                onChange={e => setUserPositionDescript(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Podsumowanie zawodowe</Form.Label>
              <Form.Control
                type='text'
                value={userCareerSummary}
                onChange={e => setUserCareerSummary(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Accordion defaultActiveKey={null}>
                <Accordion.Item>
                  <Accordion.Header>Doświadczenie zawodowe</Accordion.Header>
                  <Accordion.Body>
                    <Form.Label>Stanowisko</Form.Label>
                    <Form.Control
                      type='text'
                      value={workExperienceData.position}
                      onChange={e => setWorkExperienceData({ ...workExperienceData, position: e.target.value })}
                    />

                    <Form.Label>Nazwa firmy</Form.Label>
                    <Form.Control
                      type='text'
                      value={workExperienceData.company}
                      onChange={e => setWorkExperienceData({ ...workExperienceData, companyName: e.target.value })}
                    />

                    <Form.Text id='textCompany' muted>
                      Lub wybierz firmę z pola niżej
                    </Form.Text>
                    <Form.Select></Form.Select>
                    <br></br>

                    <Form.Label>Lokalizacja</Form.Label>
                    <Form.Control
                      type='text'
                      value={workExperienceData.location}
                      onChange={e => setWorkExperienceData({ ...workExperienceData, location: e.target.value })}
                    />

                    <Container fluid>
                      <Row>
                        <Form.Label>Okres zatrudnienia od do</Form.Label>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Control
                            type='date'
                            value={workExperienceData.startDate}
                            onChange={e => setWorkExperienceData({ ...workExperienceData, startDate: e.target.value })}
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            type='date'
                            value={workExperienceData.endDate}
                            onChange={e => setWorkExperienceData({ ...workExperienceData, endDate: e.target.value })}
                            disabled={newDisableDateWorkCheckbox ? true : false}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>
                            <Form.Check label='Trwa nadal' onChange={handleDisableEndDateWorkInput} />
                          </Form.Label>
                        </Col>
                      </Row>
                    </Container>
                    <Button onClick={handleAddWorkExperience}>Dodaj</Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Accordion defaultActiveKey={null}>
                <Accordion.Item>
                  <Accordion.Header>Wykształcenie</Accordion.Header>
                  <Accordion.Body>
                    <Form.Label>Nazwa szkoły/uczelni</Form.Label>
                    <Form.Control
                      type='text'
                      value={educationData.schoolName}
                      onChange={e => setEducationData({ ...educationData, schoolName: e.target.value })}
                    />

                    <Form.Label>Miejscowość</Form.Label>
                    <Form.Control
                      type='text'
                      value={educationData.location}
                      onChange={e => setEducationData({ ...educationData, location: e.target.value })}
                    />

                    <Form.Label>Poziom wykształcenia</Form.Label>
                    <Form.Select onChange={e => setEducationData({ ...educationData, educationLevel: e.target.value })}>
                      <option value='wykształcenie podstawowe'>wykształcenie podstawowe</option>
                      <option value='wykształcenie gimnazjalne'>wykształcenie gimnazjalne</option>
                      <option value='wykształcenie zasadnicze zawodowe'>wykształcenie zasadnicze zawodowe</option>
                      <option value='wykształcenie zasadnicze branżowe'>wykształcenie zasadnicze branżowe</option>
                      <option value='wykształcenie średnie branżowe'>wykształcenie średnie branżowe</option>
                      <option value='wykształcenie średnie'>wykształcenie średnie</option>
                      <option value='wykształcenie wyższe'>wykształcenie wyższe</option>
                    </Form.Select>
                    <br></br>

                    <Form.Label>Kierunek</Form.Label>
                    <Form.Control
                      type='text'
                      value={educationData.fieldOfStudy}
                      onChange={e => setEducationData({ ...educationData, fieldOfStudy: e.target.value })}
                    />

                    <Container fluid>
                      <Row>
                        <Form.Label>Okres od do</Form.Label>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Control
                            type='date'
                            value={educationData.startDate}
                            onChange={e => setEducationData({ ...educationData, startDate: e.target.value })}
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            type='date'
                            value={educationData.endDate}
                            onChange={e => setEducationData({ ...educationData, endDate: e.target.value })}
                            disabled={newDisableDateEducationCheckbox ? true : false}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>
                            <Form.Check label='Trwa nadal' onChange={handleDisableEndDateEducationInput} />
                          </Form.Label>
                        </Col>
                      </Row>
                    </Container>
                    <Button onClick={handleAddEducation}>Dodaj</Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Accordion defaultActiveKey={null}>
                <Accordion.Item>
                  <Accordion.Header>Języki</Accordion.Header>
                  <Accordion.Body>
                    <Container fluid>
                      <Form.Control
                        placeholder='Język'
                        value={languageData.name}
                        onChange={e => setLanguageData({ ...languageData, name: e.target.value })}
                      />
                      <Form.Label>Poziom</Form.Label>
                      <Form.Select onChange={e => setLanguageData({ ...languageData, level: e.target.value })}>
                        <option value='A1'>Początkujący (A1)</option>
                        <option value='A2'>Podstawowy (A2)</option>
                        <option value='B1'>Średnio zaawansowany (B1)</option>
                        <option value='B2'>Ponad średnio zaawansowany (B2)</option>
                        <option value='C1'>Zaawansowany (C1)</option>
                        <option value='C2'>Biegły (C2)</option>
                      </Form.Select>
                      <br></br>
                    </Container>
                    <Button onClick={handleAddLaunguage}>Dodaj</Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Accordion defaultActiveKey={null}>
                <Accordion.Item>
                  <Accordion.Header>Umiejętności</Accordion.Header>
                  <Accordion.Body>
                    <Container>
                      <Form.Control
                        type='text'
                        value={skillData.skillName}
                        onChange={e => setSkillData({ ...skillData, skillName: e.target.value })}
                      />
                    </Container>
                    <Button onClick={handleAddSkill}>Dodaj</Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Accordion defaultActiveKey={null}>
                <Accordion.Item>
                  <Accordion.Header>Kursy/szkolenia/certyfikaty</Accordion.Header>
                  <Accordion.Body>
                    <Container>
                      <Form.Label>Nazwa</Form.Label>
                      <Form.Control
                        type='text'
                        value={courseData.courseName}
                        onChange={e => setCourseData({ ...courseData, courseName: e.target.value })}
                      />

                      <Form.Label>Organizator</Form.Label>
                      <Form.Control
                        type='text'
                        value={courseData.organiser}
                        onChange={e => setCourseData({ ...courseData, organiser: e.target.value })}
                      />

                      <Form.Label>Data odbycia</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            type='date'
                            value={courseData.startDate}
                            onChange={e => setCourseData({ ...courseData, startDate: e.target.value })}></Form.Control>
                        </Col>
                        <Col>
                          <Form.Control
                            type='date'
                            value={courseData.endDate}
                            onChange={e => setCourseData({ ...courseData, endDate: e.target.value })}
                            disabled={newDisableDateCourseCheckbox ? true : false}></Form.Control>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Check label='Trwa nadal' onChange={handleDisableEndDateCourseInput} />
                      </Row>
                    </Container>
                    <Button onClick={handleAddCourse}>Dodaj</Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Accordion defaultActiveKey={null}>
                <Accordion.Item>
                  <Accordion.Header>Linki</Accordion.Header>
                  <Accordion.Body>
                    <Container>
                      <Row>
                        <Col>
                          <Form.Label>Nazwa platformy</Form.Label>
                          <Form.Control
                            type='text'
                            value={linkData.platformName}
                            onChange={e => setLinkData({ ...linkData, platformName: e.target.value })}
                          />
                        </Col>
                        <Col>
                          <Form.Label>Link</Form.Label>
                          <Form.Control
                            type='text'
                            value={linkData.source}
                            onChange={e => setLinkData({ ...linkData, source: e.target.value })}
                          />
                        </Col>
                      </Row>
                    </Container>
                    <Button onClick={handleAddLink}>Dodaj</Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Save Changes
            </Button>
          </Form>
        </Col>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Zdjęcie profilowe</Form.Label>
            <Form.Control type='file' placeholder='' />
          </Form.Group>

          <Container id='displayListWorkExperience'>
            <h3>Doświadczenie zawodowe</h3>
            <ul>
              {workExperienceList.map((experience, index) => (
                <li key={index}>
                  {experience.position} at {experience.companyName} ({experience.startDate} -{' '}
                  {experience.endDate || (experience.isOngoing && 'Trwa nadal')})<span> </span>
                  <Button onClick={() => handleRemoveWorkExperience(index)}>Usuń</Button>
                </li>
              ))}
            </ul>
          </Container>

          <Container id='displayListEducation'>
            <h3>Wykształcenie</h3>
            <ul>
              {educationList.map((education, index) => (
                <li key={index}>
                  {education.educationLevel} in {education.fieldOfStudy} at {education.schoolName} (
                  {education.startDate} - {education.endDate || (education.isOngoing && 'Trwa nadal')})<span> </span>
                  <Button onClick={() => handleRemoveEducation(index)}>Usuń</Button>
                </li>
              ))}
            </ul>
          </Container>

          <Container id='displayListLanguage'>
            <h3>Języki</h3>
            <ul>
              {languageList.map((language, index) => (
                <li key={index}>
                  Name: {language.name} level: {language.level}
                  <span> </span>
                  <Button onClick={() => handleRemoveLanguage(index)}>Usuń</Button>
                </li>
              ))}
            </ul>
          </Container>

          <Container id='displayListSkill'>
            <h3>Umiejętności</h3>
            <ul>
              {skillsList.map((skills, index) => (
                <li key={index}>
                  Name: {skills.skillName}
                  <span> </span>
                  <Button onClick={() => handleRemoveSkill(index)}>Usuń</Button>
                </li>
              ))}
            </ul>
          </Container>

          <Container id='displayListSkill'>
            <h3>Kursy</h3>
            <ul>
              {courseList.map((course, index) => (
                <li key={index}>
                  Name: {course.courseName}. Organizator: {course.organiser} odbyty w dniu(ach) {course.startDate} -{' '}
                  {course.endDate}
                  <span> </span>
                  <Button onClick={() => handleRemoveCourse(index)}>Usuń</Button>
                </li>
              ))}
            </ul>
          </Container>

          <Container id='displayListSkill'>
            <h3>Linki</h3>
            <ul>
              {linkList.map((link, index) => (
                <li key={index}>
                  Platforma: {link.platformName} <br />
                  Link:{' '}
                  <a href={link.source} target='blank'>
                    {link.source}
                  </a>
                  <span> </span>
                  <Button onClick={() => handleRemoveLink(index)}>Usuń</Button>
                </li>
              ))}
            </ul>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
