import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginPage.css';
import { Form, Button, Container, Row, Col, FormGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../ContextApi/userData';

export const LoginPage = () => {
  const [WantLogin, setWantLogin] = useState(true);

  // Logowanie
  const [emailLog, setEmailLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');

  // Rejestracja
  const [nameReg, setNameReg] = useState('');
  const [surnameReg, setSurnameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [repeatPasswordReg, setRepeatPasswordReg] = useState('');

  // Alerty logowanie
  const [showSuccessAlertLog, setshowSuccessAlertLog] = useState(false);
  const [showErrorPassAlertLog, setShowErrorPassAlertLog] = useState(false);
  const [showErrorUserExistLog, setShowErrorUserExistLog] = useState(false);

  // Alerty rejestracja
  const [showSuccessAlertReg, setShowSuccessAlertReg] = useState(false);
  const [showErrorPassAlertReg, setShowErrorPassAlertReg] = useState(false);
  const [showErrorUserExist, setShowErrorUserExist] = useState(false);

  //logowanie dane użytkownika
  const { loginUser } = useUserContext();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (passwordReg !== repeatPasswordReg) {
      setShowErrorPassAlertReg(true);
    } else {
      if (WantLogin === false) {
        const registerUrl = 'http://localhost/StronaZOfertamiPracy/register.php';

        let UserData = new FormData();
        UserData.append('name', nameReg);
        UserData.append('surname', surnameReg);
        UserData.append('email', emailReg);
        UserData.append('password', passwordReg);
        UserData.append('repeatPassword', repeatPasswordReg);

        try {
          const response = await axios.post(registerUrl, UserData);

          if (response.data.success) {
            setShowSuccessAlertReg(true);
            setShowErrorUserExist(false);
          } else if (response.data.errorExist) {
            setShowErrorUserExist(true);
            setShowSuccessAlertReg(false);
          }
        } catch (error) {
          console.error('Error during registration:', error);
        }
      } else {
        const loginUrl = 'http://localhost/StronaZOfertamiPracy/login.php';

        let UserData = new FormData();
        UserData.append('email', emailLog);
        UserData.append('password', passwordLog);

        try {
          const response = await axios.post(loginUrl, UserData);

          if (response.data.successLog) {
            setshowSuccessAlertLog(true);
            setShowErrorPassAlertLog(false);
            setShowErrorUserExistLog(false);
            console.log('Próba logowania:', response.data.userData);

            if (response.data.userData) {
              loginUser({
                imie: response.data.userData.imie,
                email: response.data.userData.email,
              });
            }
            handleLoginSuccess();
          } else if (response.data.errorPass) {
            setShowErrorPassAlertLog(true);
            setshowSuccessAlertLog(false);
            setShowErrorUserExistLog(false);
          } else if (response.data.errorUser) {
            setShowErrorUserExistLog(true);
            setShowErrorPassAlertLog(false);
            setshowSuccessAlertLog(false);
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      }
    }
  };

  const handleLoginSuccess = () => {
    setshowSuccessAlertLog(true);
    navigate('/user-profile');
  };

  return (
    <>
      <Container className='mainContainer'>
        <Row>
          <FormGroup>
            <Form sm={12} lg={12} className='justify-content-center' onSubmit={handleSubmit}>
              <Container>
                <Row>
                  <Col>
                    <h1>{WantLogin ? 'Logowanie' : 'Rejestracja'}</h1>

                    {!WantLogin && (
                      <FormGroup>
                        <Form.Control
                          type='text'
                          placeholder='Enter name'
                          onChange={e => setNameReg(e.target.value)}
                          required
                        />
                        <Form.Control
                          type='text'
                          placeholder='Enter surnames'
                          onChange={e => setSurnameReg(e.target.value)}
                          required
                        />
                      </FormGroup>
                    )}

                    <FormGroup>
                      <Form.Control
                        type='email'
                        placeholder='Enter email'
                        onChange={e => (WantLogin ? setEmailLog(e.target.value) : setEmailReg(e.target.value))}
                        required
                      />
                      <Form.Control
                        type='password'
                        placeholder='Enter password'
                        onChange={e => (WantLogin ? setPasswordLog(e.target.value) : setPasswordReg(e.target.value))}
                        required
                      />

                      {!WantLogin && (
                        <FormGroup>
                          <Form.Control
                            type='password'
                            placeholder='Repeat password'
                            onChange={e => setRepeatPasswordReg(e.target.value)}
                            required
                          />
                        </FormGroup>
                      )}
                    </FormGroup>

                    <Button type='submit' variant='primary' className='mt-2'>
                      {WantLogin ? 'Zaloguj' : 'Rejestruj'}
                    </Button>
                  </Col>
                </Row>

                <Row className='justify-content-end'>
                  <Col>
                    <h2>{WantLogin ? 'Nie masz konta?' : 'Masz już konto?'}</h2>
                    <p onClick={() => setWantLogin(!WantLogin)} className='changeForm'>
                      {WantLogin ? 'Zarejestruj się!' : 'Zaloguj się!'}
                    </p>
                  </Col>
                </Row>

                {WantLogin ? (
                  <>
                    {showSuccessAlertLog && (
                      <Row>
                        <Alert variant='success' dismissible onClose={() => setshowSuccessAlertLog(false)}>
                          Pomyślnie zalogowano!
                        </Alert>
                      </Row>
                    )}
                    {showErrorPassAlertLog && (
                      <Row>
                        <Alert variant='danger' dismissible onClose={() => setShowErrorPassAlertLog(false)}>
                          Niepoprawne hasło!
                        </Alert>
                      </Row>
                    )}
                    {showErrorUserExistLog && (
                      <Row>
                        <Alert variant='danger' dismissible onClose={() => setShowErrorUserExistLog(false)}>
                          Użytkownik nie istnieje! Jeśli chcesz założyć konto{' '}
                          <Alert.Link onClick={() => setWantLogin(!WantLogin)}>naciśnij tutaj</Alert.Link>
                        </Alert>
                      </Row>
                    )}
                  </>
                ) : (
                  <>
                    {showSuccessAlertReg && (
                      <Row>
                        <Alert variant='success' dismissible onClose={() => setShowSuccessAlertReg(false)}>
                          Pomyślnie zarejestrowano!
                        </Alert>
                      </Row>
                    )}
                    {showErrorPassAlertReg && (
                      <Row>
                        <Alert variant='danger' dismissible onClose={() => setShowErrorPassAlertReg(false)}>
                          Hasła nie są takie same!
                        </Alert>
                      </Row>
                    )}
                    {showErrorUserExist && (
                      <Row>
                        <Alert variant='danger' dismissible onClose={() => setShowErrorUserExist(false)}>
                          Użytkownik już istnieje
                        </Alert>
                      </Row>
                    )}
                  </>
                )}
              </Container>
            </Form>
          </FormGroup>
        </Row>
      </Container>
    </>
  );
};
