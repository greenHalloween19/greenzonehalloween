import React from 'react';
import { Router } from '@reach/router';
import './App.scss';
import Highscores from './components/Highscores';
import GamePage from './components/GamePage';
import Home from './components/Home';

const App = () => (
  <Router>
    <GamePage path="/play"></GamePage>
    <Highscores path="/highscores"></Highscores>
    <Home default path="/"></Home>
  </Router>
);

export default App;
