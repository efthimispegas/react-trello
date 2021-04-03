import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as ListsActions } from '../redux/lists';

const ListMenu = ({ archiveList, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onArchiveThisList = () => {
    archiveList({ id });
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <MoreHorizIcon />
        </MenuItem>
        <MenuItem onClick={onArchiveThisList}>Archive This List</MenuItem>
      </Menu>
    </div>
  );
};

ListMenu.propTypes = {
  id: PropTypes.string.isRequired,
  archiveList: PropTypes.func.isRequired
};

ListMenu.defaultProps = {};

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    archiveList: bindActionCreators(ListsActions.archiveList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMenu);
