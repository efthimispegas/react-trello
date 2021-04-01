import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress, Container } from '@material-ui/core'
import { actions as boardsActions } from '../redux/boards';
import { actions as listsActions } from '../redux/lists';
import Navbar from '../components/Navbar';
import BoardTitle from '../components/BoardTitle';
import CreateList from '../components/CreateList';
import List from '../components/List';
import BoardDrawer from '../components/BoardDrawer';

const Board = ({ board, lists, archived, match, getBoardById, getLists }) => {
  const [ prevLists, setPrevLists ] = useState(lists);
  const [ prevArchived, setPrevArchived ] = useState(archived);

  useEffect(() => {
    if(!board) {
      getBoardById(match.params.id);
    }
    if(!lists.length) {
      getLists();
    }
    if(prevLists.length !== lists.length) {
      setPrevLists(lists);
    }
    if(archived.length !== prevArchived.length) {
      setPrevArchived(lists);
    }
  }, [ board, lists, lists.length, archived.length ]);

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
  // board: PropTypes.object.isRequired,
  getBoardById: PropTypes.func.isRequired
};

Board.defaultProps = {};

const mapStateToProps = state => {
  return {
    board: state.boards.board,
    lists: state.lists.lists,
    archived: state.lists.archived
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoardById: bindActionCreators(boardsActions.getBoardById, dispatch),
    getLists: bindActionCreators(listsActions.getLists, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
