import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { withRouter } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../routes';

import { propByKey } from '../helpers/helpers';

import Field from '../components/Field';
import Input from '../components/Input';
import Button from '../components/Button';
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
      <Container style={{height: '100vh'}}>
        <Row style={{height: '100vh'}}>
          <Col xs={1} sm={3} md={4}/>
          <Col xs={10} sm={6} md={4}>
            <form onSubmit={this.onSubmit}>
              <Field legend="Password reset" display="column center" margin="50% 0 0 0">
                <Input
                  value={this.state.email}
                  onChange={e => this.setState(propByKey('email', e.target.value))}
                  type="text"
                  placeholder="Email Address"
                />
                <Button disabled={isInvalid} type="submit">Send</Button>
                {this.state.error ? <Error>{this.state.error.message}</Error> : <div style={{height: 40}}/>}
              </Field>
            </form>
          </Col>
          <Col xs={1} sm={3} md={4}/>
        </Row>
      </Container>
    )
  }
}

export default withRouter(ResetPassword);
