import React from 'react';
import { Router } from '@reach/router';
import './App.scss';
import Test from './components/Test';
import Highscores from './components/Highscores';

const App = () => (
  <Router>
    <Test path="/"></Test>
    <Highscores path="/highscores"></Highscores>
  </Router>
);

export default App;
