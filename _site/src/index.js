import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Questions from './components/questions';
import HomePage from './components/mainPage';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/questions" component={Questions} />
    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
