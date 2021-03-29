import axios from '../config/agent';
import mock from '../mocks/$mock';

// Mocks all api requests sent to axios, with a delay time of 500ms
mock(axios).setDelayTime(500);

// Action types.

const GET_BOARDS = 'GET_BOARDS';
const GET_BOARD = 'GET_BOARD';
const ADD_BOARD = 'ADD_BOARD';
const BOARD_ERROR = 'BOARD_ERROR';

// Action creators.

// Get all boards
const getBoards = () => async dispatch => {
  try {
    const { data } = await axios.get('/boards');
    dispatch({
      type: GET_BOARDS,
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: BOARD_ERROR,
      payload: {
        msg: error.responseStatusText,
        status: error.response.status
      }
    });
  }
};

// Get a specific board by id
const getBoardById = id => async dispatch => {
  try {
    const { data } = await axios.get(`/boards/:${id}`);
    dispatch({
      type: GET_BOARD,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: {
        msg: error.responseStatusText,
        status: error.response.status
      }
    });
  }
};

// Create a new board
const addBoard = (data) => async dispatch => {
  try {
    await axios.post('boards/new', data);
    dispatch({
      type: ADD_BOARD,
      paylaod: data
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: {
        msg: error.responseStatusText,
        status: error.response.status
      }
    });
  }
};

// State.

// Creates the initial state.
const initialState = {
  boards: [],
  board: null,
  loading: false,
  error: null
};

// Reducer.

// Applies the given action to the given state.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOARDS:
      return { ...state, boards: action.payload, loading: false, error: null };
    case GET_BOARD:
      return { ...state, board: action.payload, loading: false, error: null };
    case BOARD_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Grouped actions.
const actions = {
  getBoards,
  getBoardById,
  addBoard
};

export {
  actions,
  reducer,
};
