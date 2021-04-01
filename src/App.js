import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.scss';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Board from './pages/Board';
import Login from './pages/Login';
import Register from './pages/Register';
import theme from './utils/theme';

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Fragment>
              <Switch>
                <Route path='/' exact component={Landing} />
                <Route path='/dashboard' exact component={Dashboard} />
                <Route path='/board/:id' exact component={Board} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
              </Switch>
            </Fragment>
          </Router>
        </ThemeProvider>
      </Provider>
    </Fragment>
  );
};

export default App;
