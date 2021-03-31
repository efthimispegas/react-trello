import React, { Fragment, useEffect } from 'react';
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

const Board = ({ board, lists, match, getBoardById, getLists }) => {

  useEffect(() => {
    if(!board) {
      getBoardById(match.params.id);
    } else {
      // console.log('===============');
      // console.log('[Board] props: board',board);
      // console.log('===============');
      if(!lists.length) {
        getLists();
      }
    }
  }, [ board, lists ]);

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
        </div>
        <div className='lists'>
          {board.lists.map(list => {
            console.log('===============');
            console.log(`[List]: id ${list._id}`, list);
            console.log('===============');
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
    lists: state.lists.lists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoardById: bindActionCreators(boardsActions.getBoardById, dispatch),
    getLists: bindActionCreators(listsActions.getLists, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
