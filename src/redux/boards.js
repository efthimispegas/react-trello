import axios from '../config/agent';
import mock from '../mocks/$mock';

// Mocks all api requests sent to axios, with a delay time of 500ms
mock(axios).setDelayTime(500);

// Action types.

const GET_BOARDS = 'GET_BOARDS';
const GET_BOARD = 'GET_BOARD';
const ADD_BOARD = 'ADD_BOARD';
const EDIT_BOARD = 'EDIT_BOARD';
const CLEAR_BOARD = 'CLEAR_BOARD';
const BOARD_ERROR = 'BOARD_ERROR';

// Action creators.

// Get all boards
const getBoards = () => async dispatch => {
  try {
    dispatch({ type: CLEAR_BOARD });
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
    const { data } = await axios.get(`/board`, { params: { id } });
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
const addBoard = (_data, history) => async dispatch => {
  try {
    const { data } = await axios.post('/boards/new', _data);
    dispatch({
      type: ADD_BOARD,
      payload: data
    });
    // Navigate to the newly created board
    history.push(`/board/${data._id}`);
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

// Edit existing board
const editBoard = ({ title, id }) => async dispatch => {
  try {
    const { data } = await axios.patch('/board/edit', { title, id });
    dispatch({
      type: EDIT_BOARD,
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

// State.

// Creates the initial state.
const initialState = {
  boards: [],
  board: null,
  error: null
};

// Reducer.

// Applies the given action to the given state.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOARDS:
      return { ...state, boards: action.payload, error: null };
    case GET_BOARD:
      return { ...state, board: action.payload, error: null };
    case ADD_BOARD:
      return { ...state, boards: [...state.boards, action.payload], board: action.payload, error: null };
    case EDIT_BOARD:
      return { ...state, board: action.payload, error: null };
    case CLEAR_BOARD:
      return { ...state, board: null, error: null };
    case BOARD_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Grouped actions.
const actions = {
  getBoards,
  getBoardById,
  addBoard,
  editBoard
};

export {
  actions,
  reducer,
};
