// Higher Order Component (HOC) - A component that renders another component
// re-use code
// render hijacking
// prop manipulation
// abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
    <p>The dealio is: {props.dealio}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return props => (
    <div>
      {props.isAdmin && <p>This is private info. Please {"don't"} share!</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

// requireAuthentication
const requireAuthentication = WrappedComponent => props => (
  <div>
    {props.isAuthenticated
    ? <WrappedComponent {...props} />
    : <p>You need to be logged in to see that</p>}
  </div>
);

// test out spread operator passing down props

// const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin info="These are the details." />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated info="These are the details." dealio="what?" />, document.getElementById('app'));
