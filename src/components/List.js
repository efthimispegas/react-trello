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
import ListTitle from './common/title/Title';

const List = ({
  id,
  list,
  cards,
  editList,
  archivedCards,
  originalTitle,
}) => {
  const [ prevList, setPrevList ] = useState(list);
  const [ prevCards, setPrevCards ] = useState(cards);
  const [ title, setTitle ] = useState(originalTitle);
  useEffect(() => {
    if(prevCards.length !== cards.length) {
      setPrevCards(cards);
    }
    if(!prevList.length) {
      setPrevList(list);
    }
  }, [
    list.length,
    cards.length,
    prevList.length,
    prevCards.length,
  ]);

  useEffect(() => {
    setPrevCards(cards);
  }, [cards, archivedCards]);

  useEffect(() => {
    setPrevList(list);
  }, [list]);

  const onChange = e => {
    setTitle(e.target.value)
  }

  const onSubmit = async e => {
    e.preventDefault();
    editList({ id, title });
  };

  return (
    <div className='list-wrapper'>
      <div className='list-top'>
        <ListTitle
          title={title}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        <ListMenu id={id} />
      </div>
      <div className='list'>
        <Container component='div' maxWidth='xs' className='cards'>
          {prevCards.sort((a, b) => a.position - b.position).map(card => {
            if(card.list_id === id) {
              return (
                <TaskCard
                  key={card._id}
                  id={card._id}
                  originalTitle={card.title}
                  card={card}
                  listId={id}
                />
              );
            }
          })}
        </Container>
      </div>
      <Container component='div' className='list-action'>
        <CreateCard listId={id}/>
      </Container>
    </div>
  );
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  editList: PropTypes.func.isRequired,
  archivedCards: PropTypes.array.isRequired,
  originalTitle: PropTypes.string.isRequired,
};

List.defaultProps = {};

const mapStateToProps = state => {
  return {
    lists: state.lists.lists,
    cards: state.cards.cards,
    archivedCards: state.cards.archived,
    archivedLists: state.lists.archived,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCards: bindActionCreators(cardsActions.getCards, dispatch),
    editList: bindActionCreators(listsActions.editList, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
