import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense)
    this.props.history.push('/')
  }

  onClick = () => {
    this.props.startRemoveExpense(this.props.expense.id)
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <h4>
          Editing the expense with id of
          {this.props.expense.id}
        </h4>
        <button onClick={this.onClick}>Remove</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: id => dispatch(startRemoveExpense({ id })),
})

// props.match.params is the matched URL parameters
// find the expense which has the same ID as the ID of this page
// pass the expense down to EditExpensePage to be accessed in props
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => {
      return expense.id === props.match.params.id
    }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditExpensePage)
