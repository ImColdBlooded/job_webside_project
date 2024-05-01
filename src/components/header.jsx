import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useUserContext } from '../ContextApi/userData';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { isLogged, logOut, loginUser } = useUserContext();
  var navigate = useNavigate();

  useEffect(() => {
    const storedIsLogged = localStorage.getItem('isLogged');

    if (storedIsLogged === 'true') {
      const storedUserData = localStorage.getItem('UserData');

      if (storedUserData) {
        loginUser(JSON.parse(storedUserData));
      }
    }
  }, []);

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  return (
    <header>
      <Navbar bg='light' expand='md'>
        <Container>
          <Navbar.Brand as={Link} to='/main'>
            <img src='./images/logoEasyWork.jpg' alt='EasyWork' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar-nav' />
          <Navbar.Collapse id='navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Item>
                <Nav.Link as={Link} to='/search'>
                  Wyszukiwarka
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to='/employer-profiles'>
                  Profile pracodawców
                </Nav.Link>
              </Nav.Item>
              <NavDropdown title='Moja kariera' id='dropdownCareers'>
                <NavDropdown.Item as={Link} to='/cv-creator'>
                  Kreator CV
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/salary-calculator'>
                  Kalkulator wynagrodzeń
                </NavDropdown.Item>
              </NavDropdown>
              {isLogged ? (
                <NavDropdown title='Twoje konto' id='dropdownId'>
                  <NavDropdown.Item as={Link} to='/user-profile'>
                    Profil użytkownika
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/add-notification'>
                    Dodaj ogłoszenie
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Wyloguj</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item className='ml-auto'>
                  <Nav.Link as={Link} to='/login'>
                    Logowanie
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
