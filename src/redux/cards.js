import axios from '../config/agent';
import mock from '../mocks/$mock';

// Mocks all api requests sent to axios, with a delay time of 500ms
mock(axios).setDelayTime(500);

// Action types.

const GET_CARDS = 'GET_CARDS';
const GET_CARD = 'GET_CARD';
const ADD_CARD = 'ADD_CARD';
const EDIT_CARD = 'EDIT_CARD';
const MOVE_CARD = 'MOVE_CARD';
const DELETE_CARD = 'DELETE_CARD';
const ARCHIVE_CARD = 'ARCHIVE_CARD';
const UNARCHIVE_CARD = 'UNARCHIVE_CARD';
const CARD_ERROR = 'CARD_ERROR';

// Action creators.

// Get all cards
const getCards = () => async dispatch => {
  try {
    const { data } = await axios.get('/cards');
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
const addCard = (_data) => async dispatch => {
  try {
    const { data } = await axios.post('/cards/new', _data );
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
const editCard = ({ card, cards }) => async dispatch => {
  try {
    const { data } = await axios.patch('/card/edit', { card, cards });
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

// Move card to a new position and/or list
const moveCard = (moveInfo) => async dispatch => {
  try {
    const { data } = await axios.patch('/card/move', moveInfo);
    dispatch({
      type: MOVE_CARD,
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

// Delete card to a new position and/or list
const deleteCard = ({ id, cards }) => async dispatch => {
  try {
    const { data } = await axios.delete('/card/delete', { params: { id, cards } });
    dispatch({
      type: DELETE_CARD,
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

// Archive existing card
const archiveCard = ({ id, cards, archived }) => async dispatch => {
  try {
    const { data } = await axios.delete('/card/archive', { params: { id, cards, archived } });
    dispatch({
      type: ARCHIVE_CARD,
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

// Unarchive card
const unarchiveCard = ({ id, cards, archived }) => async dispatch => {
  try {
    const { data } = await axios.delete('/card/unarchive', { params: { id, cards, archived } });
    dispatch({
      type: UNARCHIVE_CARD,
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
  archived: [],
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
      return { ...state, cards: [...action.payload.cards], card: action.payload.card, error: null };
    case EDIT_CARD:
      return { ...state, cards: [...action.payload.cards], card: action.payload.card, error: null };
    case MOVE_CARD:
      return { ...state, cards: [...action.payload.cards], card: action.payload.card, error: null };
    case DELETE_CARD:
      return { ...state, cards: [...action.payload.cards], card: null, error: null };
    case ARCHIVE_CARD:
      return { ...state, cards: [...action.payload.cards], archived: [ ...state.archived, ...action.payload.archived ], error: null };
    case UNARCHIVE_CARD:
      return { ...state, cards: [ ...action.payload.cards ], archived: [ ...action.payload.archived ], error: null };
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
  editCard,
  moveCard,
  deleteCard,
  archiveCard,
  unarchiveCard
};

export {
  actions,
  reducer,
};
