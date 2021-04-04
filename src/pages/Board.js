import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress, Container } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { actions as boardsActions } from '../redux/boards';
import { actions as listsActions } from '../redux/lists';
import { actions as cardsActions } from '../redux/cards';
import List from '../components/List';
import Navbar from '../components/Navbar';
import CreateList from '../components/CreateList';
import BoardTitle from '../components/common/title/Title';
import BoardDrawer from '../components/BoardDrawer';

const Board = ({
  board,
  lists,
  cards,
  match,
  dragCard,
  dragList,
  getCards,
  getLists,
  editBoard,
  getBoardById,
  archivedLists,
}) => {
  const [ prevBoard, setBoard ] = useState(board);
  const [ prevLists, setPrevLists ] = useState(lists);
  const [ prevArchivedLists, setPrevArchivedLists ] = useState(archivedLists);

  useEffect(() => {
    // Fetch data on first load
    if(!board) {
      getBoardById(match.params.id);
    }
    if(!lists.length) {
      getLists();
    }
    if(!cards.length) {
      getCards();
    }
    // Every time the board props change, we update the state
    if(board !== prevBoard) {
      setBoard(prevBoard);
      if(!prevBoard) {
        // On first load, set state to the board from props
        setBoard(board);
      }
    }
    if(prevLists.length !== lists.length) {
      setPrevLists(lists);
    }
    if(archivedLists.length !== prevArchivedLists.length) {
      setPrevArchivedLists(archivedLists);
    }
  }, [
    board,
    prevBoard,
    lists.length,
    cards.length,
    prevLists.length,
    archivedLists.length,
    prevArchivedLists.length,
  ]);

  useEffect(() => {

    // console.log('===============');
    // console.log('[Board] lists:',lists);
    // console.log('===============');
  }, [lists])

  const onChange = e => {
    setBoard({ ...prevBoard, title: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    editBoard({ title: prevBoard.title, id: board._id });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if(type === 'card') {
      /**
       * Dispatch a drag card action with params
       * @param { draggableId } String Dragged card's id
       * @param { fromId } String Origin list's id
       * @param { toId } String Destination list's id
       * @param { toIndex } Number Destination list position
       *  */
      const moveInfo = {
        draggableId,
        fromId: source.droppableId,
        toId: destination.droppableId,
        toIndex: destination.index,
        cards
      };
       dragCard(moveInfo);
    } else {
      /**
       * Dispatch a move list action with params
       * @param { draggableId } String Dragged list's id
       * @param { toIndex } Number Destination list position
       *  */
       const moveInfo = {
        draggableId,
        toIndex: destination.index,
        lists
      };
       dragList(moveInfo);
    }
  };

  if (!board || !prevBoard) {
    return (
      <Container component='main' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Fragment>
      <Navbar />
      <section className='board'>
        <div className='board-top'>
          <BoardTitle
            title={prevBoard.title}
            onChange={onChange}
            onSubmit={onSubmit}
          />
          <BoardDrawer />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-lists' direction='horizontal' type='list'>
            {
              provided => (
                <div className='lists' ref={provided.innerRef} { ...provided.droppableProps }>
                  {lists.sort((a, b) => a.position - b.position).map((list, index) => {
                    return (
                      <List
                        list={list}
                        index={index}
                        id={list._id}
                        key={list._id}
                        originalTitle={list.title}
                      />
                    );
                  })}
                  <CreateList />
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
        </DragDropContext>
      </section>
    </Fragment>
  );
};

Board.propTypes = {
  // Required props
  lists: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  getBoardById: PropTypes.func.isRequired,
  getLists: PropTypes.func.isRequired,
  editBoard: PropTypes.func.isRequired,
  getCards: PropTypes.func.isRequired,
  dragCard: PropTypes.func.isRequired,
  dragList: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  // Optional props
  board: PropTypes.object,
  archivedLists: PropTypes.array,
};

Board.defaultProps = {};

const mapStateToProps = state => {
  return {
    board: state.boards.board,
    lists: state.lists.lists,
    cards: state.cards.cards,
    archivedCards: state.cards.archived,
    archivedLists: state.lists.archived,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoardById: bindActionCreators(boardsActions.getBoardById, dispatch),
    getLists: bindActionCreators(listsActions.getLists, dispatch),
    editBoard: bindActionCreators(boardsActions.editBoard, dispatch),
    getCards: bindActionCreators(cardsActions.getCards, dispatch),
    dragCard: bindActionCreators(cardsActions.dragCard, dispatch),
    dragList: bindActionCreators(listsActions.dragList, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
