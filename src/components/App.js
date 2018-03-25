import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import withAuthentication from '../helpers/withAuthentication';

import * as routes from '../const/routes';

import Navigation from './Navigation';
import LogIn from '../pages/log-in';
import SignUp from '../pages/sign-up';
import Profile from '../pages/profile';
import ResetPassword from '../pages/reset-password';
import Dashboard from '../pages/dashboard';

const App = () =>
  <Router history={null}>
    <div>
      <Navigation/>
      <Route exact path={routes.LOG_IN} component={() => <LogIn/>}/>
      <Route exact path={routes.SIGN_UP} component={() => <SignUp/>}/>
      <Route exact path={routes.PROFILE} component={() => <Profile/>}/>
      <Route exact path={routes.RESET_PASSWORD} component={() => <ResetPassword/>}/>
      <Route exact path={routes.DASHBOARD} component={() => <Dashboard/>}/>
    </div>
  </Router>;

export default withAuthentication(App);
