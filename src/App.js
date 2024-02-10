// App.js
import React from 'react';
import { Header } from './components/header.jsx';
import './css/App.css';
import { UserProfile } from './Pages/userProfile.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './Pages/loginPage';
import { MainPage } from './Pages/MainPage';
import { UserProvider } from './ContextApi/userData.jsx';
import { AddNotificationPage } from './Pages/AddNotificationPage.jsx';

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Header />
          <Routes>
            <Route path='/main' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/user-profile' element={<UserProfile />} />
            <Route path='/add-notification' element={<AddNotificationPage />} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
