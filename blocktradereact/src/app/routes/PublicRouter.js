import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const PublicRoute = ({
  isAuthenticated,
  user,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (
      <div>
        <Component {...props} />
      </div>
    )}
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(PublicRoute);
