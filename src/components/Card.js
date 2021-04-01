import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardContent, Button, CircularProgress, Typography, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { actions as cardsActions } from '../redux/cards';
import useStyles from '../utils/cardStyles';

const TaskCard = ({ card, originalTitle }) => {
  const classes = useStyles();
  const [ mouseOver, setMouseOver ] = useState(false);

  useEffect(() => {
  }, []);

  const onEditCard = () => {
    console.log('===============');
    console.log('[Card] Edit Card with details:', card);
    console.log('===============');
    // Open modal to edit card details

    // Dispatch edit card action
  };

  const onDeleteCard = () => {
    console.log('===============');
    console.log('[Card] Delete Card with details:', card);
    console.log('===============');
    // Dispatch delete card action
  };

  if(!originalTitle) {
    return (
      <CircularProgress />
    );
  }
  return (
    <Card
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className={classnames(classes.root, `${mouseOver ? 'mouse-over' : ''}`)}
    >
      <CardContent className={classes.content}>
        <Grid container xs={12} className={classes.content}>
          <Grid xs={8} item>
            <Typography component='p' variant='body1'>{card.title}</Typography>
          </Grid>
          <Grid item xs={2} justify='flex-end'>
            <Button className={classnames(`${mouseOver ? '' : 'hide'}`)} onClick={onEditCard}>
              <EditIcon fontSize='small' className={classes.icon} />
            </Button>
          </Grid>
          <Grid item xs={2} justify='flex-end'>
            <Button className={classnames(`${mouseOver ? '' : 'hide'}`)} onClick={onDeleteCard}>
              <DeleteIcon fontSize='small' className={classes.icon} />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TaskCard.propTypes = {
  card: PropTypes.object.isRequired,
  originalTitle: PropTypes.string.isRequired,
  key: PropTypes.string,
  id: PropTypes.string
};

TaskCard.defaultProps = {};

const mapStateToProps = state => {
  return {
    cards: state.cards.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCards: bindActionCreators(cardsActions.getCards, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);
