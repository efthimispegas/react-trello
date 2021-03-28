import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.scss';

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/' exact component={Landing} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;
