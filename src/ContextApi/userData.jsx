// UserContext.js
import { createContext, useContext, useState } from 'react';
//https://www.youtube.com/watch?v=cwZXiUkBW1w -> korzystałem z tego filmu

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
  };

  const logOut = () => {
    setUserData('');
    setIsLogged(false);
  };

  const value = {
    userData,
    isLogged,
    loginUser,
    logOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
