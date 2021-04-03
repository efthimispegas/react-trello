import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardContent, CircularProgress, Typography, Grid, Modal, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { actions as cardsActions } from '../redux/cards';
import useStyles from '../utils/cardStyles';
import CardModal from './cardModal/CardModal';

const TaskCard = ({ editCard, card, originalTitle }) => {
  const classes = useStyles();
  const [ cardData, setCardData ] = useState(card);
  const [ placeholders, setPlaceholders ] = useState([ card.title, card.priority, card.description ]);
  const [ mouseOverCard, setMouseOverCard ] = useState(false);
  const [ mouseOverEdit, setMouseOverEdit ] = useState(false);
  const [ mouseOverDelete, setMouseOverDelete ] = useState(false);
  const [ open, setOpen ] = useState(false);
  useEffect(() => {
    if(!placeholders.length && card) {
      setPlaceholders([
        card.title,
        card.priority,
        card.description
      ]);
    }
  }, [ placeholders.length ]);

  const onEditCard = () => {
    // Open modal to edit card details
    setOpen(true);
  };

  const onDeleteCard = () => {
    // Dispatch delete card action
  };

  const onSubmitEdit = e => {
    e.preventDefault();
    // Dispatch update card action
    editCard({ card: cardData });
    // Close modal
    setOpen(false);
    setMouseOverCard(false);
  };

  const onModalClose = () => {
    setOpen(false);
    setMouseOverCard(false);
  };

  const onChange = e => {
    setCardData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  if(!originalTitle) {
    return (
      <CircularProgress />
    );
  }
  return (
    <Card
      onMouseEnter={() => setMouseOverCard(true)}
      onMouseLeave={() => setMouseOverCard(false)}
      className={classnames(classes.root, `${mouseOverCard ? 'mouse-over' : ''}`)}
    >
      <CardContent className={classes.content}>
        <Grid container className={classes.content}>
          <Grid xs={8} item>
            <Typography component='p' variant='body1'>{cardData.title}</Typography>
            <Typography component='p' variant='body2'>
              {cardData.description.length > 25 ?
              `${cardData.description.substr(0,22)}...` :
              cardData.description}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              onClick={onEditCard}
              onMouseEnter={() => setMouseOverEdit(true)}
              onMouseLeave={() => setMouseOverEdit(false)}
              className={classnames('icon', `${mouseOverEdit ? 'edit' : 'unfocused'}`, `${mouseOverCard ? '' : 'hide'}`)}
            >
              <EditIcon fontSize='small'/>
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              onClick={onDeleteCard}
              onMouseEnter={() => setMouseOverDelete(true)}
              onMouseLeave={() => setMouseOverDelete(false)}
              className={classnames('icon', `${mouseOverDelete ? 'delete' : 'unfocused'}`, `${mouseOverCard ? '' : 'hide'}`)}
            >
              <DeleteIcon fontSize='small'/>
            </IconButton>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={onModalClose}
          className={classes.modal}
        >
          <CardModal
            title='Edit card'
            placeholders={placeholders}
            cardData={cardData}
            onChange={onChange}
            onModalClose={onModalClose}
            onSubmit={onSubmitEdit}
          />
        </Modal>
      </CardContent>
    </Card>
  );
};

TaskCard.propTypes = {
  card: PropTypes.object.isRequired,
  originalTitle: PropTypes.string.isRequired,
  editCard: PropTypes.func.isRequired,
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
    getCards: bindActionCreators(cardsActions.getCards, dispatch),
    editCard: bindActionCreators(cardsActions.editCard, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);
