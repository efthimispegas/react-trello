import { v4 as uuidv4 } from 'uuid';

// Action types.

// The type of actions that sets the alert state.
const SET_ALERT = 'SET_ALERT';

// The type of actions that resets the alert state.
const REMOVE_ALERT = 'RESET_ALERT';

// Action creators.

// Creates an action to set a user's keys (action resolved successfully).
const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

// State.

// Creates the initial state.
const initialState = {
  id: null,
  msg: null,
  alertType: null
};

// Reducer.

// Applies the given action to the given state.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, ...action.payload };
    case REMOVE_ALERT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Grouped actions.
const actions = {
  setAlert,
};

export {
  actions,
  reducer,
};
