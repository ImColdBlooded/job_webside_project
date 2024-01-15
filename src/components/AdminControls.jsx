import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

export const AdminControls = () => {
  const [users, setUsers] = useState([]); //stan przechowujący nam tablice z użytkownikami

  const getAllUsersUrl = 'http://localhost/StronaZOfertamiPracy/getAllUsers.php';

  useEffect(() => {
    fetch(getAllUsersUrl) //wbudowana funkcja HTTP która wykonuje żądania do okreslonego linku
      .then(response => response.json()) //przekształcenie odpowiedzi na format .json
      .then(data => setUsers(data.usersData)) //dodanie listy użytkowników do stanu users
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDeleteUser = userId => {
    const deleteUserUrl = `http://localhost/StronaZOfertamiPracy/deleteUserFromDatabase.php?user_id=${userId}`;

    fetch(deleteUserUrl, {
      method: 'DELETE',
    }) // wysyłanie pod podany link żądania delete
      .then(response => response.json()) // przetwoezenie do formatu .json
      .then(data => {
        if (data.success) {
          setUsers(prevUsers => prevUsers.filter(user => user.user_id !== userId)); //aktualizacja listy
          console.log('Użytkownik został pomyślnie usunięty.');
        } else {
          console.error('Błąd podczas usuwania użytkownika:', data.error);
        }
      })
      .catch(error => console.error('Błąd sieci:', error));
  };

  const handleToggleAdminPermission = (userId, isAdmin) => {
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
            prevUsers.map(user => (user.user_id === userId ? { ...user, isAdmin: !isAdmin } : user))
          );
          console.log('Permisje administratorskie zostały pomyślnie zmienione.');
        } else {
          console.error('Błąd podczas zmiany permisji administratorskich:', data.error);
        }
      })
      .catch(error => console.error('Błąd sieci:', error));
  };

  return (
    <Accordion>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>Użytkownicy</Accordion.Header>
        <Accordion.Body>
          {users.length === 0 ? (
            <p>Brak danych użytkowników.</p>
          ) : (
            <Card>
              {users.map(user => (
                <Card.Body key={user.user_id}>
                  <Card.Title>{`${user.user_id} ${user.name} ${user.surname}`}</Card.Title>
                  <Card.Text>{`Email: ${user.email}`}</Card.Text>
                  <Card.Text>{`Tel number: ${user.tel_number}`}</Card.Text>
                  <Card.Text>{`Admin permission: ${user.isAdmin}`}</Card.Text>
                  <Button variant='danger' onClick={() => handleDeleteUser(user.user_id)}>
                    Usuń użytkownika
                  </Button>
                  <Button variant='primary' onClick={() => handleToggleAdminPermission(user.user_id, user.isAdmin)}>
                    Zmień permisje administratorskie
                  </Button>
                </Card.Body>
              ))}
            </Card>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
