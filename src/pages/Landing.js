import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <nav className='top'>
        <h2>React Trello</h2>
        <div>
          <Button color='inherit'>
            <Link to='/login'>Login</Link>
          </Button>
          <Button variant='contained'>
            <Link to='/register' className='link'>Sign Up</Link>
          </Button>
        </div>
      </nav>
      <div className='landing-inner'>
        <h1>React Trello</h1>
        <p>Just like <a href='https://trello.com/'>Trello</a>, but made by one developer!</p>
        <div className='buttons'>
          <Button variant='outlined' color='inherit'>
            <Link to='/register' className='link'>Register</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
