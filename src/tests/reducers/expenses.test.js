/* eslint-env jest */
import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[0].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: 'nonexistent',
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const newExpense = {
    id: '4',
    description: 'Glaceon',
    note: '',
    amount: 6000,
    createdAt: moment(0).add(2, 'days').valueOf(),
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense', () => {
  const updates = {
    description: 'completely changed',
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates,
  };
  const state = expensesReducer(expenses, action);
  expect(state[1]).toEqual({ ...expenses[1], description: 'completely changed' });
});

test('should edit an expense', () => {
  const updates = {
    description: 'completely changed',
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'nonexistentID',
    updates,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
