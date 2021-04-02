import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as cardsActions } from '../redux/cards';
import { TextField, Button, Modal, Container, Typography, Grid } from '@material-ui/core';
import useStyles from '../utils/cardStyles';

const CreateCard = ({ cards, addCard, listId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cardData, setCardData] = useState({ title: '', description: '', priority: 0 });

  const onChange = e => {
    setCardData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const onClose = () => {
    setCardData({ title: '', description: '', priority: 0 })
    setOpen(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // Dispatch a post card action
    addCard({ ...cardData, list_id: listId });
    // Clear the create card form
    setCardData({ title: '', description: '', priority: 0 });
    // Close the modal
    setOpen(false);
  };

  const body = (
    <Container component='div' maxWidth='md' className={classes.paper}>
      <Typography component='h2' variant='h5'>Create a card</Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='title'
              label='Card title'
              placeholder='New Card'
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
              placeholder='0'
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
              placeholder='Add a description here'
              name='description'
              value={cardData.description}
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.button}
        >
          Add Card
        </Button>
      </form>
    </Container>
  );
  return (
    <div>
      <Button
        variant='contained'
        onClick={() => setOpen(true)}
      >
        Add a card
      </Button>
      <Modal open={open} onClose={onClose} className={classes.modal}>
        {body}
      </Modal>
    </div>
  );
};

CreateCard.propTypes = {
  listId: PropTypes.string.isRequired,
  addCard: PropTypes.func.isRequired
};

CreateCard.defaultProps = {};

const mapStateToProps = state => {
  return {
    cards: state.cards.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCard: bindActionCreators(cardsActions.addCard, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);
