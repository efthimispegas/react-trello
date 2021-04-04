import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Button, ListItem, ListItemText } from '@material-ui/core';
import { actions as cardsActions } from '../redux/cards';

const ArchivedCards = ({
  cards,
  archived,
  unarchiveCard
}) => {

  const onSubmit = (id) => {
    unarchiveCard({ id, cards, archived });
  };

  return (
    <div>
      <List>
        {archived.length ? archived.map((card, i) => {
          return (
            <ListItem key={i}>
              <ListItemText primary={card.title} />
              <Button onClick={() => onSubmit(card._id)}>Send to Board</Button>
            </ListItem>
          );
        }) : ''}
      </List>
    </div>
  );
};

ArchivedCards.propTypes = {
  cards: PropTypes.array.isRequired,
  archived: PropTypes.array.isRequired,
  unarchiveCard: PropTypes.func.isRequired
};

ArchivedCards.defaultProps = {};

const mapStateToProps = state => {
  return {
    cards: state.cards.cards,
    archived: state.cards.archived
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unarchiveCard: bindActionCreators(cardsActions.unarchiveCard, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArchivedCards);
