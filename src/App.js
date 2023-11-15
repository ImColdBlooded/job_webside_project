import { SearchBar } from './components/SearchBar';
import { Header } from './components/header';
import './css/App.css';
import { UserProfile } from './components/userProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './components/loginPage';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<SearchBar/>}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/user' element={<UserProfile/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;