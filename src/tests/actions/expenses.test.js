/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startAddExpense,
  addExpense,
  removeExpense,
  editExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach(async () => {
  const expensesData = {}
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  })
  await database.ref('expenses').set(expensesData)
})

test('should set up remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  })
})

test('should set up edit expense action object', () => {
  const action = editExpense('123abc', { description: 'rent' })
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      description: 'rent',
    },
  })
})

test('should set up add expense action object with provided values', () => {
  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  })
})

test('should add expense to database and store', done => {
  // make sure database is updated
  // make sure the right dispatch has been called

  const store = createMockStore({})
  const expenseData = {
    description: 'Mouse',
    amount: 2500,
    note: 'This one is better',
    createdAt: 1000,
  }

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      })

      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData)
      done()
    })
})

test('should add expense with defaults to database and store', async () => {
  const store = createMockStore({})
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0,
  }

  await store.dispatch(startAddExpense())
  const actions = store.getActions()
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseDefaults,
    },
  })
  const snapshot = await database
    .ref(`expenses/${actions[0].expense.id}`)
    .once('value')
  expect(snapshot.val()).toEqual(expenseDefaults)
})

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  })
})

test('should fetch the expenses from the firebase', async () => {
  const store = createMockStore({})
  await store.dispatch(startSetExpenses())
  const actions = store.getActions()
  expect(actions[0]).toEqual({
    type: 'SET_EXPENSES',
    expenses, // expenses should be the same as our fixtures
  })
})

test('should remove expenses from the firebase', async () => {
  const store = createMockStore({})
  await store.dispatch(startRemoveExpense({ id: expenses[0].id }))
  const actions = store.getActions()
  expect(actions[0]).toEqual({
    type: 'REMOVE_EXPENSE',
    id: expenses[0].id,
  })
  const snapshot = await database
    .ref(`expenses/${expenses[0].id}`)
    .once('value')
  expect(snapshot.val()).toBeFalsy()
})
