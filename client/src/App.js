import React from 'react';
import { Router } from '@reach/router';
import './App.scss';
import Test from './components/Test';

const App = () => (
  <Router>
    <Test path="/"></Test>
  </Router>
);

export default App;
