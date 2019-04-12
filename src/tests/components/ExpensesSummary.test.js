/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'

// test('should render ExpensesSummary correctly on ExpenseDashboardPage', () => {
//   const wrapper = shallow(<ExpenseDashboardPage />);
//   expect(wrapper).toMatchSnapshot();
// });

test('should render ExpensesSummary correctly with more than one expense', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={2} expensesTotal="9434" />,
  )
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary correctly with one expense', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expensesTotal="9434" />,
  )
  expect(wrapper).toMatchSnapshot()
})
