import React from 'react';
import { Header } from './components/header.jsx';
import './css/App.css';
import { UserProfile } from './Pages/userProfile.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './Pages/loginPage';
import { MainPage } from './Pages/MainPage';
import { UserProvider } from './ContextApi/userData.jsx';
import { AddNotificationPage } from './Pages/AddNotificationPage.jsx';
import { AddCompanyPage } from './Pages/AddCompanyPage.jsx';
import { SearchPage } from './Pages/SearchPage.jsx';
import { NotificationPage } from './Pages/NotificationPage.jsx';
import { YourNotificationsPage } from './Pages/YourNotificationsPage.jsx';
import { UserApplicationsPage } from './Pages/userApplicationsPage.jsx';

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
            <Route path='/search' element={<SearchPage />} />
            <Route path='/notification-page' element={<NotificationPage />} />
            <Route path='/your-notification-page' element={<YourNotificationsPage />} />
            <Route path='/your-applications-page' element={<UserApplicationsPage />} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
