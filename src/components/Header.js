import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <div className="header__links">
      <NavLink to="/" activeClassName="is-active" exact>Dashboard</NavLink>
      <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
    </div>
  </header>
);

export default Header;
