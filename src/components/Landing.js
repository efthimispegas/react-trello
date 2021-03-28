import React from 'react';
import { Button } from '@material-ui/core';

const Landing = () => {
  return (
    <section className='landing'>
      <nav className='navbar'>
        <h2>React Trello</h2>
        <div>
          <Button color='inherit'>Login</Button>
          <Button variant='contained'>Sign Up</Button>
        </div>
      </nav>
      <div className='landing-inner'>
        <h1>React Trello</h1>
        <p>Just like <a href='https://trello.com/'>Trello</a>, but made by one developer!</p>
        <div className='buttons'>
          <Button variant='outlined' color='inherit'>
            Continue
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
