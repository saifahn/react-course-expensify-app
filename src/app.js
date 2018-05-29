/* eslint-env browser  */
import 'normalize.css/normalize.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

store.dispatch(addExpense({
  description: 'Gas bill',
  amount: 1390,
  createdAt: 1000,
}));

store.dispatch(addExpense({
  description: 'Rent',
  amount: 9000,
}));

store.dispatch(addExpense({
  description: 'Water bill',
  amount: 2170,
}));


// getVisibleExpenses -> print visible ones to screen
const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
