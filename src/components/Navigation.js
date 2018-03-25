import React from'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../const/routes';

const Navigation = (props, {authUser}) =>
  <div>
    {authUser ? <NavigationAuth/> : <NavigationNonAuth/>}
  </div>;

Navigation.contextTypes = {
  authUser: PropTypes.object,
};

const NavigationAuth = () => {
  return (
    <div className="navigation">
      <Link to={routes.DASHBOARD}><h1 className="title">Counting Counter</h1></Link>
      <Link to={routes.PROFILE}>
        <div className="user"/>
      </Link>
      <button className="button logout" onClick={() => auth.logOut()}/>
    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <div className="navigation">
      <Link to={routes.LANDING}><h1 className="title">Counting Counter</h1></Link>
      <ul>
        <li><Link to={routes.LOG_IN}>Login</Link></li>
        <li><Link to={routes.SIGN_UP}>Sign up</Link></li>
      </ul>
    </div>
  );
};

export default Navigation;


