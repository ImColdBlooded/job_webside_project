import React from 'react';
import { Form, Button, Container, Row, Col, DatePicker } from 'react-bootstrap';

const handleSubmit = () => {
  alert('Your form was submitted');
};

export const AddNotification = () => {
  return (
    <>
      <Container className='bg-light' style={{ padding: '50px', borderRadius: '20px' }} onSubmit={handleSubmit}>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Tytuł</Form.Label>
            <Form.Control type='text' placeholder='' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Opis</Form.Label>
            <Form.Control type='Text' placeholder='' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Firma (dodaj lub wybierz z istniejących)</Form.Label>
            <Form.Control type='Text' placeholder='' />

            <Form.Select>
              <option>siema</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Stanowisko</Form.Label>
            <Form.Control type='Text' placeholder='' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Poziom stanowiska</Form.Label>
            <Form.Control type='Text' placeholder='' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Rodzaj umowy</Form.Label>
            <Form.Control type='Text' placeholder='' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Wymiar zatrudnienia</Form.Label>
            <Form.Control type='Text' placeholder='' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Rodzaj pracy</Form.Label>
            <Form.Check type='checkbox' label='Zdalna' />
            <Form.Check type='checkbox' label='Hybrydowa' />
            <Form.Check type='checkbox' label='Stacjonarna' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Wynagrodzenie</Form.Label>
            <Container>
              <Row>
                <Form.Control
                  type='Text'
                  style={{ width: '45%', float: 'left' }}
                  placeholder='Wynagrodzenie początkowe'
                />

                <Form.Control type='Text' placeholder='Wynagrodzenie koncowe' style={{ width: '45%', float: 'left' }} />
              </Row>
            </Container>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Dni pracy</Form.Label>
            <Form.Check type='checkbox' label='Poniedziałek' />
            <Form.Check type='checkbox' label='Wtorek' />
            <Form.Check type='checkbox' label='Środa' />
            <Form.Check type='checkbox' label='Czwartek' />
            <Form.Check type='checkbox' label='Piątek' />
            <Form.Check type='checkbox' label='Sobota' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Godziny pracy</Form.Label>
            <Form.Control type='time' />
            <Form.Control type='time' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Data wygaśnięcia</Form.Label>
            <Form.Control type='date' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Zakres obowiązków</Form.Label>
            <Form.Control type='text' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Wymagania wobec kandydata</Form.Label>
            <Form.Control type='text' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Oferty pracodawcy</Form.Label>
            <Form.Control type='text' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Kategorie</Form.Label>
            <Form.Select multiple></Form.Select>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};
