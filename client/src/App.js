import React from 'react';
import { Router } from '@reach/router';
import './App.scss';
import Highscores from './components/Highscores';
import GamePage from './components/GamePage';
import Home from './components/Home';
import ResultsSection from './components/ResultsSection';

const App = () => (
  <Router>
    <GamePage path="/play"></GamePage>
    <Highscores path="/highscores"></Highscores>
    <ResultsSection path="/highscores/:id"></ResultsSection>
    <Home default></Home>
  </Router>
);

export default App;
