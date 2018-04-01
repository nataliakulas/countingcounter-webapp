import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import withAuthentication from '../helpers/withAuthentication';

import * as routes from '../routes';

import Navigation from './Navigation';
import Landing from '../pages/landing';
import LogIn from '../pages/log-in';
import SignUp from '../pages/sign-up';
import ResetPassword from '../pages/reset-password';
import Profile from '../pages/profile';
import Dashboard from '../pages/dashboard';
import StepOne from '../pages/new/step-1';
import StepTwo from '../pages/new/step-2';
import StepThree from '../pages/new/step-3';

const App = () =>
  <Router history={null}>
    <div>
      <Navigation/>
      <Route exact path={routes.LANDING} component={() => <Landing/>}/>
      <Route exact path={routes.LOG_IN} component={() => <LogIn/>}/>
      <Route exact path={routes.SIGN_UP} component={() => <SignUp/>}/>
      <Route exact path={routes.RESET_PASSWORD} component={() => <ResetPassword/>}/>
      <Route exact path={routes.PROFILE} component={() => <Profile/>}/>
      <Route exact path={routes.DASHBOARD} component={() => <Dashboard/>}/>
      <Route exact path={routes.STEP_1} component={() => <StepOne/>}/>
      <Route exact path={routes.STEP_2} component={() => <StepTwo/>}/>
      <Route exact path={routes.STEP_3} component={() => <StepThree/>}/>
    </div>
  </Router>;

export default withAuthentication(App);
