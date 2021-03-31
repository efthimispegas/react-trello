import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as boards from './boards';
import * as lists from './lists';
import * as cards from './cards';

// Create logger
const logger = createLogger({ diff: true, collapsed: true });

// Create middleware
const middleWare = [thunk, logger];

const rootReducer = combineReducers({
  // Reducer for boards
  boards: boards.reducer,
  // Reducer for lists
  lists: lists.reducer,
  // Reducer for cards
  cards: cards.reducer,
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
