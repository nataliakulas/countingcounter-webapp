import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { withRouter, Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../routes';

import { propByKey } from '../helpers/helpers';

import Field from '../components/Field';
import Input from '../components/Input';
import Button from '../components/Button';
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

  render() {
    const isInvalid =
      this.state.password === '' ||
      this.state.email === '';

    return (
      <Grid>
        <Row middle="xs" style={{minHeight: 'calc(100vh - 110px)'}}>
          <Col xsOffset={1} xs={10} smOffset={3} sm={6} lgOffset={4} lg={4}>
            <form onSubmit={this.onSubmit}>
              <Field title="Log in" display="column center">
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
                <Button disabled={isInvalid} type="submit">Go</Button>
                {this.state.error ? <Error>{this.state.error.message}</Error> : <div style={{height: 40}}/>}
              </Field>
            </form>
            <Link to={routes.RESET_PASSWORD}>
              <p className="link text-center" style={{marginTop: 30, color: '#545E73', fontSize: '0.85em'}}>I don't
                remember password</p>
            </Link>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(LogIn);
