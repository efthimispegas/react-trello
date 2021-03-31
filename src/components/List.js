import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { actions as cardsActions } from '../redux/cards';
import ListTitle from './ListTitle';

const List = ({ originalTitle, id, cards, getCards }) => {

  useEffect(() => {
    if(!cards.length) {
      // Get list's cards
      getCards(id);
    }
  }, []);

  return (
    <div className='list'>
      <div className='list-top'>
        <ListTitle originalTitle={originalTitle} />
      </div>
    </div>
  );
};

List.propTypes = {};

List.defaultProps = {};

const mapStateToProps = state => {
  return {
    list: state.lists,
    cards: state.cards.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCards: bindActionCreators(cardsActions.getCards, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
