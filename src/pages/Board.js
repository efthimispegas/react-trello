import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress, Container } from '@material-ui/core'
import { actions as boardsActions } from '../redux/boards';
import { actions as listsActions } from '../redux/lists';
import { actions as cardsActions } from '../redux/cards';
import Navbar from '../components/Navbar';
import BoardTitle from '../components/BoardTitle';
import CreateList from '../components/CreateList';
import List from '../components/List';
import BoardDrawer from '../components/BoardDrawer';
import cards from '../data/cards';

const Board = ({
  board,
  lists,
  cards,
  archived,
  match,
  getBoardById,
  getLists,
  getCards
}) => {
  const [ prevLists, setPrevLists ] = useState(lists);
  const [ prevArchived, setPrevArchived ] = useState(archived);

  useEffect(() => {
    if(!board) {
      getBoardById(match.params.id);
    }
    if(!lists.length) {
      getLists();
    }
    if(!cards.length) {
      getCards();
    }
    if(prevLists.length !== lists.length) {
      setPrevLists(lists);
    }
    if(archived.length !== prevArchived.length) {
      setPrevArchived(lists);
    }
  }, [
    board,
    lists.length,
    cards.length,
    prevLists.length,
    archived.length,
    prevArchived.length
  ]);

  if (!board) {
    return (
      <Container component='main' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Fragment>
      <Navbar />
      <section className='board'>
        <div className='board-top'>
          <BoardTitle originalTitle={board.title} />
          <BoardDrawer />
        </div>
        <div className='lists'>
          {prevLists.map(list => {
            return (
              <List
                key={list._id}
                id={list._id}
                originalTitle={list.title}
              />
            );
          })}
          <CreateList />
        </div>
      </section>
    </Fragment>
  );
};

Board.propTypes = {
  // Required props
  lists: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  getBoardById: PropTypes.func.isRequired,
  getLists: PropTypes.func.isRequired,
  getCards: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  // Optional props
  board: PropTypes.object,
  archived: PropTypes.array,
};

Board.defaultProps = {};

const mapStateToProps = state => {
  return {
    board: state.boards.board,
    lists: state.lists.lists,
    cards: state.cards.cards,
    archived: state.lists.archived
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoardById: bindActionCreators(boardsActions.getBoardById, dispatch),
    getLists: bindActionCreators(listsActions.getLists, dispatch),
    getCards: bindActionCreators(cardsActions.getCards, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
