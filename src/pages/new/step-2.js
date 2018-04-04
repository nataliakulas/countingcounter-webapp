import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { setCounterTime } from '../../actions';

import withAuthorization from '../../helpers/withAuthorization';
import { authCondition } from '../../helpers/helpers';
import * as routes from '../../routes';

import Button from '../../components/Button';
import Box from '../../components/Box';
import { Success, Error, Warning } from '../../components/Info';

import 'react-datepicker/dist/react-datepicker.css';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  time: state.counterState.time,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCounterTime: (time) => dispatch(setCounterTime(time))
});

class StepTwo extends React.Component {
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
      <Box width={227} display="column" margin="30px">
        <p>What is your counting time?</p>
        <DatePicker
          inline
          selected={this.state.time}
          onChange={(date) => this.setState({time: date})}
          dropdownMode="scroll"
          minDate={moment()}
          dateFormat="LLL"
        />
        <Button disabled={isInvalid} onClick={this.set}>Set</Button>
        <div className="row" style={{width: '100%'}}>
          <Link to={routes.STEP_1}><p className="link">Go back</p></Link>
          <Link onClick={this.check} to={routes.STEP_3}><p className="link">Go on</p></Link>
        </div>
        {this.state.success && <Success>{this.state.successMsg}</Success>}
        {this.state.warning && <Warning>{this.state.warningMsg}</Warning>}
        {this.state.error && <Error>{this.state.errorMsg}</Error>}
      </Box>
    )
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(null, mapDispatchToProps),
  connect(mapStateToProps)
)(StepTwo);