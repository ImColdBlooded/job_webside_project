import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Accordion } from 'react-bootstrap';
import { useUserContext } from '../ContextApi/userData';
import axios from 'axios';

export const EditProfileForm = () => {
  const { userData, isLogged, loginUser } = useUserContext();

  const [companyData, setCompanyData] = useState([]);

  const [newDisableDateWorkCheckbox, setNewDisableDateWorkCheckBox] = useState(false);
  const [newDisableDateEducationCheckbox, setNewDisableDateEducationCheckBox] = useState(false);
  const [newDisableDateCourseCheckbox, setNewDisableDateCourseCheckBox] = useState(false);

  //listy pobierane z bazy danych
  const [workExperienceList, setWorkExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [languageList, setLanguagenList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [linkList, setlinkList] = useState([]);

  //pobrane z localstorage (trzeba aktualizować)
  const [profileImage, setProfileImage] = useState(null);
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
    company_id: '',
    company_name: '',
    workDate_Start: '',
    workDate_End: '',
  });

  const [educationData, setEducationData] = useState({
    school_name: '',
    country: '',
    education_level: '',
    direction: '',
    education_dateStart: '',
    education_dateEnd: '',
    school_webside: '',
    isOngoing: false,
  });

  const [languageData, setLanguageData] = useState({
    language_name: '',
    language_level: '',
  });

  const [skillData, setSkillData] = useState({
    skill_name: '',
  });

  const [courseData, setCourseData] = useState({
    courseName: '',
    startDate: '',
    endDate: '',
    organiser: '',
  });

  const [linkData, setLinkData] = useState({
    link_name: '',
    link_source: '',
  });

  useEffect(() => {
    const storeData = localStorage.getItem('UserData');

    if (storeData && !isLogged) {
      loginUser(JSON.parse(storeData));
    }
  }, [isLogged, loginUser]);

  const companies_url = 'http://localhost/stronaZOfertamiPracy/getAllCompanies.php';
  useEffect(() => {
    fetch(companies_url)
      .then(response => response.json())
      .then(data => setCompanyData(data.companyData))
      .catch(error => console.error('Error fetching companies', error));
  }, []);

  const handleAddWorkExperience = () => {
    const newWorkExperience = { ...workExperienceData };
    setWorkExperienceList([...workExperienceList, newWorkExperience]);

    setWorkExperienceData({
      position: '',
      company_id: '',
      company_name: '',
      workDate_Start: '',
      workDate_End: '',
    });
  };

  const handleAddEducation = () => {
    const newEducation = { ...educationData };
    setEducationList([...educationList, newEducation]);

    setEducationData({
      school_name: '',
      country: '',
      education_level: '',
      direction: '',
      education_dateStart: '',
      education_dateEnd: '',
      school_webside: '',
      isOngoing: false,
    });
  };

  const handleAddLaunguage = () => {
    const newLaunguage = { ...languageData };
    setLanguagenList([...languageList, newLaunguage]);

    setLanguageData({
      language_name: '',
      language_level: '',
    });
  };

  const handleAddSkill = () => {
    if (skillData.skill_name.trim() !== '') {
      const newSkill = { ...skillData };
      setSkillsList([...skillsList, newSkill]);
      setSkillData({ skill_name: '' });
    }
  };

  const handleAddLink = () => {
    const newLink = { ...linkData };
    setlinkList([...linkList, newLink]);

    setLinkData({
      link_name: '',
      link_source: '',
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

  const handleFileChange = e => {
    setProfileImage(e.target.files[0]);
  };

  const handleDisableEndDateWorkInput = () => {
    setNewDisableDateWorkCheckBox(!newDisableDateWorkCheckbox);
    if (newDisableDateWorkCheckbox) {
      setWorkExperienceData({ ...workExperienceData, workDate_End: '' });
    }
  };

  const handleDisableEndDateEducationInput = () => {
    setNewDisableDateEducationCheckBox(!newDisableDateEducationCheckbox);
    if (newDisableDateEducationCheckbox) {
      setEducationData({ ...educationData, education_dateEnd: '' });
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

  const advacedData_url = 'http://localhost/stronaZOfertamiPracy/getUserAdvancedData.php';

  const sendUserId = async user_id => {
    let UserData = new FormData();
    UserData.append('user_id', user_id);

    try {
      const response = await axios.post(advacedData_url, UserData);

      console.log(response.data);

      if (response.data.status === 'success') {
        //console.log(response.data);
        //console.log('siema if in try');
        setSkillsList(response.data.skill_data);
        setWorkExperienceList(response.data.workExpData);
        setEducationList(response.data.educationData);
        setLanguagenList(response.data.languageData);
        setlinkList(response.data.linkData);

        //console.log()
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

  const handleCheckSkillsList = () => {
    //  if()
  };

  const handleUpdateUserProfile = async (e, userId) => {
    e.preventDefault();

    /*console.log(
      userName,
      userSurname,
      userEmail,
      userBirthDate,
      userPhone,
      userPosition,
      userPositionDescript,
      userCareerSummary
    );*/

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
    userUpdateData.append('profile_image', profileImage);
    userUpdateData.append('workExperienceList', JSON.stringify(workExperienceList));
    userUpdateData.append('educationList', JSON.stringify(educationList));
    userUpdateData.append('languageList', JSON.stringify(languageList));
    userUpdateData.append('skillsList', JSON.stringify(skillsList));
    userUpdateData.append('courseList', JSON.stringify(courseList));
    userUpdateData.append('linkList', JSON.stringify(linkList));

    try {
      const response = await axios.post(updateUserUrl, userUpdateData);
      //console.log(skillsList);
      //console.log(workExperienceList);
      //console.log(JSON.stringify(skillsList));

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

                    <Form.Label>Firma</Form.Label>
                    <Form.Select
                      value={workExperienceData.company_id}
                      onChange={e => {
                        const selectedCompany = companyData.find(comp => comp.company_id === e.target.value);
                        setWorkExperienceData({
                          ...workExperienceData,
                          company_id: e.target.value,
                          company_name: selectedCompany.company_name,
                        });
                      }}>
                      <option disabled selected>
                        Wybierz firmę
                      </option>
                      {companyData.map(comp => (
                        <option value={comp.company_id}>
                          {comp.company_name}
                          {comp.company_id}
                        </option>
                      ))}
                    </Form.Select>
                    <p style={{ fontSize: '10px' }}>
                      Jeżeli nie ma twojej firmy na liście <a href='http://localhost:3000/add-company'>kliknij tutaj</a>
                    </p>
                    <br></br>

                    <Container fluid>
                      <Row>
                        <Form.Label>Okres zatrudnienia od do</Form.Label>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Control
                            type='date'
                            value={workExperienceData.workDate_Start}
                            onChange={e =>
                              setWorkExperienceData({ ...workExperienceData, workDate_Start: e.target.value })
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            type='date'
                            value={workExperienceData.workDate_End}
                            onChange={e =>
                              setWorkExperienceData({ ...workExperienceData, workDate_End: e.target.value })
                            }
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
                      value={educationData.school_name}
                      onChange={e => setEducationData({ ...educationData, school_name: e.target.value })}
                    />

                    <Form.Label>Miejscowość</Form.Label>
                    <Form.Control
                      type='text'
                      value={educationData.country}
                      onChange={e => setEducationData({ ...educationData, country: e.target.value })}
                    />

                    <Form.Label>Poziom wykształcenia</Form.Label>
                    <Form.Select
                      onChange={e => setEducationData({ ...educationData, education_level: e.target.value })}>
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
                      value={educationData.direction}
                      onChange={e => setEducationData({ ...educationData, direction: e.target.value })}
                    />

                    <Form.Label>Strona twojej szkoły</Form.Label>
                    <Form.Control
                      type='text'
                      value={educationData.school_webside}
                      onChange={e => setEducationData({ ...educationData, school_webside: e.target.value })}
                    />

                    <Container fluid>
                      <Row>
                        <Form.Label>Okres od do</Form.Label>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Control
                            type='date'
                            value={educationData.education_dateStart}
                            onChange={e => setEducationData({ ...educationData, education_dateStart: e.target.value })}
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            type='date'
                            value={educationData.education_dateEnd}
                            onChange={e => setEducationData({ ...educationData, education_dateEnd: e.target.value })}
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
                        value={languageData.language_name}
                        onChange={e => setLanguageData({ ...languageData, language_name: e.target.value })}
                      />
                      <Form.Label>Poziom</Form.Label>
                      <Form.Select onChange={e => setLanguageData({ ...languageData, language_level: e.target.value })}>
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
                        value={skillData.skill_name}
                        onChange={e => setSkillData({ ...skillData, skill_name: e.target.value })}
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
                            value={linkData.link_name}
                            onChange={e => setLinkData({ ...linkData, link_name: e.target.value })}
                          />
                        </Col>
                        <Col>
                          <Form.Label>Link</Form.Label>
                          <Form.Control
                            type='text'
                            value={linkData.link_source}
                            onChange={e => setLinkData({ ...linkData, link_source: e.target.value })}
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
            <Form.Control type='file' onChange={handleFileChange} />
          </Form.Group>

          <Container id='displayListWorkExperience'>
            <h3>Doświadczenie zawodowe</h3>
            <ul>
              {workExperienceList.map((experience, index) => (
                <li key={index}>
                  {experience.position} at {experience.company_name} ({experience.workDate_Start} -{' '}
                  {experience.workDate_End || (experience.isOngoing && 'Trwa nadal')})<span> </span>
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
                  <strong>{education.education_level}</strong>. Profil <strong>{education.direction}</strong> w{' '}
                  {education.school_name} ({education.education_dateStart} -{' '}
                  {education.education_dateEnd || (education.isOngoing && 'Trwa nadal')})<span> </span>
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
                  Name: {language.language_name} level: {language.language_level}
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
                  Name: {skills.skill_name}
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
                  Platforma: {link.link_name} <br />
                  Link:{' '}
                  <a href={link.link_source} target='_blank'>
                    {link.link_source}
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
