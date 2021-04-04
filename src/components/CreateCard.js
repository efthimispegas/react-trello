import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as cardsActions } from '../redux/cards';
import { Button, Modal } from '@material-ui/core';
import CardModal from './common/cardModal/CardModal';
import useStyles from '../utils/cardStyles';

const CreateCard = ({
  addCard,
  listId,
  cards
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const placeholders = [ 'Title', 'Priority', 'Description' ];
  const [cardData, setCardData] = useState({ title: '', description: '', priority: 0 });

  const onChange = e => {
    setCardData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const onModalClose = () => {
    setCardData({ title: '', description: '', priority: 0 })
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Dispatch a post card action
    addCard({ ...cardData, list_id: listId, cards });
    // Clear the create card form
    setCardData({ title: '', description: '', priority: 0 });
    // Close the modal
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='contained'
        onClick={() => setOpen(true)}
      >
        + Add a card
      </Button>
      <Modal
        open={open}
        onClose={onModalClose}
        className={classes.modal}
      >
        <CardModal
          title='Create card'
          placeholders={placeholders}
          cardData={cardData}
          onChange={onChange}
          onModalClose={onModalClose}
          onSubmit={onSubmit}
          listId={listId}
          disabled={true}
        />
      </Modal>
    </div>
  );
};

CreateCard.propTypes = {
  cards: PropTypes.array.isRequired,
  addCard: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
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
