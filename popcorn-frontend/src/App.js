import './App.css';
import React, { useState } from 'react';
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
import SearchPage from './views/SearchPage';
import axios from "axios"



function App() {

  const [currentUser, setCurrentUser] = useState()
  axios.defaults.withCredentials = true

  if (currentUser == null) {
    if (localStorage.getItem("user") !== null) {
      let user = JSON.parse(localStorage.getItem("user"))
      setCurrentUser(user)
    }
  }


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
          <Route path="/movies/search/:query" exact>
            <SearchPage />
          </Route>
        </Switch>
      </CurrentUser.Provider>
    </BrowserRouter>
  );
}

export default App;
