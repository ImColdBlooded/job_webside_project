import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { DisplayNotificationByCategory } from '../components/DisplayNotificationByCategory';

export const MainPage = () => {
  return (
    <>
      <Container style={{ padding: '20px', borderRadius: '20px' }}>
        <Row className='mt-5' style={{ textAlign: 'center' }}>
          <Col>
            <h1 style={{ fontSize: '60px', color: '#333', fontWeight: 'bold' }}>Easy Work</h1>
            <h3 style={{ marginTop: '-50px', color: '#666', fontStyle: 'italic' }}>Twój plan na przyszłość</h3>
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

        <Row className='mt-5'>
          <Col>
            <DisplayNotificationByCategory category={'BlackHumansSlavery'} />
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col>
            <DisplayNotificationByCategory category={'Programowanie'} />
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col>
            <DisplayNotificationByCategory category={'Sex'} />
          </Col>
        </Row>

        <Row className='mt-5' style={{ textAlign: 'center' }}>
          <Col>
            <h2 style={{ fontSize: '30px', color: '#333', fontWeight: 'bold' }}>Pracodawcy, których warto znać</h2>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xs={12} md={3}>
            <div className='p-3' style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              <img
                src='https://www.telusinternational.com/sites/default/files/styles/telus_international_header_logo/public/telus_international_logo_white_background.png'
                alt='telus'
                style={{ width: '100px' }}
              />
              <h5 style={{ fontWeight: 'bold', marginTop: '10px' }}>
                Competence Call Center member of TELUS International
              </h5>
              <button className='btn btn-primary mt-2'>Zobacz profil</button>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div className='p-3' style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              <img
                src='https://www.comarch.com/media/images/comarch-logo-horizontal-black.svg'
                alt='comarch'
                style={{ width: '100px' }}
              />
              <h5 style={{ fontWeight: 'bold', marginTop: '10px' }}>COMARCH</h5>
              <button className='btn btn-primary mt-2'>Zobacz profil</button>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div className='p-3' style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              <img
                src='https://www.mercatormedical.pl/media/images/logo.svg'
                alt='mercator'
                style={{ width: '100px' }}
              />
              <h5 style={{ fontWeight: 'bold', marginTop: '10px' }}>Mercator Medical S.A.</h5>
              <button className='btn btn-primary mt-2'>Zobacz profil</button>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div className='p-3' style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              <img
                src='https://www.mahle.com/media/images/mahle-logo-horizontal.svg'
                alt='mahle'
                style={{ width: '100px' }}
              />
              <h5 style={{ fontWeight: 'bold', marginTop: '10px' }}>MAHLE</h5>
              <button className='btn btn-primary mt-2'>Zobacz profil</button>
            </div>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xs={12} md={3}>
            <div className='p-3' style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              <img
                src='https://www.schenker.com/media/images/logo-schenker-horizontal.svg'
                alt='schenker'
                style={{ width: '100px' }}
              />
              <h5 style={{ fontWeight: 'bold', marginTop: '10px' }}>Schenker Sp. z o.o.</h5>
              <button className='btn btn-primary mt-2'>Zobacz profil</button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
