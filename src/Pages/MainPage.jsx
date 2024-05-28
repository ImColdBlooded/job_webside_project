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
      </Container>
    </>
  );
};
