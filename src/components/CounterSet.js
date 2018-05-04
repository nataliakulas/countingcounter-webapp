import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

import * as routes from '../routes';

import { db } from '../firebase/index';
import { setCounterName, setCounterTime, setCounterMessage } from '../actions';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';

import Button from './Button';
import Checkbox from './Checkbox';
import { Error, Warning, Create, Remove } from './Info';
import Modal from '../components/Modal';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  name: state.counterState.name,
  time: state.counterState.time,
  message: state.counterState.message
});

const mapDispatchToProps = (dispatch) => ({
  onSetCounterName: (name) => dispatch(setCounterName(name)),
  onSetCounterTime: (time) => dispatch(setCounterTime(time)),
  onSetCounterMessage: (message) => dispatch(setCounterMessage(message))
});

class CounterSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      warning: false,
      warningMsg: 'Something is missing, please check date or time.',
      create: false,
      remove: false,
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  clear = () => {
    this.props.onSetCounterName('');
    this.props.onSetCounterTime('');
    this.props.onSetCounterMessage('');
  };

  onSubmit = (e) => {
    const timestamp = moment(this.props.time).toISOString();

    db.createCounter(this.props.name, timestamp, this.props.message, this.props.authUser.uid);
    this.onOpenCreate();

    e.preventDefault();
  };

  onOpenRemove = () => {
    this.clear();
    this.setState({remove: true, create: false})
  };

  onOpenCreate = () => {
    this.clear();
    this.setState({remove: false, create: true})
  };

  onClose = () => {
    this.setState({remove: false, create: false})
  };

  render() {
    const isInvalid = this.props.name === '' || !this.props.time;

    return (
      <div className="column center">
        <Modal show={this.state.remove} close={this.onClose} className="column center">
          <Remove>Counter data has been cleared. <br/> Do you want to try again or go to dashboard?</Remove>
          <div className="row" style={{width: '80%', marginTop: 30}}>
            <Link to={routes.DASHBOARD} className="button column center">Dashboard</Link>
            <Button onClick={this.onClose}>OK!</Button>
          </div>
        </Modal>
        <Modal show={this.state.create} close={this.onClose} className="column center">
          <Create>Counter created!<br/> Do you want to set up another one or go to dashboard?</Create>
          <div className="row" style={{width: '80%', marginTop: 30}}>
            <Link to={routes.DASHBOARD} className="button column center">Dashboard</Link>
            <Button onClick={this.onClose}>One more!</Button>
          </div>
        </Modal>
        <form onSubmit={this.onSubmit} className="column" style={{width: '100%', alignItems: 'flex-start'}}>
          <Checkbox checked={this.props.name}
                    label={this.props.name ? this.props.name : 'Set name!'}
                    readOnly/>
          <Checkbox checked={this.props.time}
                    label={this.props.time ? moment(this.props.time).format("dddd, MMMM Do YYYY, HH:00") : 'Set time!'}
                    readOnly/>
          <Checkbox checked={this.props.message}
                    label="Message"
                    readOnly/>
          <div className="display-row" style={{width: '100%', justifyContent: 'space-between'}}>
            <Button className="button remove" margin="0 10px 20px 0"
                    onClick={this.onOpenRemove} type="button">Clear</Button>
            <Button className="button create" margin="0 0 20px 10px" disabled={isInvalid} type="submit">Create</Button>
          </div>
        </form>
        {this.state.error ?
          <Error>{this.state.errorMsg}</Error>
          : (this.state.warning ? <Warning>{this.state.warningMsg}</Warning>
              : <div style={{height: 40}}/>
          )
        }
      </div>
    )
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  withRouter
)(CounterSet);