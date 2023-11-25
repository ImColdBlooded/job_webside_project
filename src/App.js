// App.js
import React from 'react';
import { SearchBar } from './components/SearchBar';
import { Header } from './components/header.jsx';
import './css/App.css';
import { UserProfile } from './components/userProfile.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './components/loginPage';
import { UserProvider } from './ContextApi/userData.jsx';

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Header />
          <Routes>
            <Route path='/' element={<SearchBar />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/user-profile' element={<UserProfile />} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
