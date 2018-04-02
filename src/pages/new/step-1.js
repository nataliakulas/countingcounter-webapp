import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import { setCounterName } from '../../actions';

import withAuthorization from '../../helpers/withAuthorization';
import { authCondition, propByKey } from '../../helpers/helpers';
import * as routes from '../../routes';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Box from '../../components/Box';
import { Success, Error, Warning } from '../../components/Info';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  name: state.counterState.name,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCounterName: (name) => dispatch(setCounterName(name))
});

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '' || this.props.name,
      success: false,
      successMsg: 'Counter name set!',
      warning: false,
      warningMsg: 'Please set counter time first!',
      error: false,
      errorMsg: 'Counter not set!'
    };
  }

  set = () => {
    const save = () => {
      this.props.onSetCounterName(this.state.name);
      this.setState({success: true, error: false, warning: false})
    };

    this.state.name ? save() : this.props.onSetCounterName(null);
  };

  check = (e) => {
    if (this.props.name.length === 0) {
      e.preventDefault();
      this.setState({warning: true})
    } else {
      this.setState({warning: false})
    }
  };

  render() {
    const isInvalid = this.state.name === '';

    return (
      <Box width={227} display="column" margin="30px">
        <p>What are you counting for?</p>
        <Input value={this.state.name}
               onChange={e => this.setState(propByKey('name', e.target.value))}
               type="text"
               placeholder="Counter name"/>
        <Button disabled={isInvalid} onClick={this.set}>Set</Button>
        <div className="row" style={{width: '100%'}}>
          <Link to={routes.DASHBOARD}><p className="link">Go back</p></Link>
          <Link onClick={this.check} to={routes.STEP_2}><p className="link">Go on</p></Link>
        </div>
        {this.state.success && <Success>{this.state.successMsg}</Success>}
        {this.state.warning && <Warning>{this.state.warningMsg}</Warning>}
        {this.state.error && <Error>{this.state.errorMsg}</Error>}
      </Box>
    )
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  connect(mapStateToProps),
  withAuthorization(authCondition),
)(StepOne);