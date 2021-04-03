import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Container, Grid, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../../utils/cardStyles';

const CardModal = ({
  onModalClose,
  onSubmit,
  placeholders,
  title,
  cardData,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <Container component='div' maxWidth='md' className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={onModalClose}>
            <CloseIcon fontSize='small' />
          </Button>
        </Grid>
      </Grid>
      <Typography component='h2' variant='h5'>{title}</Typography>
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
              required
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
        <Grid container direction='row' alignItems='center' justify='center' className={classes.content}>
          <Grid item xs={4}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Save Changes
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
