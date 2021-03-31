import React, { useEffect, Fragment } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import CreateBoard from '../components/CreateBoard';
import { actions as boardsActions } from '../redux/boards';

const Dashboard = (props) => {
  useEffect(() => {
    props.getBoards();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <section className='dashboard'>
        <Typography component='h1' variant='h4'>Welcome, Tim</Typography>
        <Typography component='h2' variant='h5'>Your Boards</Typography>
        {props.boards.length === 0 && <CircularProgress className='loading' />}
        <div className='boards'>
          {props.boards.map((board) => (
            <Link key={board._id} to={`/board/${board._id}`} className='board-card'>
              {board.title}
            </Link>
          ))}
          <CreateBoard />
        </div>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  boards: PropTypes.array,
  getBoards: PropTypes.func.isRequired

};
Dashboard.defaultProps = {};

const mapStateToProps = state => {
  return {
    boards: state.boards.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoards: bindActionCreators(boardsActions.getBoards, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
