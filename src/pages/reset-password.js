import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';

import { auth } from '../firebase';

import { propByKey } from '../helpers/helpers';

import Field from '../components/Field';
import Input from '../components/Input';
import Button from '../components/Button';
import { Error, Success } from '../components/Info';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: null,
      success: false
    };
  }

  onSubmit = (e) => {
    auth.resetPass(this.state.email)
      .then(() => {
        this.setState(() => ({
          email: '',
          error: null,
          success: true
        }));
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
      <Grid>
        <Row middle="xs" style={{minHeight: 'calc(100vh - 110px)'}}>
          <Col xsOffset={1} xs={10} smOffset={3} sm={6} lgOffset={4} lg={4}>
            <form onSubmit={this.onSubmit}>
              <Field title="Password reset" display="column center">
                <Input
                  value={this.state.email}
                  onChange={e => this.setState(propByKey('email', e.target.value))}
                  type="text"
                  placeholder="Email Address"
                />
                <Button disabled={isInvalid} type="submit">Send</Button>
                {this.state.error ?
                  <Error>{this.state.error.message}</Error>
                  : (this.state.success ? <Success>Please check your e-mail</Success>
                      : <div style={{height: 40}}/>
                  )
                }
              </Field>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default withRouter(ResetPassword);
