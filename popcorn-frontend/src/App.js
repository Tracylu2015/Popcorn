import './App.css';
import React from 'react';
import RegisterPage from './views/RegisterPage';
import LoginPage from './views/LoginPage';
import Navbar from './components/Navbar';
import UserAccountPage from './views/UserAccountPage';
import MovieDetailPage from './views/MovieDetailPage';
import MainPage from './views/MainPage';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch, Route } from 'react-router-dom';
import BrowsePage from './views/BrowsePage';
import CommentPage from './views/CommentPage';



function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
