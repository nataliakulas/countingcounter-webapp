import React from 'react';
import { withRouter } from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../routes';

import { propByKey } from '../helpers/helpers';

import Input from '../components/Input';
import Button from '../components/Button';
import Box from '../components/Box';
import { Error } from '../components/Info';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordRepeat: '',
  error: null,
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = (e) => {
    auth.signUp(this.state.email, this.state.password)
      .then(authUser => {
        db.createUser(authUser.uid, this.state.username, this.state.email, [])
          .then(() => {
            this.setState(() => ({...INITIAL_STATE}));
            this.props.history.push(routes.DASHBOARD);
          })
          .catch(error => {
            this.setState(propByKey('error', error));
          });
      })
      .catch(error => {
        this.setState(propByKey('error', error));
      });

    e.preventDefault();
  };

  render() {
    const isInvalid =
      this.state.password !== this.state.passwordRepeat ||
      this.state.password === '' ||
      this.state.email === '' ||
      this.state.username === '';

    return (
      <Box width={227} display="column" margin="30px">
        <form onSubmit={this.onSubmit}>
          <Input
            value={this.state.username}
            onChange={e => this.setState(propByKey('username', e.target.value))}
            type="text"
            placeholder="Full Name"
          />
          <Input
            value={this.state.email}
            onChange={e => this.setState(propByKey('email', e.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <Input
            value={this.state.password}
            onChange={e => this.setState(propByKey('password', e.target.value))}
            type="password"
            placeholder="Password"
          />
          <Input
            value={this.state.passwordRepeat}
            onChange={e => this.setState(propByKey('passwordRepeat', e.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
          <Button disabled={isInvalid} type="submit">Sign Up</Button>
          { this.state.error && <Error>{this.state.error.message}</Error> }
        </form>
      </Box>
    );
  }
}

export default withRouter(SignUp);
