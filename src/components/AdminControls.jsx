import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const AdminControls = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAllUsersUrl = 'http://localhost/StronaZOfertamiPracy/getAllUsers.php';

  useEffect(() => {
    fetch(getAllUsersUrl)
      .then(response => response.json())
      .then(data => setUsers(data.usersData))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleGoToUserPage = userId => {
    navigate(`/user-profile/${userId}`);
  };

  const handleDeleteUser = userId => {
    const deleteUserUrl = `http://localhost/StronaZOfertamiPracy/deleteUserFromDatabase.php?user_id=${userId}`;

    fetch(deleteUserUrl, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUsers(prevUsers => prevUsers.filter(user => user.user_id !== userId));
          console.log('Użytkownik został pomyślnie usunięty.');
        } else {
          console.error('Błąd podczas usuwania użytkownika:', data.error);
        }
      })
      .catch(error => console.error('Błąd sieci:', error));
  };

  const handleToggleAdminPermission = (userId, currentIsAdmin) => {
    const isAdmin = currentIsAdmin === '1';
    const updateAdminPermissionUrl = `http://localhost/StronaZOfertamiPracy/updateAdminPermit.php?user_id=${userId}&isAdmin=${
      isAdmin ? 0 : 1
    }`;

    fetch(updateAdminPermissionUrl, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUsers(prevUsers =>
            prevUsers.map(user => (user.user_id === userId ? { ...user, isAdmin: isAdmin ? '0' : '1' } : user))
          );
          console.log('Permisje administratorskie zostały pomyślnie zmienione.');
        } else {
          console.error('Błąd podczas zmiany permisji administratorskich:', data.error);
        }
      })
      .catch(error => console.error('Błąd sieci:', error));
  };

  const goToCompanyPage = userId => {
    navigate('/company-page', { state: { userId } });
  };

  return (
    <Container>
      <ListGroup>
        <h3>Użytkownicy ({users.length})</h3>
        {users.map(user => (
          <ListGroup.Item key={user.user_id}>
            <Row>
              <Col>
                <p>{`${user.user_id} ${user.name} ${user.surname}`}</p>
                {`Uprawnienia administratora: ${user.isAdmin === '1' ? 'Tak' : 'Nie'}`}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant='danger' onClick={() => handleDeleteUser(user.user_id)}>
                  Usuń użytkownika
                </Button>
              </Col>
              <Col>
                <Button variant='primary' onClick={() => handleToggleAdminPermission(user.user_id, user.isAdmin)}>
                  {user.isAdmin === '1' ? 'Usuń uprawnienia administracyjne' : 'Nadaj uprawnienia administracyjne'}
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};
