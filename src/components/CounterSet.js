import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { db } from '../firebase/index';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';

import Button from './Button';
import Checkbox from './Checkbox';
import { Error, Warning, Create, Remove } from './Info';
import { setCounterName, setCounterTime } from "../actions";

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  name: state.counterState.name,
  time: state.counterState.time
});

const mapDispatchToProps = (dispatch) => ({
  onSetCounterName: (name) => dispatch(setCounterName(name)),
  onSetCounterTime: (time) => dispatch(setCounterTime(time)),
});

class CounterSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      warning: false,
      warningMsg: 'Something is missing, please check date or time.',
      create: false,
      createMsg: 'Your counter has been created',
      remove: false,
      removeMsg: 'Your counter has been deleted'
    }
  }

  componentDidMount() {
    if (!this.props.name || !this.props.time) {
      this.setState({warning: true})
    }
  }

  onSubmit = (e) => {
    const timestamp = moment(this.props.time).toISOString();

    db.createCounter(this.props.name, timestamp, this.props.authUser.uid);
    this.setState({create: true});

    e.preventDefault();
  };

  render() {
    const isInvalid = this.props.name === '' || !this.props.time;

    return (
      <div className="column center">
        <form onSubmit={this.onSubmit} className="column" style={{width: '100%', alignItems: 'flex-start'}}>
          <Checkbox checked={this.props.name}
                    label={this.props.name ? this.props.name : 'Set name'}
                    readOnly/>
          <Checkbox checked={this.props.time}
                    label={this.props.time ? moment(this.props.time).format("dddd, MMMM Do YYYY, HH:00") : 'Set time'}
                    readOnly/>
          <div className="row" style={{width: '100%', justifyContent: 'space-between'}}>
            <Button className="button remove" margin="0 10px 20px 0">Delete</Button>
            <Button className="button create" margin="0 0 20px 10px" disabled={isInvalid} type="submit">Create</Button>
          </div>
        </form>
        {/*{this.state.error || this.state.remove || this.state.create || this.state.warning ?*/}
          {/*(this.state.error && <Error>{this.state.errorMsg}</Error> ||*/}
            {/*this.state.remove && <Remove>{this.state.removeMsg}</Remove> ||*/}
            {/*this.state.create && <Create>{this.state.createMsg}</Create> ||*/}
            {/*this.state.warning && <Warning>{this.state.warningMsg}</Warning>)*/}
          {/*: <div style={{height: 40}}/>}*/}
      </div>
    )
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(null, mapDispatchToProps),
  connect(mapStateToProps),
  withRouter
)(CounterSet);