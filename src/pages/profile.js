import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { auth } from '../firebase';
import { deleteUser } from '../firebase/auth';

import withAuthorization from '../helpers/withAuthorization';
import { propByKey, authCondition } from '../helpers/helpers';

import Field from '../components/Field';
import Input from '../components/Input';
import Button from '../components/Button';
import { Error, Success } from '../components/Info';
import Modal from '../components/Modal';

const Profile = ({authUser}) =>
  <Grid style={{height: '100vh'}}>
    <Row style={{height: '100vh'}}>
      <Col xs={1} sm={3} md={4}/>
      <Col xs={10} sm={6} md={4}>
        <PasswordChange user={authUser ? authUser.email : 'stranger'}/>
        <DeleteAccount/>
      </Col>
      <Col xs={1} sm={3} md={4}/>
    </Row>
  </Grid>;

const INITIAL_STATE = {
  password: '',
  error: null,
  success: false,
};

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modal: false}
  }

  deleteUser = () => {
    deleteUser();
  };

  onOpen = () => {
    this.setState({modal: true})
  };

  onClose = () => {
    this.setState({modal: false})
  };

  render() {
    return (
      <div className="column center" style={{margin: '30px auto'}}>
        <Modal show={this.state.modal} close={this.onClose} className="column center">
          <p>Do you really want to your profile?</p>
          <div className="row" style={{width: '80%', marginTop: 30}}>
            <Button onClick={this.onClose}>No!</Button>
            <Button onClick={this.deleteUser}>Yes!</Button>
          </div>
        </Modal>
        <Button type="button" onClick={this.onOpen}>Delete profile</Button>
      </div>
    )
  }
}

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
      <form onSubmit={this.onSubmit}>
        <Field title={this.props.user} display="column center" margin="50% 0 0 0">
          <p>Do you want to change your password?</p>
          <Input
            value={this.state.password}
            onChange={e => this.setState(propByKey('password', e.target.value))}
            type="password"
            placeholder="New password"/>
          <Button disabled={isInvalid} type="submit">Update</Button>
          {this.state.error ?
            <Error>{this.state.error.message}</Error>
            : (this.state.success ? <Success>Your password has been changed!</Success>
                : <div style={{height: 40}}/>
            )
          }
        </Field>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(Profile);