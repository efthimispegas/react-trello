import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/dashboard'>
        <h3>Home</h3>
      </Link>
      <Link to='/dashboard'>
        <div className='navbar-title'>
          <img src={process.env.PUBLIC_URL + '/trello.png'} alt='react-trello' />
          <h2>React Trello</h2>
        </div>
      </Link>
      <Link to='/'>
        <h3>Logout</h3>
      </Link>
    </nav>
  );
};

export default Navbar;
