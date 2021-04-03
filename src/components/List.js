import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as cardsActions } from '../redux/cards';
import { actions as listsActions } from '../redux/lists';
import { Container } from '@material-ui/core';
import TaskCard from './Card';
import ListMenu from './ListMenu';
import CreateCard from './CreateCard';
import ListTitle from '../components/title/Title';

const List = ({
  originalTitle,
  id,
  cards,
  editList
}) => {
  const [ prevCards, setPrevCards ] = useState(cards);
  const [ title, setTitle ] = useState(originalTitle);

  useEffect(() => {
    if(prevCards.length !== cards.length) {
      setPrevCards(cards);
    }
  }, [prevCards.length, cards.length]);

  const onChange = e => {
    setTitle(e.target.value)
  }

  const onSubmit = async e => {
    e.preventDefault();
    editList({ id, title });
  };

  return (
    <div className='list'>
      <div className='list-top'>
        <ListTitle
          title={title}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        <ListMenu id={id} />
      </div>
      <Container component='div' maxWidth='xs' className='cards'>
        {prevCards.map(card => {
          if(card.list_id === id) {
            return (
              <TaskCard
                key={card._id}
                id={card._id}
                originalTitle={card.title}
                card={card}
              />
            );
          }
        })}
      </Container>
      <Container component='div' className='list-action'>
        <CreateCard listId={id}/>
      </Container>
    </div>
  );
};

List.propTypes = {
  originalTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  lists: PropTypes.object.isRequired,
  editList: PropTypes.func.isRequired
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
    getCards: bindActionCreators(cardsActions.getCards, dispatch),
    editList: bindActionCreators(listsActions.editList, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
