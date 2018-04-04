import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

import { db } from '../../firebase';

import withAuthorization from '../../helpers/withAuthorization';
import { authCondition } from '../../helpers/helpers';
import * as routes from '../../routes';

import Button from '../../components/Button';
import Box from '../../components/Box';
import { Success, Error, Warning } from '../../components/Info';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  name: state.counterState.name,
  time: state.counterState.time
});

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      warning: false,
      warningMsg: 'Something is missing, please check date or time.'
    }
  }

  componentDidMount() {
    if (!this.props.name || !this.props.time) {
      this.setState({warning: true})
    }
  }

  onSubmit = (e) => {
    const time = moment(this.props.time).unix();

    db.createCounter(this.props.name, time, this.props.authUser.uid);
    this.props.history.push(routes.DASHBOARD);

    e.preventDefault();
  };

  render() {
    const isInvalid = this.props.name === '' || !this.props.time;

    return (
      <Box width={227} display="column" margin="30px">
        <form onSubmit={this.onSubmit} className="column" style={{width: '100%'}}>
          {
            this.props.name ?
              <p>{this.props.name}</p> :
              <Link to={routes.STEP_1}><p className="link">Set counter name</p></Link>
          }
          {
            this.props.time ?
              <p>{moment(this.props.time).format()}</p> :
              <Link to={routes.STEP_1}><p className="link">Set counter time</p></Link>
          }
          <Button disabled={isInvalid} type="submit">Set</Button>
        </form>
        {this.props.success && <Success>Your counter has been set!</Success>}
        {this.state.warning && <Warning>{this.state.warningMsg}</Warning>}
        {this.state.error && <Error>{this.state.error}</Error>}
      </Box>
    )
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps),
  withRouter
)(StepThree);