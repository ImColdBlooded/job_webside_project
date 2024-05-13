import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export const AddCompanyForm = () => {
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [searchedLocation, setSearchedLocation] = useState(null);

  const [companyAddress, setCompanyAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');

  const [alertData, setAlertData] = useState({ show: false, variant: 'success', message: '' });

  const handleMapClick = e => {
    setLocation(e.latlng);
  };

  const handleSearch = () => {
    axios
      .get(`https://nominatim.openstreetmap.org/search?format=json&q=${companyAddress}`)
      .then(response => {
        const data = response.data;
        if (data.length > 0) {
          const { lat, lon } = data[0];
          const newLocation = { lat: parseFloat(lat), lng: parseFloat(lon) };
          setLocation(newLocation);
          setSearchedLocation(newLocation);
        }
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
      });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const addCompanyUrl = 'http://localhost/stronaZOfertamiPracy/addCompany.php';
    //console.log('SubmitData:', companyName, companyAddress, companyDescription, JSON.stringify(location.lat));

    let companyData = new FormData();
    companyData.append('companyName', companyName);
    companyData.append('companyAddress', companyAddress);
    companyData.append('companyDescription', companyDescription);
    companyData.append('lat', JSON.stringify(location.lat));
    companyData.append('lng', JSON.stringify(location.lng));

    try {
      const response = await axios.post(addCompanyUrl, companyData);

      if (response.data.status === 'success') {
        setAlertData({
          show: true,
          variant: 'success',
          message: 'Data successfully added. Right now you can search your company in our database.',
        });
      } else if (response.data.status === 'error') {
        setAlertData({
          show: true,
          variant: 'danger',
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error during adding notification', error);
    }
  };

  return (
    <>
      <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
        {alertData.show && (
          <Alert variant={alertData.variant} onClose={() => setAlertData({ ...alertData, show: false })} dismissible>
            <Alert.Heading>{alertData.variant === 'success' ? 'Success!' : 'Error!'}</Alert.Heading>
            <p>{alertData.message}</p>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Nazwa firmy</Form.Label>
            <Form.Control type='text' placeholder='' onChange={e => setCompanyName(e.target.value)} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Adres firmy</Form.Label>
            <Container>
              <Row>
                <Form.Control type='text' placeholder='' onChange={e => setCompanyAddress(e.target.value)} />
                <Button variant='primary' onClick={handleSearch}>
                  Szukaj
                </Button>
              </Row>
            </Container>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Lokalizacja</Form.Label>
            <MapContainer
              center={searchedLocation || location}
              zoom={13}
              style={{ height: '300px' }}
              onClick={handleMapClick}>
              <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
              {searchedLocation && (
                <Marker position={searchedLocation}>
                  <Popup>{companyAddress}</Popup>
                </Marker>
              )}
            </MapContainer>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Opis firmy</Form.Label>
            <Form.Control type='text' placeholder='' onChange={e => setCompanyDescription(e.target.value)} />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Dodaj firmę
          </Button>
        </Form>
      </Container>
    </>
  );
};
