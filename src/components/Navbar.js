import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/dashboard'>Home</Link>
      <Link to='/dashboard'>React Trello</Link>
      <Link to='/'>Logout</Link>
    </nav>
  );
};

export default Navbar;
