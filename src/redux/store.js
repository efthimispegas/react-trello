import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {};

const middleWare = [thunk];

const rootReducer = combineReducers({});

const store = createStore(
  rootReducer,
  initialState,
  //enhancers
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
