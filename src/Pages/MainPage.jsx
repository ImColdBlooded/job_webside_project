import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { DisplayNotificationByCategory } from '../components/DisplayNotificationByCategory';

export const MainPage = () => {
  return (
    <>
      <Container>
        <Row className='mt-5'>
          <Col>
            <h1 className='text-center' style={{ fontSize: '60px' }}>
              Easy Work
            </h1>
            <h3 className='text-center' style={{ marginTop: '-50px' }}>
              Twój plan na przyszłość
            </h3>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col>
            <DisplayNotificationByCategory category={'BlackHumansSlavery'} />
          </Col>

          <Col>
            <DisplayNotificationByCategory category={'Programowanie'} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
