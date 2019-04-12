import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import selectVisibleExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'

// export const ExpensesSummary = props => (
//   <div>
//     {props.expenseCount > 0
//       &&
//       <p>Viewing {props.expenseCount} expense{props.expenseCount > 1
//         && 's'}, totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}
//       </p>}
//   </div>
// );

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00')
  return (
    <div>
      <h2>
        Viewing
        {expenseCount} 
{' '}
{expenseWord}, totalling 
{' '}
{formattedExpensesTotal}
      </h2>
    </div>
  )
}

const mapStateToProps = state => {
  const expenses = selectVisibleExpenses(state.expenses, state.filters)
  const expensesTotal = selectExpensesTotal(expenses)
  return {
    expenseCount: expenses.length,
    expensesTotal,
  }
}

export default connect(mapStateToProps)(ExpensesSummary)
