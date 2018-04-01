import React from 'react';
import { withRouter } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../routes';

import { propByKey } from '../helpers/helpers';

import Input from '../components/Input';
import Button from '../components/Button';
import Box from '../components/Box';
import { Error } from '../components/Info';

const INITIAL_STATE = {
  email: '',
  error: null,
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = (e) => {
    auth.resetPass(this.state.email)
      .then(() => {
        this.setState(() => ({...INITIAL_STATE}));
        this.props.history.push(routes.LOG_IN);
      })
      .catch(error => {
        this.setState(propByKey('error', error));
      });

    e.preventDefault()
  };

  render() {
    const isInvalid =
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
          <Button disabled={isInvalid} type="submit">Reset</Button>
          { this.state.error && <Error>{this.state.error.message}</Error> }
        </form>
      </Box>
    )
  }
}

export default withRouter(ResetPassword);
