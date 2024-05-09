import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
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

  const [selectedCategories, setSelectedCategories] = useState([]);

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

  const handleSubmit = async e => {
    e.preventDefault();

    console.log(selectedCategories);

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
    NotificationData.append('candidate_requirements', newCandidateRequirements);
    NotificationData.append('employerOffers', newEmployerOffers);
    NotificationData.append('category_list', JSON.stringify(selectedCategories));
    NotificationData.append('userId', newUserId);

    try {
      const response = await axios.post(addNotificationUrl, NotificationData);

      if (response.data.success) {
      } else if (response.data.error) {
      }
    } catch (error) {
      console.error('Error during adding notification', error);
    }
  };

  return (
    <>
      <Container className='bg-light' style={{ padding: '50px', borderRadius: '20px' }} onSubmit={handleSubmit}>
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
                (jeśli nie ma na liście twojej firmy proszę przejść do formularza dodawania firmy)
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
            <Form.Check type='checkbox' label='Zdalna' value='Zdalna' onChange={handleWorkTypeChange} />
            <Form.Check type='checkbox' label='Hybrydowa' value='Hybrydowa' onChange={handleWorkTypeChange} />
            <Form.Check type='checkbox' label='Stacjonarna' value='Stacjonarna' onChange={handleWorkTypeChange} />
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
            <Form.Check type='checkbox' label='Poniedziałek' value='Poniedziałek' onChange={handleDayChange} />
            <Form.Check type='checkbox' label='Wtorek' value='Wtorek' onChange={handleDayChange} />
            <Form.Check type='checkbox' label='Środa' value='Środa' onChange={handleDayChange} />
            <Form.Check type='checkbox' label='Czwartek' value='Czwartek' onChange={handleDayChange} />
            <Form.Check type='checkbox' label='Piątek' value='Piątek' onChange={handleDayChange} />
            <Form.Check type='checkbox' label='Sobota' value='Sobota' onChange={handleDayChange} />
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
            <Form.Select multiple onChange={handleCategoryChange} value={selectedCategories} required>
              {newCategoryList.map(category => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
              ;
            </Form.Select>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};
