import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const DisplayCompanyData = ({ data }) => {
  const [companies, setCompanies] = useState([]);
  const [companyNot, setCompanyNot] = useState([]);

  const advacedData_url = 'http://localhost/stronaZOfertamiPracy/getCompanyById.php';
  const advacedCompNotData_url = 'http://localhost/stronaZOfertamiPracy/getNotificationByCompanyId.php';

  const getCompanyData = async comp_id => {
    let companyData = new FormData();
    companyData.append('company_id', comp_id);

    try {
      const response = await axios.post(advacedData_url, companyData);

      if (response.data.success) {
        //console.log('Received company data:', response.data.companyData);
        setCompanies(response.data.companyData);
      } else if (response.data.error) {
        console.log('error', response.data.error);
      }
    } catch (error) {
      console.error('Error during fetched:', error);
    }
  };

  const getCompanyNotData = async comp_id => {
    let companyData = new FormData();
    companyData.append('company_id', comp_id);

    try {
      const response = await axios.post(advacedCompNotData_url, companyData);

      if (response.data.status === 'success') {
        //console.log('Received company data:', response.data.companyData);
        setCompanyNot(response.data.not_data);
      } else if (response.data.error) {
        console.log('error', response.data.error);
      }
    } catch (error) {
      console.error('Error during fetched:', error);
    }
  };

  useEffect(() => {
    getCompanyData(data);
    getCompanyNotData(data);
  }, [data]);

  if (companies.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
      <Row>
        <Col md={3}>
          {companies[0] && (
            <Card style={{ marginBottom: 20 }}>
              <Card.Img
                variant='top'
                src={`data:image/jpeg;base64,${companies[0].company_logo}`}
                style={{ width: '150px' }}
              />
              <Card.Body>
                <Card.Title>{companies[0].company_name}</Card.Title>
                <Card.Text>Adres: {companies[0].company_address}</Card.Text>
                <Row>
                  <Col>
                    <Button>Obserwuj</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={9}>
          {companies[0] && (
            <>
              <h2>{companies[0].company_name}</h2>
              <p>{companies[0].about_company}</p>
              <h2>Ostatnio dodane przez nas ogłoszenia</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Tytuł</th>
                    <th>Pozycja</th>
                    <th>Data dodania</th>
                  </tr>
                </thead>
                <tbody>
                  {companyNot.map((compNot, index) => (
                    <tr key={index}>
                      <td>{compNot.notification_title}</td>
                      <td>{compNot.work_position}</td>
                      <td>{compNot.date_of_expiry_start}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <MapContainer
                center={[parseFloat(companies[0].lat), parseFloat(companies[0].lng)]}
                zoom={10}
                style={{ height: '400px', width: '100%' }}>
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {companies.map(company => (
                  <Marker key={company.company_id} position={[parseFloat(company.lat), parseFloat(company.lng)]}>
                    <Popup>
                      {company.company_name}
                      <br />
                      {company.company_address}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
