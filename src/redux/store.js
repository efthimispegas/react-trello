import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as alert from './alert';

const initialState = {};

const middleWare = [thunk];

const rootReducer = combineReducers({
  // Reducer for alerts
  alert: alert.reducer,
});

const store = createStore(
  rootReducer,
  initialState,
  //enhancers
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
