import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './js/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Questions from './components/questions';
import HomePage from './components/mainPage';
import Score from './components/score';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/questions" component={Questions} />
      <Route exact path="/score" component={Score} />
    </Switch>
  </Router>
)


ReactDOM.render(<Provider store={store}>{routing}</Provider>, document.getElementById('root'));
