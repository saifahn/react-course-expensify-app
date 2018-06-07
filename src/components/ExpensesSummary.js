import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';


export const ExpensesSummary = props => (
  <div>
    {props.expenseCount > 0
      &&
      <p>Viewing {props.expenseCount} expense{props.expenseCount > 1
        && 's'}, totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}
      </p>}
  </div>
);

const mapStateToProps = (state) => {
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  const expensesTotal = getExpensesTotal(expenses);
  return {
    expenseCount: expenses.length,
    expensesTotal,
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
