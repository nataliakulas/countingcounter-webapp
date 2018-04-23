import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { setCounterName } from '../actions';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition, propByKey } from '../helpers/helpers';

import Input from './Input';
import Button from './Button';
import { Success, Error, Warning } from './Info';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  name: state.counterState.name,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCounterName: (name) => dispatch(setCounterName(name))
});

class CounterName extends React.Component {
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
      <div className="column center">
        <p>What are you counting for?</p>
        <Input value={this.state.name}
               onChange={e => this.setState(propByKey('name', e.target.value))}
               type="text"
               placeholder="Counter name"/>
        <Button disabled={isInvalid} onClick={this.set}>Set</Button>

        {this.state.error ? <Error>{this.state.errorMsg}</Error>
          : <div style={{height: 40}}/>}
      </div>
    )
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(null, mapDispatchToProps),
  connect(mapStateToProps)
)(CounterName);