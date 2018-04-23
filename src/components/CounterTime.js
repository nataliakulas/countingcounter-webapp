import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import moment from 'moment';

import { setCounterTime } from '../actions';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';

import Button from './Button';
import CounterPicker from './CounterPicker';
import { Success, Error, Warning } from './Info';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  time: state.counterState.time,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCounterTime: (time) => dispatch(setCounterTime(time))
});

class CounterTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment() || this.props.time,
      success: false,
      successMsg: 'Counter time set!',
      warning: false,
      warningMsg: 'Please set counter time first!',
      error: false,
      errorMsg: 'Counter not set!'
    };
  }

  set = () => {
    const save = () => {
      this.props.onSetCounterTime(this.state.time);
      this.setState({success: true, error: false, warning: false})
    };

    this.state.time ? save() : this.props.onSetCounterTime(null);
  };

  check = (e) => {
    if (this.props.time.length === 0) {
      e.preventDefault();
      this.setState({warning: true})
    } else {
      this.setState({warning: false})
    }
  };

  render() {
    const isInvalid = this.state.time === '';
    return (
      <div className="column center">
        <p>What is your counting time?</p>
        <CounterPicker
          inline
          selected={this.state.time}
          onChange={(date) => this.setState({time: date})}
          minDate={moment()}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="time"
        />
        <Button disabled={isInvalid} onClick={this.set}>Set</Button>
        {this.state.error || this.state.success || this.state.warning ?
          (this.state.error && <Error>{this.state.errorMsg}</Error> ||
            this.state.success && <Success>{this.state.successMsg}</Success> ||
            this.state.warning && <Warning>{this.state.warningMsg}</Warning>)
          : <div style={{height: 40}}/>}
      </div>
    )
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(null, mapDispatchToProps),
  connect(mapStateToProps)
)(CounterTime);