/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let editExpense
let startRemoveExpense
let history
let wrapper

beforeEach(() => {
  editExpense = jest.fn()
  startRemoveExpense = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(
    <EditExpensePage
      expense={expenses[1]}
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
    />,
  )
})

test('should render EditExpensesPage', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense', () => {
  const edited = {
    ...expenses[1],
    description: 'changed',
  }
  wrapper.find('ExpenseForm').prop('onSubmit')(edited)
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, edited)
})

test('should handle startRemoveExpense', () => {
  wrapper.find('button').simulate('click')
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[1].id)
})
