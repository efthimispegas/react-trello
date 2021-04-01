import axios from '../config/agent';
import mock from '../mocks/$mock';

// Mocks all api requests sent to axios, with a delay time of 500ms
mock(axios).setDelayTime(500);

// Action types.

const GET_CARDS = 'GET_CARDS';
const GET_CARD = 'GET_CARD';
const ADD_CARD = 'ADD_CARD';
const EDIT_CARD = 'EDIT_CARD';
const CARD_ERROR = 'CARD_ERROR';

// Action creators.

// Get all cards
const getCards = ({ id }) => async dispatch => {
  try {
    const { data } = await axios.get('/cards', { params: { id } });
    dispatch({
      type: GET_CARDS,
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: CARD_ERROR,
      payload: {
        msg: error.responseStatusText,
        status: error.response.status
      }
    });
  }
};

// Get a specific card by id
const getCardById = id => async dispatch => {
  try {
    const { data } = await axios.get(`/card`, { params: { id } });
    dispatch({
      type: GET_CARD,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CARD_ERROR,
      payload: {
        msg: error.responseStatusText,
        status: error.response.status
      }
    });
  }
};

// Create a new card
const addCard = (_data, history) => async dispatch => {
  try {
    const { data } = await axios.post('/cards/new', _data);
    dispatch({
      type: ADD_CARD,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CARD_ERROR,
      payload: {
        msg: error.responseStatusText,
        status: error.response.status
      }
    });
  }
};

// Edit existing card
const editCard = ({ title, id }) => async dispatch => {
  try {
    const { data } = await axios.patch('/card/edit', { title, id });
    dispatch({
      type: EDIT_CARD,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CARD_ERROR,
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
  cards: [],
  card: null,
  error: null
};

// Reducer.

// Applies the given action to the given state.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return { ...state, cards: action.payload, error: null };
    case GET_CARD:
      return { ...state, card: action.payload, error: null };
    case ADD_CARD:
      return { ...state, cards: [...state.cards, action.payload], card: action.payload, error: null };
    case EDIT_CARD:
      return { ...state, card: action.payload, error: null };
    case CARD_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Grouped actions.
const actions = {
  getCards,
  getCardById,
  addCard,
  editCard
};

export {
  actions,
  reducer,
};
