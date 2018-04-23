import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../routes';

const Navigation = ({authUser}) =>
  <div>{authUser ? <NavigationAuth/> : <NavigationNonAuth/>}</div>;

const NavigationAuth = () =>
  <div className="navigation auth">
    <Link to={routes.DASHBOARD}><h1 className="title">Counting Counter</h1></Link>
    <ul>
      <li><Link to={routes.PROFILE}>Profile</Link></li>
      <li onClick={() => auth.logOut()}>Logout</li>
    </ul>
  </div>;

const NavigationNonAuth = () =>
  <div className="navigation">
    <Link to={routes.LANDING}><h1 className="title">Counting Counter</h1></Link>
    <ul>
      <li><Link to={routes.LOG_IN}>Login</Link></li>
      <li><Link to={routes.SIGN_UP}>Sign up</Link></li>
    </ul>
  </div>;

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Navigation);


