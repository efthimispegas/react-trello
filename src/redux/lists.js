import axios from '../config/agent';
import mock from '../mocks/$mock';

// Mocks all api requests sent to axios, with a delay time of 500ms
mock(axios).setDelayTime(500);

// Action types.

const GET_LISTS = 'GET_LISTS';
const GET_LIST = 'GET_LIST';
const ADD_LIST = 'ADD_LIST';
const EDIT_LIST = 'EDIT_LIST';
const ARCHIVE_LIST = 'ARCHIVE_LIST';
const LIST_ERROR = 'LIST_ERROR';

// Action creators.

// Get all lists
const getLists = () => async dispatch => {
  try {
    const { data } = await axios.get('/lists');
    dispatch({
      type: GET_LISTS,
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: LIST_ERROR,
      payload: {
        msg: error.responseStatusText,
        status: error.response.status
      }
    });
  }
};

// Get a specific list by id
const getListById = id => async dispatch => {
  try {
    const { data } = await axios.get(`/list`, { params: { id } });
    dispatch({
      type: GET_LIST,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_ERROR,
      payload: {
        msg: error.responseStatusText,
        status: error.response.status
      }
    });
  }
};

// Create a new list
const addList = (_data, history) => async dispatch => {
  try {
    const { data } = await axios.post('/lists/new', _data);
    dispatch({
      type: ADD_LIST,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_ERROR,
      payload: {
        msg: error.responseStatusText,
        status: error.response.status
      }
    });
  }
};

// Edit existing list
const editList = ({ title, id }) => async dispatch => {
  try {
    const { data } = await axios.patch('/list/edit', { title, id });
    dispatch({
      type: EDIT_LIST,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_ERROR,
      payload: {
        msg: error.responseStatusText,
        status: error.response.status
      }
    });
  }
};

// Archive existing list
const archiveList = ({ id }) => async dispatch => {
  try {
    const { data } = await axios.delete('/list/archive', { params: { id } });
    dispatch({
      type: ARCHIVE_LIST,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_ERROR,
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
  lists: [],
  list: null,
  archived: [],
  error: null
};

// Reducer.

// Applies the given action to the given state.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTS:
      return { ...state, lists: action.payload, error: null };
    case GET_LIST:
      return { ...state, list: action.payload, error: null };
    case ADD_LIST:
      return { ...state, lists: [...state.lists, action.payload], list: action.payload, error: null };
    case EDIT_LIST:
      return { ...state, list: action.payload, error: null };
    case ARCHIVE_LIST:
      return { ...state, list: null, lists: state.lists.filter(list => list._id !== action.payload._id), archived: [...state.archived, action.payload], error: null };
    case LIST_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Grouped actions.
const actions = {
  getLists,
  getListById,
  addList,
  editList,
  archiveList
};

export {
  actions,
  reducer,
};
