import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { setCounterMessage } from '../actions';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';

import Button from './Button';
import Textarea from './Textarea';
import { Success, Error, Warning } from './Info';

const mapDispatchToProps = (dispatch) => ({
  onSetCounterMessage: (message) => dispatch(setCounterMessage(message))
});

class CounterMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "" || this.props.message,
      success: false,
      successMsg: 'Counter message added!',
      warning: false,
      warningMsg: "Counter has no message. It's okay, but be aware, that you can't add it later",
      error: false,
      errorMsg: 'Counter not set!'
    }
  }

  setMessage = (e) => {
    this.setState({message: e.target.value})
  };

  set = () => {
    const save = () => {
      this.props.onSetCounterMessage(this.state.message);
      this.setState({success: true, error: false, warning: false})
    };
    const saveWithout = () => {
      this.props.onSetCounterMessage('');
      this.setState({success: false, error: false, warning: true})
    };

    this.state.message ? save() : saveWithout()
  };

  render() {

    return (
      <div className="column center">
        <p>Do you want to write a message to your future self?</p>
        <Textarea placeholder="Dear future me ..."
                  value={this.state.message}
                  onChange={e => this.setMessage(e)}
                  rows={5}/>
        <Button onClick={this.set}>Set</Button>
        {this.state.error ?
          <Error>{this.state.errorMsg}</Error>
          : (this.state.warning ? <Warning>{this.state.warningMsg}</Warning>
              : (this.state.success ? <Success>{this.state.successMsg}</Success>
                  : <div style={{height: 40}}/>
              )
          )
        }
      </div>
    )
  }

}

export default compose(
  withAuthorization(authCondition),
  connect(null, mapDispatchToProps)
)(CounterMessage)