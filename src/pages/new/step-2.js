import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom';

import { setCounterTime } from '../../actions';

import withAuthorization from '../../helpers/withAuthorization';
import { authCondition, propByKey } from '../../helpers/helpers';
import * as routes from '../../routes';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Box from '../../components/Box';
import { Success, Error } from '../../components/Info';

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
      time: '' || this.props.time,
      success: false,
      successMsg: 'Counter time set!',
      error: false,
      errorMsg: 'Please set counter time first!'
    };
  }

  set = () => {
    const save = () => {
      this.props.onSetCounterTime(this.state.time);
      this.setState({success: true, error: false})
    };

    this.state.time ? save() : this.props.onSetCounterTime(null);
  };

  check = (e) => {
    if (this.props.time.length === 0) {
      e.preventDefault();
      this.setState({error: true})
    } else {
      this.setState({error: false})
    }
  };

  render() {
    const isInvalid = this.state.time === '';

    return (
      <Box width={227} display="column" margin="30px">
        <p>What is your counting time?</p>
        <Input value={this.state.name}
               onChange={e => this.setState(propByKey('time', e.target.value))}
               type="text"
               placeholder="Counter time"/>
        <Button disabled={isInvalid} onClick={this.set}>Set</Button>
        <div className="row" style={{width: '100%'}}>
          <Link to={routes.STEP_1}><p className="link">Go back</p></Link>
          <Link onClick={this.check} to={routes.STEP_3}><p className="link">Go on</p></Link>
        </div>
        {this.state.success && <Success>{this.state.successMsg}</Success>}
        {this.state.error && <Error>{this.state.errorMsg}</Error>}
      </Box>
    )
  }
}

export default compose(
  withRouter,
  withAuthorization(authCondition),
  connect(null, mapDispatchToProps),
  connect(mapStateToProps)
)(StepTwo);