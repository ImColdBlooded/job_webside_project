import React from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';

export const AddCompanyForm = () => {
  return (
    <>
      <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Nazwa firmy</Form.Label>
            <Form.Control type='text' placeholder='' />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
