import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { CircularProgress, InputBase, TextField, ThemeProvider} from '@material-ui/core';
import { actions as boardActions } from '../redux/boards';
import useStyles from '../utils/boardStyles';
import theme from '../utils/theme';

const BoardTitle = ({ editBoard, originalTitle, board }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(originalTitle);

  useEffect(() => {
    setTitle(originalTitle);
  }, [setTitle, originalTitle]);


  const onSubmit = async (e) => {
    e.preventDefault();
    editBoard({ title, id: board._id });
  };

  if(!board || !originalTitle) {
    return (
      <CircularProgress />
    );
  }

  return (
    <form onSubmit={onSubmit}>
        <TextField
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
  );
};

BoardTitle.propTypes = {
  originalTitle: PropTypes.string.isRequired,
  editBoard: PropTypes.func.isRequired
};
BoardTitle.defaultProps = {};

const mapStateToProps = state => {
  return {
    board: state.boards.board
  };
};

const mapDispathToProps = dispatch => {
  return {
    editBoard: bindActionCreators(boardActions.editBoard, dispatch)
  };
};

export default connect(mapStateToProps, mapDispathToProps)(withRouter(BoardTitle));
