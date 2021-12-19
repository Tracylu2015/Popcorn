import './App.css';
import React, {useState} from 'react';
import RegisterPage from './views/RegisterPage';
import LoginPage from './views/LoginPage';
import Navbar from './components/navbar/Navbar';
import UserAccountPage from './views/UserAccountPage';
import MovieDetailPage from './views/MovieDetailPage';
import MainPage from './views/MainPage';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch, Route } from 'react-router-dom';
import BrowsePage from './views/BrowsePage';
import CurrentUser from './context/CurrentUser';


function App() {

  const [currentUser,setCurrentUser] = useState({})

  return (
    <BrowserRouter>
      <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar />
        <Switch>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/user/profile" exact>
            <UserAccountPage />
          </Route>
          <Route path="/movies/detail/:id" exact>
            <MovieDetailPage />
          </Route>
          <Route path="/movies/browse" exact>
            <BrowsePage />
          </Route>
        </Switch>
      </CurrentUser.Provider>
    </BrowserRouter>
  );
}

export default App;
