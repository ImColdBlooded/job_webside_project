import React, { useState } from "react";
import '../css/LoginPage.css';
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Nav,
  Alert,
} from "react-bootstrap";

export const LoginPage = () => {
  const [WantLogin, setWantLogin] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorPassAlert, setShowErrorPassAlert] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== repeatPassword) {
      setShowSuccessAlert(false);
      setShowErrorPassAlert(true);
    } else {
      if (WantLogin === false) {
        // Kod rejestracji
        const registerUrl = "http://localhost/StronaZOfertamiPracy/addUser.php";
  
        let UserData = new FormData();
        UserData.append('name', name);
        UserData.append('surname', surname);
        UserData.append('email', email);
        UserData.append('password', password);
        UserData.append('repeatPassword', repeatPassword);
  
        try {
          await axios.post(registerUrl, UserData);
          setShowErrorPassAlert(false);
          setShowSuccessAlert(true);
        } catch (error) {
          console.error("Błąd rejestracji:", error);
        }
      } else {
        // Kod logowania
        const loginUrl = "http://localhost/StronaZOfertamiPracy/login.php";
  
        let UserData = new FormData();
        UserData.append('email', email);
        UserData.append('password', password);
  
        try {
          const response = await axios.post(loginUrl, UserData);
  
          if (response.data.success) {
            setShowErrorPassAlert(false);
            setShowSuccessAlert(true);
          } else {
            setShowSuccessAlert(false);
            setShowErrorPassAlert(true);
          }
        } catch (error) {
          console.error("Błąd logowania:", error);
        }
      }
    }
  };

  return (
    <>
      <Container className="mainContainer">
        <Row>
          <FormGroup>
            <Form
              sm={12}
              lg={12}
              className="justify-content-center"
              onSubmit={handleSubmit}
            >
              <Container>
                <Row>
                  <Col>
                    <h1>{WantLogin ? "Logowanie" : "Rejestracja"}</h1>

                    {!WantLogin && (
                      <FormGroup>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <Form.Control
                          type="text"
                          placeholder="Enter surnames"
                          onChange={(e) => setSurname(e.target.value)}
                          required
                        />
                      </FormGroup>
                    )}

                    <FormGroup>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      {!WantLogin && (
                        <FormGroup>
                          <Form.Control
                            type="password"
                            placeholder="Repeat password"
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required
                          />
                        </FormGroup>
                      )}
                    </FormGroup>

                    <Button type="submit" variant="primary" className="mt-2">
                      {WantLogin ? "Zaloguj" : "Rejestruj"}
                    </Button>
                  </Col>
                </Row>

                <Row className="justify-content-end">
                  <Col>
                    <h2>{WantLogin ? "Nie masz konta?" : "Masz już konto?"}</h2>
                    <p onClick={() => setWantLogin(!WantLogin)} className="changeForm">
                      {WantLogin ? "Zarejestruj się!" : "Zaloguj się!"}
                    </p>
                  </Col>
                </Row>

                {showSuccessAlert && (
                  <Row>
                    <Alert
                      variant="success"
                      dismissible
                      onClose={() => setShowSuccessAlert(false)}
                    >
                      {WantLogin ? "Pomyślnie zalogowano!" : "Pomyślnie zarejestrowano!"}
                    </Alert>
                  </Row>
                )}

                {showErrorPassAlert && (
                  <Row>
                    <Alert
                      variant="danger"
                      dismissible
                      onClose={() => setShowErrorPassAlert(false)}
                    >
                      Powtórzone hasło nie jest takie samo jak główne!
                    </Alert>
                  </Row>
                )}
              </Container>
            </Form>
          </FormGroup>
        </Row>
      </Container>
    </>
  );
};
