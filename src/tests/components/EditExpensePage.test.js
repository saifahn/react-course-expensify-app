/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let startEditExpense
let startRemoveExpense
let history
let wrapper

beforeEach(() => {
  startEditExpense = jest.fn()
  startRemoveExpense = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(
    <EditExpensePage
      expense={expenses[1]}
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
    />,
  )
})

test('should render EditExpensesPage', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle startEditExpense', () => {
  const edited = {
    ...expenses[1],
    description: 'changed',
  }
  wrapper.find('ExpenseForm').prop('onSubmit')(edited)
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id, edited)
})

test('should handle startRemoveExpense', () => {
  wrapper.find('button').simulate('click')
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[1].id)
})
