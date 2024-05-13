import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Alert, Col } from 'react-bootstrap';
import { useUserContext } from '../ContextApi/userData';
import axios from 'axios';

export const AddNotification = () => {
  const { userData, isLogged, loginUser } = useUserContext();

  useEffect(() => {
    const storeData = localStorage.getItem('UserData');

    if (storeData && !isLogged) {
      loginUser(JSON.parse(storeData));
    }
  }, [isLogged, loginUser, userData.user_id]);

  useEffect(() => {
    setNewUserId(userData.user_id);
  }, [userData.user_id]);

  const [newTitle, setNewTitle] = useState();
  const [newDescript, setNewDescript] = useState();
  const [newWorkPosition, setNewWorkPosition] = useState();
  const [newWorkPositionLevel, setNewWorkPositionLevel] = useState();
  const [newContractType, setNewContractType] = useState();
  const [newEmploymentDimensions, setNewEmploymentDimensions] = useState();
  const [newSalaryRangeStart, setNewSalaryRangeStart] = useState();
  const [newSalaryRangeEnd, setNewSalaryRangeEnd] = useState();
  const [newWorkingHoursStart, setNewWorkingHoursStart] = useState();
  const [newWorkingHoursEnd, setNewWorkingHoursEnd] = useState();
  const [newDateOfExpiry, setNewDateOfExpiry] = useState();
  const [newResponsibilities, setNewResponsibilities] = useState();
  const [newCandidateRequirements, setNewCandidateRequirements] = useState();
  const [newEmployerOffers, setNewEmployerOffers] = useState();
  const [newUserId, setNewUserId] = useState();

  const [newCompaniesList, setNewCompaniesList] = useState([]);
  const [newCategoryList, setNewCategoryList] = useState([]);
  const [newTypeOfWorkList, setNewTypeOfWorkList] = useState([]);
  const [newWorkingDaysList, setNewWorkingDaysList] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [alertData, setAlertData] = useState({ show: false, variant: 'success', message: '' });

  const [categoryAddOrSelect, setCategoryAddOrSelect] = useState(false);

  const handleCategoryChange = e => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selectedOptions);
  };

  const [selectedCompany, setSelectedCompany] = useState('');

  const handleCompanyChange = e => {
    setSelectedCompany(e.target.value);
  };

  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDays([...selectedDays, value]);
    } else {
      setSelectedDays(selectedDays.filter(day => day !== value));
    }
  };

  const [selectedWorkType, setSelectedWorkType] = useState([]);

  const handleWorkTypeChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedWorkType([...selectedWorkType, value]);
    } else {
      setSelectedWorkType(selectedWorkType.filter(type => type !== value));
    }
  };

  const [categoryAdd, setCategoryAdd] = useState('');

  const handleAddCategory = async e => {
    e.preventDefault();

    const newCategory_url = 'http://localhost/stronaZOfertamiPracy/addCategory.php';

    let NewCategory = new FormData();
    NewCategory.append('newCategory', categoryAdd);

    try {
      const response = await axios.post(newCategory_url, NewCategory);

      if (response.data.status === 'success') {
        setAlertData({
          show: true,
          variant: 'success',
          message: response.data.message,
        });
      } else if (response.data.status === 'error') {
        setAlertData({
          show: true,
          variant: 'danger',
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error during adding category', error);
    }
  };

  const companies_url = 'http://localhost/stronaZOfertamiPracy/getAllCompanies.php';
  useEffect(() => {
    fetch(companies_url)
      .then(response => response.json())
      .then(data => setNewCompaniesList(data.companyData))
      .catch(error => console.error('Error fetching companies', error));
  }, []);

  const category_url = 'http://localhost/stronaZOfertamiPracy/getAllcategories.php';
  useEffect(() => {
    fetch(category_url)
      .then(response => response.json())
      .then(data => setNewCategoryList(data.categoryData))
      .catch(error => console.error('Cannot fetch category data', error));
  }, []);

  const typeOfWork_url = 'http://localhost/stronaZOfertamiPracy/getAllTypeOfWork.php';
  useEffect(() => {
    fetch(typeOfWork_url)
      .then(response => response.json())
      .then(data => setNewTypeOfWorkList(data.typeOfWorkData))
      .catch(error => console.error('Cannot fetch category data', error));
  }, []);

  const workingDays_url = 'http://localhost/stronaZOfertamiPracy/getAllWorkingDays.php';
  useEffect(() => {
    fetch(workingDays_url)
      .then(response => response.json())
      .then(data => setNewWorkingDaysList(data.daysData))
      .catch(error => console.error('Cannot fetch category data', error));
  }, []);

  const handleSubmit = async e => {
    //console.log(selectedCategories);

    const addNotificationUrl = 'http://localhost/stronaZOfertamiPracy/addNotificationtodatabase.php';

    let NotificationData = new FormData();
    NotificationData.append('title', newTitle);
    NotificationData.append('descript', newDescript);
    NotificationData.append('company_id', selectedCompany);
    NotificationData.append('workPosition', newWorkPosition);
    NotificationData.append('workPositionLvl', newWorkPositionLevel);
    NotificationData.append('contractType', newContractType);
    NotificationData.append('employmentDimension', newEmploymentDimensions);
    NotificationData.append('salaryRange_start', newSalaryRangeStart);
    NotificationData.append('salaryRange_end', newSalaryRangeEnd);
    NotificationData.append('workingHours_start', newWorkingHoursStart);
    NotificationData.append('workingHours_end', newWorkingHoursEnd);
    NotificationData.append('dateOfExpiry', newDateOfExpiry);
    NotificationData.append('responsibilities', newResponsibilities);
    NotificationData.append('candidateRequirements', newCandidateRequirements);
    NotificationData.append('employerOffers', newEmployerOffers);
    NotificationData.append('category_list', JSON.stringify(selectedCategories));
    NotificationData.append('workType_list', JSON.stringify(selectedWorkType));
    NotificationData.append('workDays_list', JSON.stringify(selectedDays));
    NotificationData.append('userId', newUserId);

    try {
      const response = await axios.post(addNotificationUrl, NotificationData);

      if (response.data.status === 'success') {
        setAlertData({
          show: true,
          variant: 'success',
          message: response.data.message,
        });
      } else if (response.data.status === 'error') {
        setAlertData({
          show: true,
          variant: 'danger',
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error during adding notification', error);
    }
  };

  return (
    <>
      <Container className='bg-light' style={{ padding: '50px', borderRadius: '20px' }} onSubmit={handleSubmit}>
        {alertData.show && (
          <Alert variant={alertData.variant} onClose={() => setAlertData({ ...alertData, show: false })} dismissible>
            <Alert.Heading>{alertData.variant === 'success' ? 'Success!' : 'Error!'}</Alert.Heading>
            <p>{alertData.message}</p>
          </Alert>
        )}
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Tytuł</Form.Label>
            <Form.Control type='text' placeholder='' onChange={e => setNewTitle(e.target.value)} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Opis</Form.Label>
            <Form.Control type='Text' placeholder='' onChange={e => setNewDescript(e.target.value)} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>
              Firma{' '}
              <span style={{ fontSize: '10px' }}>
                (jeśli nie możesz znaleźć swojej firmy możesz skorzystać z{' '}
                <a href='http://localhost:3000/add-company'>formularza dodawania firmy</a> )
              </span>
            </Form.Label>
            <Form.Control as='select' onChange={handleCompanyChange} value={selectedCompany} required>
              <option value=''>Wybierz firmę</option>
              {newCompaniesList.map(company => (
                <option key={company.company_id} value={company.company_id}>
                  {company.company_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Stanowisko</Form.Label>
            <Form.Control type='Text' placeholder='' onChange={e => setNewWorkPosition(e.target.value)} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Poziom stanowiska</Form.Label>
            <Form.Control type='Text' placeholder='' onChange={e => setNewWorkPositionLevel(e.target.value)} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Rodzaj umowy</Form.Label>
            <Form.Control type='Text' placeholder='' onChange={e => setNewContractType(e.target.value)} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Wymiar zatrudnienia</Form.Label>
            <Form.Control type='Text' placeholder='' onChange={e => setNewEmploymentDimensions(e.target.value)} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Rodzaj pracy</Form.Label>
            {newTypeOfWorkList.map(workList => (
              <Form.Check
                key={workList.TypeOfWorkId}
                type='checkbox'
                label={workList.TypeOfWorkType}
                value={workList.TypeOfWorkId}
                onChange={handleWorkTypeChange}
              />
            ))}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Wynagrodzenie</Form.Label>
            <Container>
              <Row>
                <Form.Control
                  type='Text'
                  style={{ width: '45%', float: 'left' }}
                  placeholder='Wynagrodzenie początkowe'
                  onChange={e => setNewSalaryRangeStart(e.target.value)}
                  required
                />

                <Form.Control
                  type='Text'
                  placeholder='Wynagrodzenie koncowe'
                  style={{ width: '45%', float: 'left' }}
                  onChange={e => setNewSalaryRangeEnd(e.target.value)}
                  required
                />
              </Row>
            </Container>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Dni pracy</Form.Label>
            {newWorkingDaysList.map(days => (
              <Form.Check
                type='checkbox'
                key={days.workingDayId}
                label={days.dayName}
                value={days.workingDayId}
                onChange={handleDayChange}
              />
            ))}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Godziny pracy</Form.Label>
            <Form.Control type='time' onChange={e => setNewWorkingHoursStart(e.target.value)} required />
            <Form.Control type='time' onChange={e => setNewWorkingHoursEnd(e.target.value)} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Data wygaśnięcia</Form.Label>
            <Form.Control type='date' onChange={e => setNewDateOfExpiry(e.target.value)} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Zakres obowiązków</Form.Label>
            <Form.Control type='text' onChange={e => setNewEmploymentDimensions(e.target.value)} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Wymagania wobec kandydata</Form.Label>
            <Form.Control type='text' onChange={e => setNewResponsibilities(e.target.value)} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Wymagania przyjęcia</Form.Label>
            <Form.Control type='text' onChange={e => setNewCandidateRequirements(e.target.value)} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Oferty pracodawcy</Form.Label>
            <Form.Control type='text' onChange={e => setNewEmployerOffers(e.target.value)} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Kategorie</Form.Label>
            <Container>
              <Row>
                {categoryAddOrSelect ? (
                  <Row>
                    <Col>
                      <Form.Control type='text' onChange={e => setCategoryAdd(e.target.value)} required />
                    </Col>
                    <Col>
                      <Button onClick={handleAddCategory}>Dodaj kategorię</Button>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Form.Select multiple onChange={handleCategoryChange} value={selectedCategories} required>
                      {newCategoryList.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                          {category.category_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Row>
                )}
                <Button onClick={() => setCategoryAddOrSelect(!categoryAddOrSelect)}>
                  {categoryAddOrSelect ? 'Wybierz z dostępnych' : 'Dodaj kategorię'}
                </Button>
              </Row>
            </Container>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};
