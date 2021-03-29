import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as boards from './boards';

// Create logger
const logger = createLogger({ diff: true, collapsed: true });

// Create middleware
const middleWare = [thunk, logger];

const rootReducer = combineReducers({
  // Reducer for alerts
  boards: boards.reducer
});

// Configure store
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  //enhancers
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
