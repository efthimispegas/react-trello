import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress, Container } from '@material-ui/core'
import { actions as boardsActions } from '../redux/boards';
import Navbar from '../components/Navbar';

const Board = ({ board, match, getBoardById }) => {

  useEffect(() => {
    getBoardById(match.params.id);
    // console.log('===============');
    // console.log('[Board] props:',board);
    // console.log('===============');
  }, [ getBoardById, match.params.id ]);

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
      <div className='board'>{board.title}</div>
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
    board: state.boards.board
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoardById: bindActionCreators(boardsActions.getBoardById, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
