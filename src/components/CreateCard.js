import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CreateCard = () => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setTitle('');
    setAdding(false);
    // Dispatch a post card action
  };

  if(!adding) {
    return (
      <div className='create-card-button'>
        <Button variant='contained' onClick={() => setAdding(true)}>
          Add a card
        </Button>
      </div>
    );
  }
  return (
    <div className='create-card-form'>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant='filled'
          margin='normal'
          fullWidth
          multiline
          required
          id='title'
          label='Enter a title for this card'
          name='title'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Button type='submit' variant='contained' color='primary'>
            Add Card
          </Button>
          <Button onClick={() => setAdding(false)}>
            <CloseIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCard;
