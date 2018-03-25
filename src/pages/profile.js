import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { auth } from '../firebase';

import withAuthorization from '../helpers/withAuthorization';
import { propByKey, authCondition } from '../helpers/helpers';

import Input from '../components/Input';
import Button from '../components/Button';
import Box from '../components/Box';
import { Error, Success } from '../components/Info';

const Profile = ({authUser}) =>
  <Box width={227} display="column" margin="30px">
    <p>Hi {authUser ? authUser.email : 'stranger'}</p>
    <PasswordChange/>
  </Box>;

const INITIAL_STATE = {
  password: '',
  error: null,
  success: false,
};

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = (e) => {
    auth.updatePass(this.state.password)
      .then(() => {
        this.setState(() => ({...INITIAL_STATE}));
        this.setState(() => ({success: true}));
      })
      .catch(error => {
        this.setState(() => ({...INITIAL_STATE}));
        this.setState(propByKey('error', error));
      });

    e.preventDefault();
  };

  render() {
    const isInvalid = this.state.password === '';

    return (
      <Box width={227} display="column" margin="30px">
        <p>Do you want to change your password?</p>
        <form onSubmit={this.onSubmit}>
          <Input
            value={this.state.password}
            onChange={e => this.setState(propByKey('password', e.target.value))}
            type="password"
            placeholder="New password"/>
          <Button disabled={isInvalid} type="submit">Update</Button>
          { this.state.success && <Success>Your password has been changed!</Success> }
          { this.state.error && <Error>{this.state.error.message}</Error> }
        </form>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withAuthorization(authCondition)
)(Profile);