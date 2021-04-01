import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField, Card, CardActions, CardContent, Button, CircularProgress } from '@material-ui/core';
import { actions as cardsActions } from '../redux/cards';
import useStyles from '../utils/cardStyles';

const TaskCard = ({ id, card, originalTitle, getCards, cards }) => {
  const classes = useStyles();
  const [ title, setTitle ] = useState(originalTitle);

  useEffect(() => {
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    // editCard({ id });
  };

  if(!originalTitle) {
    return (
      <CircularProgress />
    );
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <form onSubmit={onSubmit}>
          <TextField
            required
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

TaskCard.propTypes = {
  card: PropTypes.object.isRequired,
  originalTitle: PropTypes.string.isRequired,
  key: PropTypes.string,
  id: PropTypes.string.isRequired,
  originalTitle: PropTypes.string.isRequired
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
