import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardContent, Button, TextField, CircularProgress, Typography, Grid, Container, Modal } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { actions as cardsActions } from '../redux/cards';
import useStyles from '../utils/cardStyles';

const TaskCard = ({ card, originalTitle }) => {
  const classes = useStyles();
  const [ cardData, setCardData ] = useState(card);
  const [ mouseOver, setMouseOver ] = useState(false);
  const [ editting, setEditting ] = useState(false);
  const [ open, setOpen ] = useState(false);

  useEffect(() => {
  }, []);

  const onEditCard = () => {
    console.log('===============');
    console.log('[Card] Edit Card with details:', card);
    console.log('===============');
    // Open modal to edit card details
    setOpen(true);
    setEditting(true);
  };

  const onDeleteCard = () => {
    console.log('===============');
    console.log('[Card] Delete Card with details:', card);
    console.log('===============');
    // Dispatch delete card action
  };

  const onSubmitEdit = e => {
    e.preventDefault();
    // Dispatch update card action

    // Close modal
    setOpen(false);
    setEditting(false);
    setMouseOver(false);
  };

  const onModalClose = () => {
    setEditting(false);
    setOpen(false);
    setMouseOver(false);
  };

  const onChange = e => {
    setCardData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const renderCardContent = () => {
    if(!editting) {
      return (
        <Typography component='p' variant='body1'>{card.title}</Typography>
      );
    }
    return (
      <Container component='div' maxWidth='md' className={classes.paper}>
        <Typography component='h2' variant='h5'>Edit card</Typography>
        <form onSubmit={onSubmitEdit}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='title'
                label='Card title'
                placeholder={card.title}
                name='title'
                autoFocus
                value={cardData.title}
                onChange={onChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='title'
                label='Priority'
                placeholder={toString(card.priority)}
                name='priority'
                value={cardData.priority}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                multiline
                id='description'
                label='Description'
                placeholder={card.description}
                name='description'
                value={cardData.description}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.content}>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Save Changes
              </Button>
              <Grid item xs={4} />
            </Grid>
          </Grid>
        </form>
      </Container>
    );
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
        <Grid container className={classes.content}>
          <Grid xs={8} item>
            <Typography component='p' variant='body1'>{card.title}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button className={classnames(`${mouseOver ? '' : 'hide'}`)} onClick={onEditCard}>
              <EditIcon fontSize='small' className={classes.icon} />
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button className={classnames(`${mouseOver ? '' : 'hide'}`)} onClick={onDeleteCard}>
              <DeleteIcon fontSize='small' className={classes.icon} />
            </Button>
          </Grid>
        </Grid>
        <Modal open={open} onClose={onModalClose} className={classes.modal}>
          {renderCardContent()}
        </Modal>
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
