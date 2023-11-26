// UserContext.js
import { createContext, useContext, useState } from 'react';
//https://www.youtube.com/watch?v=cwZXiUkBW1w -> korzystałem z tego filmu
//https://blog.szkudelski.dev/posts/rozne-metody-przechowywania-danych-w-przegladarce
//https://kursjs.pl/kurs/storage/storage -> użycie local storage

export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const loginUser = data => {
    setUserData(data);
    setIsLogged(true);

    localStorage.setItem('isLogged', true);
    localStorage.setItem('UserData', JSON.stringify(data));
  };

  const logOut = () => {
    setUserData('');
    setIsLogged(false);

    localStorage.removeItem('isLogged');
    localStorage.removeItem('UserData');
  };

  const value = {
    userData,
    isLogged,
    loginUser,
    logOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
