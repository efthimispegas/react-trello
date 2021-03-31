import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as cardsActions } from '../redux/cards';
import ListTitle from './ListTitle';

const List = ({ originalTitle, id, cards, getCards }) => {

  useEffect(() => {
    if(!cards.length) {
      // Get list's cards
      getCards(id);
    }
  }, [cards.length]);

  return (
    <div className='list'>
      <div className='list-top'>
        <ListTitle id={id} originalTitle={originalTitle} />
      </div>
    </div>
  );
};

List.propTypes = {
  originalTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  getCards: PropTypes.func.isRequired
};

List.defaultProps = {};

const mapStateToProps = state => {
  return {
    lists: state.lists,
    cards: state.cards.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCards: bindActionCreators(cardsActions.getCards, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
