import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Accordion, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SearchCompany = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [companyData, setCompanyData] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const companySearchUrl = 'http://localhost/StronaZOfertamiPracy/searchCompany.php';

    const searchData = new FormData();
    searchData.append('searchedText', searchQuery);

    try {
      const response = await axios.post(companySearchUrl, searchData);

      if (response.data.status === 'success') {
        //console.log(response.data.message);
        setCompanyData(response.data.searchCompany);
      } else if (response.data.status === 'NoData') {
        //console.log(response.data.message);
        //setLoadAlert({ show: true, variant: 'danger', message: response.data.message });
        setCompanyData([]);
      }
    } catch (error) {
      console.error('Error during adding notification', error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSubmit();
    } else {
      setCompanyData([]);
    }
  }, [searchQuery]);

  const goToCompanyPage = companyId => {
    navigate('/company-page', { state: { companyId } });
  };
  return (
    <>
      <Container style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px' }}>
        <Form onSubmit={handleSubmit}>
          <Row className='align-items-center'>
            <Col xs={12} md={12}>
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
        </Form>
      </Container>

      <Container style={{ padding: '20px' }}>
        {companyData.map(data => (
          <Card
            style={{ width: '100%', marginBottom: '20px', marginTop: '5px', cursor: 'pointer' }}
            key={data.id}
            onClick={() => goToCompanyPage(data.company_id)}>
            <Card.Body>
              <Card.Title>
                <img src={`data:image/jpeg;base64,${data.company_logo}`} alt={data.company_name} width='50px' />
                <strong>{data.company_name}</strong>
              </Card.Title>
              <Card.Text>
                <p>Adress {data.company_address}</p>
                <p>{data.about_company}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};
