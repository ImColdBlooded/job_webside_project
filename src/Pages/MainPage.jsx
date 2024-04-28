import React from 'react';
import { Form, Button, Container, Row, Col, Accordion } from 'react-bootstrap';
import { DisplayNotificationByCategory } from '../components/DisplayNotificationByCategory';

export const MainPage = () => {
  return (
    <>
      <Container>
        <DisplayNotificationByCategory category={'Programowanie'} />
      </Container>
    </>
  );
};
