import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { setCounterMessage } from '../actions';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';

import Button from './Button';
import Textarea from './Textarea';
import { Success, Error } from './Info';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  message: state.counterState.message,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCounterMessage: (message) => dispatch(setCounterMessage(message))
});

class CounterMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      success: false,
      successMsg: 'Counter message added!',
      error: false,
      errorMsg: 'Counter not set!'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message.length === 0) {
      this.setState({
        name: '',
        success: false,
        error: false
      })
    }
  }

  setMessage = (e) => {
    this.setState({message: e.target.value})
  };

  set = () => {
    const save = () => {
      this.props.onSetCounterMessage(this.state.message);
      this.setState({success: true, error: false})
    };

    this.state.message ? save() : this.props.onSetCounterMessage('')
  };

  render() {
    const isInvalid = this.state.message === '';

    return (
      <div className="column center">
        <p>Do you want to write a message to your future self?</p>
        <Textarea placeholder="Dear future me ..."
                  value={this.state.message}
                  onChange={e => this.setMessage(e)}
                  rows={5}/>
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
)(CounterMessage)