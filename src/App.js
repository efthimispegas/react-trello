import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Board from './pages/Board';

const App = () => {
  return (
    <Fragment>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/board' exact component={Board} />
            </Switch>
          </Fragment>
        </Router>
    </Fragment>
  );
};

export default App;
