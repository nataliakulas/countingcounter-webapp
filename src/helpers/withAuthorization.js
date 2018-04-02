import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { auth } from '../firebase/index';
import * as routes from '../routes';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {

    componentDidMount() {
      auth.authStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LOG_IN)
        }
      })
    }

    render() {
      return this.props.authUser ? <Component/> : null;
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
  });

  return compose(
    connect(mapStateToProps),
    withRouter,
  )(WithAuthorization);
};

export default withAuthorization;