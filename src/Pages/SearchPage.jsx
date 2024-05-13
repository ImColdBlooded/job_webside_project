import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Accordion, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState([]);
  const [company, setCompany] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [workingDays, setWorkingDays] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const [loadAlert, setLoadAlert] = useState({ show: false, variant: 'success', message: '' });

  const [notificationData, setNotificationData] = useState([]);

  const companies_url = 'http://localhost/stronaZOfertamiPracy/getAllCompanies.php';
  useEffect(() => {
    fetch(companies_url)
      .then(response => response.json())
      .then(data => setCompany(data.companyData))
      .catch(error => console.error('Error fetching companies', error));
  }, []);

  const category_url = 'http://localhost/stronaZOfertamiPracy/getAllcategories.php';
  useEffect(() => {
    fetch(category_url)
      .then(response => response.json())
      .then(data => setCategory(data.categoryData))
      .catch(error => console.error('Cannot fetch category data', error));
  }, []);

  const typeOfWork_url = 'http://localhost/stronaZOfertamiPracy/getAllTypeOfWork.php';
  useEffect(() => {
    fetch(typeOfWork_url)
      .then(response => response.json())
      .then(data => setJobType(data.typeOfWorkData))
      .catch(error => console.error('Cannot fetch category data', error));
  }, []);

  const workingDays_url = 'http://localhost/stronaZOfertamiPracy/getAllWorkingDays.php';
  useEffect(() => {
    fetch(workingDays_url)
      .then(response => response.json())
      .then(data => setWorkingDays(data.daysData))
      .catch(error => console.error('Cannot fetch category data', error));
  }, []);

  const handleCategoryChange = e => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selectedOptions);
    //console.log(selectedOptions);
  };

  const handleCompanyChange = e => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCompanies(selectedOptions);
    //console.log(selectedOptions);
  };

  const handleSubmit = async e => {
    const searchData = new FormData();
    searchData.append('searchedText', searchQuery);

    selectedCategories.forEach(categoryId => {
      searchData.append('selectedCategoryCheckbox[]', categoryId);
    });

    selectedCompanies.forEach(companyId => {
      searchData.append('selectedCompanyCheckbox[]', companyId);
    });

    //searchData.append('selectedCompanyCheckbox[]', companyId);

    const search_url = 'http://localhost/stronaZOfertamiPracy/searchNotification.php';

    try {
      const response = await axios.post(search_url, searchData);

      if (response.data.status === 'success') {
        //console.log(response.data.message);

        setNotificationData(response.data.filteredData);
        JSON.stringify(notificationData);
        console.log('siema');
      } else if (response.data.status === 'error') {
        //console.log(response.data.message);
        //setLoadAlert({ show: true, variant: 'danger', message: response.data.message });
      }
    } catch (error) {
      console.error('Error during adding notification', error);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedCompanies([]);
  };

  useEffect(() => {
    if (searchQuery.trim() !== '' || selectedCategories.length > 0 || selectedCompanies.length > 0) {
      handleSubmit();
    } else {
      setNotificationData([]);
    }
  }, [selectedCategories, selectedCompanies, searchQuery]);

  return (
    <Container style={{ background: 'white', padding: '20px', borderRadius: '20px' }}>
      <Form onSubmit={handleSubmit}>
        <Row className='align-items-center'>
          <Col xs={12} md={11}>
            <Form.Group controlId='formSearchQuery'>
              <Form.Label>Wyszukiwanie</Form.Label>
              <Form.Control
                type='text'
                placeholder='Wpisz szukaną frazę'
                onChange={e => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className='text-md-right'>
            <Accordion defaultActiveKey='1'>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Wyszukiwanie zaawansowane</Accordion.Header>
                <Accordion.Body>
                  <Container>
                    <Row>
                      <Col>
                        <Form.Group controlId='formCategory'>
                          <Form.Group controlId='formCategory'>
                            <Form.Label>Kategoria</Form.Label>
                            <Form.Control as='select' multiple onChange={handleCategoryChange}>
                              {category.map(data => (
                                <option key={data.category_id} value={data.category_id}>
                                  {data.category_name}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          <Form.Label>Firma</Form.Label>
                          <Form.Control as='select' multiple onChange={handleCompanyChange}>
                            {company.map(data => (
                              <option key={data.company_id} value={data.company_id}>
                                {data.company_name}
                              </option>
                            ))}
                          </Form.Control>

                          <Form.Label>Rodzaj pracy</Form.Label>
                          <Form.Control as='select' multiple>
                            {jobType.map(data => (
                              <option key={data.TypeOfWorkId} value={data.TypeOfWorkId}>
                                {data.TypeOfWorkType}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group controlId='formCategory'>
                          <Form.Label>Lokalizacja</Form.Label>
                          <Form.Control as='select'>{}</Form.Control>
                        </Form.Group>
                      </Col>

                      <Button onClick={handleClearFilters}>Czyść filtry</Button>
                    </Row>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Form>
      {loadAlert.show && (
        <Container>
          <Alert variant={loadAlert.variant} onClose={() => setLoadAlert({ ...loadAlert, show: false })} dismissible>
            <Alert.Heading>{loadAlert.variant === 'success' ? 'Success!' : 'Error!'}</Alert.Heading>
            <p>{loadAlert.message}</p>
          </Alert>
        </Container>
      )}

      <Container>
        {notificationData.map(data => (
          <Card style={{ width: '100%', marginBottom: '20px', marginTop: '5px' }}>
            <Card.Body>
              <Card.Title>
                <strong>{data.notification_title}</strong>
              </Card.Title>
              <Card.Text>
                <p>
                  {data.notification_descript.length > 5
                    ? `${data.notification_descript.substring(0, 63)}...`
                    : data.notification_descript}
                </p>
                <p>
                  Wynagrodzenie: {data.salary_range_start} zł - {data.salary_range_end} zł
                </p>
                <p>Typ umowy: {data.contract_type}</p>
              </Card.Text>

              <Button variant='primary' style={{ marginLeft: '70%', marginBottom: '5px' }}>
                Przejdź do strony
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Container>
  );
};
