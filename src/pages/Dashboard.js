import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../config/agent';
import mock from '../mocks/$mock';
import CreateBoard from './CreateBoard';

mock(axios);

const Dashboard = () => {
  const [boards, setBoards] = useState([]);

  const getBoards = async () => {
    const { data } = await axios.get('/boards');
    if(data) {
      setBoards(data);
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <section className='dashboard'>
        <h1>Welcome, Tim</h1>
        <h2>Your Boards</h2>
        <div className='boards'>
          {boards.map((board) => (
            <Link key={board._id} to={`/board/${board._id}`} className='board-card'>
              {board.title}
            </Link>
          ))}
          <CreateBoard />
        </div>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default Dashboard;
