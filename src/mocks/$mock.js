/* eslint-disable */
import mockServer from 'axios-mock-server'
import postList from './lists/_postList'
import fetchLists from './lists/_fetchLists'
import fetchListById from './lists/_fetchListById'
import postCard from './cards/_postCard'
import fetchCards from './cards/_fetchCards'
import fetchCardById from './cards/_fetchCardById'
import postBoard from './boards/_postBoard'
import fetchBoards from './boards/_fetchBoards'
import fetchBoardById from './boards/_fetchBoardById'

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
    path: '/lists/:id',
    methods: fetchListById
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
    path: '/cards/:id',
    methods: fetchCardById
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
    path: '/boards/:id',
    methods: fetchBoardById
  }
], client, '')
