import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../routes';

import { propByKey } from '../helpers/helpers';

import Input from '../components/Input';
import Button from '../components/Button';
import Box from '../components/Box';
import { Error } from '../components/Info';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = (e) => {
    auth.logIn(this.state.email, this.state.password)
      .then(authUser => {
        this.setState(() => ({...INITIAL_STATE}));
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(error => {
        this.setState(propByKey('error', error));
      });

    e.preventDefault();
  };

  logInAnonymous = () => {
    auth.logInAnonymous()
      .then(() => {
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(error => {
        this.setState(propByKey('error', error));
      });
  };

  render() {
    const isInvalid =
      this.state.password === '' ||
      this.state.email === '';

    return (
      <Box width={227} display="column" margin="30px">
        <form onSubmit={this.onSubmit}>
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
          <Button disabled={isInvalid} type="submit">Log In</Button>
        </form>
        <Link to={routes.RESET_PASSWORD}><p className="link">I don't remember password</p></Link>
        {/*<p className="center">Or if you want, simply log in anonymously, you can set an account later</p>*/}
        {/*<Button onClick={this.logInAnonymous}>Anonymous</Button>*/}
        { this.state.error && <Error>{this.state.error.message}</Error> }
      </Box>
    );
  }
}

export default withRouter(LogIn);
