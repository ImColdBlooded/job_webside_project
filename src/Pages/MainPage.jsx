import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { DisplayNotificationByCategory } from '../components/DisplayNotificationByCategory';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const [categoryList, setNewCategoryList] = useState([]);
  const [companiesList, setNewCompaniesList] = useState([]);
  const [notificationsList, setNewNotificationList] = useState([]);

  const navigate = useNavigate();

  const category_url = 'http://localhost/stronaZOfertamiPracy/getAllcategories.php';
  useEffect(() => {
    fetch(category_url)
      .then(response => response.json())
      .then(data => setNewCategoryList(data.categoryData))
      .catch(error => console.error('Cannot fetch category data', error));
  }, []);

  const companies_url = 'http://localhost/stronaZOfertamiPracy/getAllCompanies.php';
  useEffect(() => {
    fetch(companies_url)
      .then(response => response.json())
      .then(data => setNewCompaniesList(data.companyData))
      .catch(error => console.error('Error fetching companies', error));
  }, []);

  const not_url = 'http://localhost/stronaZOfertamiPracy/getAllNotifications.php';
  useEffect(() => {
    fetch(not_url)
      .then(response => response.json())
      .then(data => setNewNotificationList(data.not_data))
      .catch(error => console.error('Error fetching companies', error));
  }, []);

  const [randomCategories, setRandomCategories] = useState([]);

  useEffect(() => {
    let shuffled = [...categoryList].sort(() => 0.5 - Math.random());
    shuffled.slice(0, 3);
    shuffled = shuffled.slice(0, 2);
    setRandomCategories(shuffled);
  }, [categoryList]);

  const [randomCompanies, setRandomCompanies] = useState([]);

  useEffect(() => {
    let shuffled = [...companiesList].sort(() => 0.5 - Math.random());
    shuffled.slice(0, 3);
    shuffled = shuffled.slice(0, 4);
    setRandomCompanies(shuffled);
  }, [companiesList]);

  const goToCompanyPage = companyId => {
    navigate('/company-page', { state: { companyId } });
  };

  return (
    <>
      <Container style={{ padding: '20px', borderRadius: '20px', backgroundColor: '' }}>
        <Row className='mt-5' style={{ textAlign: 'center' }}>
          <Col>
            <h1 style={{ fontSize: '60px', color: '#333', fontWeight: 'bold' }}>Easy Work</h1>
            <h3 style={{ marginTop: '-50px', color: '#666', fontStyle: 'italic' }}>Twój plan na przyszłość</h3>
            <h3 style={{ color: '#666', fontStyle: 'italic' }}>
              {notificationsList.length} ofert od najlepszych pracodawców
            </h3>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xs={12} md={2} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              className='d-flex justify-content-between align-items-center p-3'
              style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              <h5 style={{ fontWeight: 'bold' }}>Najnowsze rekomendacje</h5>
              <span>
                <i className='fa fa-arrow-right' />
              </span>
            </div>
          </Col>
          <Col xs={12} md={2} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              className='d-flex justify-content-between align-items-center p-3'
              style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              <h5 style={{ fontWeight: 'bold' }}>Osoby o Twoich kompetencjach aplikowały na</h5>
              <span>
                <i className='fa fa-arrow-right' />
              </span>
            </div>
          </Col>
          <Col xs={12} md={2} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              className='d-flex justify-content-between align-items-center p-3'
              style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              <h5 style={{ fontWeight: 'bold' }}>Ostatnio oglądane</h5>
              <span>
                <i className='fa fa-arrow-right' />
              </span>
            </div>
          </Col>
          <Col xs={12} md={2} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              className='d-flex justify-content-between align-items-center p-3'
              style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              <h5 style={{ fontWeight: 'bold' }}>Superoferty</h5>
              <span>
                <i className='fa fa-arrow-right' />
              </span>
            </div>
          </Col>
          <Col xs={12} md={2} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              className='d-flex justify-content-between align-items-center p-3'
              style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              <h5 style={{ fontWeight: 'bold' }}>Oferty dnia</h5>
              <span>
                <i className='fa fa-arrow-right' />
              </span>
            </div>
          </Col>
        </Row>

        {randomCategories.map((category, index) => (
          <Row className='mt-5' key={index}>
            <Col>
              <DisplayNotificationByCategory category={category.category_name} />
            </Col>
          </Row>
        ))}

        <Row className='mt-5' style={{ textAlign: 'center' }}>
          <Col>
            <h2 style={{ fontSize: '30px', color: '#333', fontWeight: 'bold' }}>Pracodawcy, których warto znać</h2>
          </Col>
        </Row>

        <Row className='mt-5'>
          {randomCompanies.map((data, index) => (
            <Col xs={12} md={3} key={index} style={{ padding: '5px' }}>
              <div
                className='p-3'
                style={{ backgroundColor: '#f0f0f0', borderRadius: '10px', cursor: 'pointer' }}
                onClick={() => goToCompanyPage(data.company_id)}>
                <img
                  src={`data:image/jpeg;base64,${data.company_logo}`}
                  alt={data.company_name}
                  style={{ width: '40px' }}
                />
                <h3 style={{ fontWeight: 'bold', marginTop: '10px' }}>{data.company_name}</h3>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
