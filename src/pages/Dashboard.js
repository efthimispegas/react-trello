import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/agent';
import mock from '../mocks/$mock';

mock(axios);

const Dashboard = () => {
  const [boards, setBoards] = useState([]);

  const getBoards = async () => {
    const { data } = await axios.get('/boards');
    console.log('===============');
    console.log('[Dashboard] data from axios:', data);
    console.log('===============');
    if(data) {
      setBoards(data);
    }
  }

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <section className='dashboard'>
      <h1>Welcome, Tim</h1>
      <h2>Your Boards</h2>
      <div className='boards'>
        {boards.map((board) => (
          <Link key={board._id} to='/board' className='board-card'>
            {board.title}
          </Link>
        ))}
        <button className='board-card create-board-card'>Create new board</button>
      </div>
    </section>
  );
};

Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default Dashboard;
