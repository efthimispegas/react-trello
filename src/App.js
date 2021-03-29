import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.scss';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Board from './pages/Board';

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/board/:id' exact component={Board} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;
