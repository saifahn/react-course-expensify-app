import database from '../firebase/firebase'

// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

/** Under Firebase */
// component calls action generator
// action generator returns function
// component dispatches function
// function runs (has the ability to dispatch other actions an do whatever it wants)

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
})

export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData
    const expense = { description, note, amount, createdAt }

    return database
      .ref('expenses')
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense,
          }),
        )
      })
  }
}

export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
})

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
})

export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
})

export const startSetExpenses = () => {
  return dispatch => {
    return database.ref('expenses').once('value', snapshot => {
      // map the firebase data into an array
      const expenses = []
      snapshot.forEach(childSnapshot => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        })
      })
      dispatch(setExpenses(expenses))
    })
  }
}

// 1. Fetch all expense data once
// 2. Parse that data into an array
// 3. Dispatch SET_EXPENSES
