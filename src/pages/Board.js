import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress, Container } from '@material-ui/core'
import { actions as boardsActions } from '../redux/boards';
import { actions as listsActions } from '../redux/lists';
import { actions as cardsActions } from '../redux/cards';
import List from '../components/List';
import Navbar from '../components/Navbar';
import CreateList from '../components/CreateList';
import BoardTitle from '../components/common/title/Title';
import BoardDrawer from '../components/BoardDrawer';

const Board = ({
  board,
  lists,
  cards,
  archived,
  match,
  editBoard,
  getBoardById,
  getLists,
  getCards
}) => {
  const [ prevBoard, setBoard ] = useState(board);
  const [ prevLists, setPrevLists ] = useState(lists);
  const [ prevArchived, setPrevArchived ] = useState(archived);

  useEffect(() => {
    // Fetch data on first load
    if(!board) {
      getBoardById(match.params.id);
    }
    if(!lists.length) {
      getLists();
    }
    if(!cards.length) {
      getCards();
    }
    // Every time the board props change, we update the state
    if(board !== prevBoard) {
      setBoard(prevBoard);
      if(!prevBoard) {
        // On first load, set state to the board from props
        setBoard(board);
      }
    }
    if(prevLists.length !== lists.length) {
      setPrevLists(lists);
    }
    if(archived.length !== prevArchived.length) {
      setPrevArchived(lists);
    }
  }, [
    board,
    prevBoard,
    lists.length,
    cards.length,
    archived.length,
    prevLists.length,
    prevArchived.length
  ]);

  const onChange = e => {
    setBoard({ ...prevBoard, title: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    editBoard({ title: prevBoard.title, id: board._id });
  };

  if (!board || !prevBoard) {
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
          <BoardTitle
            title={prevBoard.title}
            onChange={onChange}
            onSubmit={onSubmit}
          />
          <BoardDrawer />
        </div>
        <div className='lists'>
          {prevLists.map(list => {
            return (
              <List
                key={list._id}
                id={list._id}
                originalTitle={list.title}
                list={list}
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
  editBoard: PropTypes.func.isRequired,
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
    editBoard: bindActionCreators(boardsActions.editBoard, dispatch),
    getCards: bindActionCreators(cardsActions.getCards, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
