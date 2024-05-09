import React, { useState, onSearch } from 'react';
import { Form, Button, Container, Row, Col, Accordion } from 'react-bootstrap';
import axios from 'axios';

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [jobType, setJobType] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Tutaj możesz wywołać funkcję przekazaną jako props,
    // aby przekazać wartości pól wyszukiwania do komponentu nadrzędnego
    onSearch({ searchQuery, category, company, jobType });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className='align-items-center'>
          <Col xs={12} md={12}>
            <Form.Group controlId='formSearchQuery'>
              <Form.Label>Wyszukiwanie</Form.Label>
              <Form.Control
                type='search'
                placeholder='Wpisz szukaną frazę'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={12} className='text-md-right'>
            <Accordion defaultActiveKey='1'>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Wyszukiwanie zaawansowane</Accordion.Header>
                <Accordion.Body>
                  <Container>
                    <Row>
                      <Col>
                        <Form.Group controlId='formCategory'>
                          <Form.Label>Kategoria</Form.Label>
                          <Form.Control as='select' value={category} onChange={e => setCategory(e.target.value)}>
                            {/* opcje kategorii */}
                          </Form.Control>
                          <Form.Label>Firma</Form.Label>
                          <Form.Control as='select' value={company} onChange={e => setCompany(e.target.value)}>
                            {/* opcje firm */}
                          </Form.Control>

                          <Form.Label>Rodzaj pracy</Form.Label>
                          <Form.Control as='select' value={jobType} onChange={e => setJobType(e.target.value)}>
                            {/* opcje rodzaju pracy */}
                          </Form.Control>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group controlId='formCategory'>
                          <Form.Label>Kategoria</Form.Label>
                          <Form.Control as='select' value={category} onChange={e => setCategory(e.target.value)}>
                            {/* opcje kategorii */}
                          </Form.Control>
                          <Form.Label>Firma</Form.Label>
                          <Form.Control as='select' value={company} onChange={e => setCompany(e.target.value)}>
                            {/* opcje firm */}
                          </Form.Control>

                          <Form.Label>Rodzaj pracy</Form.Label>
                          <Form.Control as='select' value={jobType} onChange={e => setJobType(e.target.value)}>
                            {/* opcje rodzaju pracy */}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Button variant='primary' type='submit'>
              Szukaj
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
