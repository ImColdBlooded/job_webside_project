import React from 'react';
import { Header } from './components/header.jsx';
import './css/App.css';
import { UserProfile } from './Pages/userProfile.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Dodajemy Navigate
import { LoginPage } from './Pages/loginPage';
import { MainPage } from './Pages/MainPage';
import { UserProvider } from './ContextApi/userData.jsx';
import { AddNotificationPage } from './Pages/AddNotificationPage.jsx';
import { AddCompanyPage } from './Pages/AddCompanyPage.jsx';

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Navigate to='/main' />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/user-profile' element={<UserProfile />} />
            <Route path='/add-notification' element={<AddNotificationPage />} />
            <Route path='/add-company' element={<AddCompanyPage />} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
