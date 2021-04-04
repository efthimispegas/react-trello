import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import MoveCard from '../../MoveCard';
import useStyles from '../../../utils/cardStyles';

const CardModal = ({
  onModalClose,
  onSubmit,
  placeholders,
  title,
  listId,
  cardData,
  onChange,
  onDeleteCard,
  onArchiveCard,
  disabled
}) => {
  const classes = useStyles();

  return (
    <Container component='div' maxWidth='md' className={classnames('card-modal', classes.paper)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={onModalClose}>
            <CloseIcon fontSize='small' />
          </Button>
        </Grid>
      </Grid>
      <Typography variant='h6'>{title}</Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='title'
              label='Card title'
              placeholder={placeholders[0]}
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
              id='priority'
              label='Priority'
              type='number'
              name='priority'
              onChange={onChange}
              value={cardData.priority}
              placeholder={placeholders[1]}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rowsMax={5}
              id='description'
              label='Description'
              placeholder={placeholders[2]}
              name='description'
              value={cardData.description}
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <Grid container wrap='nowrap' alignItems='flex-end' spacing={2}>
          <Grid item xs={8}>
            <MoveCard
              listId={listId}
              cardId={cardData._id}
            />
          </Grid>
          <Grid container xs={4} direction='column' alignItems='flex-end'>
            <Grid item className={classes.content}>
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                disabled={disabled}
                onClick={onDeleteCard}
                className={classes.button}
              >
                Delete Card
              </Button>
            </Grid>
            <Grid item className={classes.content}>
              <Button
                type='submit'
                variant='contained'
                disabled={disabled}
                onClick={onArchiveCard}
                className={classes.button}
              >
                Archive Card
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justify='center'>
          <Grid item xs={4} className={classes.content}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Save All Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

CardModal.proTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholders: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  cardData: PropTypes.array.isRequired,
};

CardModal.defaultProps = {};

export default CardModal;
