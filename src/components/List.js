import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as cardsActions } from '../redux/cards';
import { Container } from '@material-ui/core';
import ListTitle from './ListTitle';
import ListMenu from './ListMenu';
import TaskCard from './Card';
import CreateCard from './CreateCard';

const List = ({ originalTitle, id, cards, lists }) => {
  useEffect(() => {
    if(lists.lists.length) {
    }
  }, [cards.length]);

  return (
    <div className='list'>
      <div className='list-top'>
        <ListTitle id={id} originalTitle={originalTitle} />
        <ListMenu id={id} />
      </div>
      <Container component='div' maxWidth='xs' className='cards'>
        {lists.lists.find(l => l._id === id).cards.map(card => {
          return (
            <TaskCard
              key={card._id}
              id={card._id}
              originalTitle={card.title}
              card={card}
            />
          )
        })}
      </Container>
      <CreateCard />
    </div>
  );
};

List.propTypes = {
  originalTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  lists: PropTypes.object.isRequired
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
