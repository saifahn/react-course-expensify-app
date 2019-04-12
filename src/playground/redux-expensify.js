import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
})

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
})

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
})

// SET_START_DATE
const setStartDate = (date = 0) => ({
  type: 'SET_START_DATE',
  date,
})

// SET_END_DATE
const setEndDate = (date = 0) => ({
  type: 'SET_END_DATE',
  date,
})

// Expenses Reducer
const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      return state.filter(expense => expense.id !== action.id)
    case 'EDIT_EXPENSE':
      // returns a new array, the one with the same id has its contents changed in line with updates
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          }
        }
        return expense
      })
    default:
      return state
  }
}

// Filters Reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date,
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date,
      }
    default:
      return state
  }
}

// timestamps (milliseconds)
// unix epoch is Jan 1st 1970
// 33400, 10, -203

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate
      const textMatch =
        typeof text !== 'string' ||
        expense.description.toLowerCase().includes(text.toLowerCase())
      // const textMatch = true;

      return startDateMatch && endDateMatch && textMatch
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        // the greater value of a/b indicates more recent. 1 will sort b in front of a.
        return a.createdAt < b.createdAt ? 1 : -1
      }
      if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1
      }
      // sort by amount
      // put greatest amount first
    })
}

// Create store
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  }),
)

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 300, createdAt: -20100 }),
)
const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 260, createdAt: -1000 }),
)

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 450 }));

// store.dispatch(setTextFilter('fee'));
// store.dispatch(setTextFilter('ent'));
// store.dispatch(setTextFilter('e'));

store.dispatch(sortByAmount())
store.dispatch(sortByDate())

// store.dispatch(setStartDate(25));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(95));

const demoState = {
  expenses: [
    {
      id: 'randomid',
      description: 'January Rent',
      note: 'This was the final payment for that address',
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  },
}
