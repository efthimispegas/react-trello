/* eslint-disable */
import mockServer from 'axios-mock-server';
import postList from './lists/_postList';
import fetchLists from './lists/_fetchLists';
import fetchListById from './lists/_fetchListById';
import editList from './lists/_editList';
import dragList from './lists/_dragList';
import archiveList from './lists/_archiveList';
import unarchiveList from './lists/_unarchiveList';
import postCard from './cards/_postCard';
import fetchCards from './cards/_fetchCards';
import fetchCardById from './cards/_fetchCardById';
import editCard from './cards/_editCard';
import moveCard from './cards/_moveCard';
import dragCard from './cards/_dragCard';
import deleteCard from './cards/_deleteCard';
import archiveCard from './cards/_archiveCard';
import unarchiveCard from './cards/_unarchiveCard';
import postBoard from './boards/_postBoard';
import fetchBoards from './boards/_fetchBoards';
import fetchBoardById from './boards/_fetchBoardById';
import editBoard from './boards/_editBoard';

export default (client) => mockServer([
  {
    path: '/lists/new',
    methods: postList
  },
  {
    path: '/lists',
    methods: fetchLists
  },
  {
    path: '/list/:id',
    methods: fetchListById
  },
  {
    path: '/list/edit',
    methods: editList
  },
  {
    path: '/list/drag',
    methods: dragList
  },
  {
    path: '/list/archive',
    methods: archiveList
  },
  {
    path: '/list/unarchive',
    methods: unarchiveList
  },
  {
    path: '/cards/new',
    methods: postCard
  },
  {
    path: '/cards',
    methods: fetchCards
  },
  {
    path: '/card/:id',
    methods: fetchCardById
  },
  {
    path: '/card/edit',
    methods: editCard
  },
  {
    path: '/card/move',
    methods: moveCard
  },
  {
    path: '/card/drag',
    methods: dragCard
  },
  {
    path: '/card/delete',
    methods: deleteCard
  },
  {
    path: '/card/archive',
    methods: archiveCard
  },
  {
    path: '/card/unarchive',
    methods: unarchiveCard
  },
  {
    path: '/boards/new',
    methods: postBoard
  },
  {
    path: '/boards',
    methods: fetchBoards
  },
  {
    path: `/board`,
    methods: fetchBoardById
  },
  {
    path: '/board/edit',
    methods: editBoard
  }
], client, '')
