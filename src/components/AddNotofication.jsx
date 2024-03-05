import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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
            <Form.Select>
              <oprion>1</oprion>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Firma (dodaj lub wybierz z istniejących)</Form.Label>
            <Form.Control type='Text' placeholder='Nazwa firmy' />

            <Form.Select>
              <oprion>1</oprion>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Stanowisko</Form.Label>
            <Form.Control type='Text' placeholder='Stanowisko' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Poziom</Form.Label>
            <Form.Control type='Text' placeholder='' />
          </Form.Group>

          <Container fluid>
            <Row>
              <Col>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Col>

              <Col>
                <Button variant='outline-secondary'>Zapisz</Button>
              </Col>

              <Col>
                <Button variant='outline-success'>Aplikuj</Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>
    </>
  );
};
