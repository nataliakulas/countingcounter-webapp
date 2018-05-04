import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { setCounterName } from '../actions';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition, propByKey } from '../helpers/helpers';

import Input from './Input';
import Button from './Button';
import { Success, Error } from './Info';

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
      name: '',
      success: false,
      successMsg: 'Counter name set!',
      error: false,
      errorMsg: 'Counter not set!'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name.length === 0) {
      this.setState({
        name: '',
        success: false,
        error: false
      })
    }
  }

  set = () => {
    const save = () => {
      this.props.onSetCounterName(this.state.name);
      this.setState({success: true, error: false})
    };

    this.state.name ? save() : this.props.onSetCounterName(null);
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
        {this.state.error ?
          <Error>{this.state.errorMsg}</Error>
          : (this.state.success ? <Success>{this.state.successMsg}</Success>
              : <div style={{height: 40}}/>
          )
        }
      </div>
    )
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(null, mapDispatchToProps),
  connect(mapStateToProps)
)(CounterName);