import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as cardsActions } from '../redux/cards';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import useStyles from '../utils/cardStyles';

const MoveCard = ({
  listId,
  lists,
  cards,
  cardId,
  moveCard
}) => {
  const classes = useStyles();
  const [listObject, setListObject] = useState(null);
  const [ listTitle, setListTitle ] = useState('');
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const thisList = lists.find(list => list._id === listId);
  useEffect(() => {
    // Initialize listObject and listTitle
    !listObject &&
    setListObject(thisList);
    !listTitle &&
    setListTitle(thisList.title);
    // Find this list's cards
    const thisListsCards = cards.filter(card => card.list_id === listId);
    // Set the state
    setListObject(prevState => {
      return {
        ...prevState,
        cards: thisListsCards
      };
    });
    // Set the probable positions according to the list's number of cards
    thisListsCards.length > 0 && setPositions([ ...Array(thisListsCards.length).keys() ]);
    // Set the initial position state equal to the card's position in the list
    setPosition(thisListsCards.findIndex(card => card._id === cardId));
  }, [thisList, cardId]);

  useEffect(() => {
    // console.log('===============');
    // console.log('listObject:',listObject);
    // console.log('===============');
    listObject &&
    listObject.cards.length > 0 ?
    setPositions([ ...Array(listObject.cards.length).keys() ]) : setPositions([0]);
  }, [listObject]);

  useEffect(() => {
    // console.log('===============');
    // console.log('[MoveCard] position:',position);
    // console.log('===============');
  }, [position]);

  const onMove = e => {
    e.preventDefault();
    const moveInfo = {
      cardId,
      list_id: listObject._id,
      position
    };
    // Dispatch a move card action with the destination info
    moveCard(moveInfo);
  };

  return (
    <div className={classes.move}>
      <Typography variant='h6'>Move this card</Typography>
      <div>
        <FormControl className={classes.select}>
          <InputLabel shrink>List</InputLabel>
          <Select
            value={listTitle}
            required
            onChange={e => {
              setListTitle(e.target.value);
              setListObject(lists.find(list => list.title === e.target.value));
            }}
            displayEmpty
          >
            {lists.map((list) => (
              <MenuItem key={list._id} value={list.title}>
                {list.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.select}>
          <InputLabel shrink>Position</InputLabel>
          <Select
            value={position}
            required
            onChange={e => setPosition(e.target.value)}
            displayEmpty
          >
            {positions.map(position => (
              <MenuItem key={position} value={position}>
                {position + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={onMove}
          >
            Move Card
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

MoveCard.propTypes = {
  listId: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  moveCard: PropTypes.func.isRequired
};

MoveCard.defaultProps = {};

const mapStateToProps = state => {
  return {
    lists: state.lists.lists,
    cards: state.cards.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    moveCard: bindActionCreators(cardsActions.moveCard, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveCard);
