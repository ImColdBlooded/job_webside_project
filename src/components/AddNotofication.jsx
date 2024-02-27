import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

export const AddNotification = () => {
  return (
    <>
      <h1>dodawanie ogłoszenia formularz</h1>
      <Container>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Tytuł</Form.Label>
            <Form.Control type='text' placeholder='Tytuł twojego ogłoszenia' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Opis</Form.Label>
            <Form.Control type='Text' placeholder='Opis ogłoszenia' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Pozycja</Form.Label>
            <Form.Select>
              <option></option>
              <option></option>
              <option></option>
              <option></option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Poziom</Form.Label>
            <Form.Control type='Text' placeholder='' />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};
