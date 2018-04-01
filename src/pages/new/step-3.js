import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import uuidv1 from 'uuid';

import { db } from '../../firebase';

import withAuthorization from '../../helpers/withAuthorization';
import { authCondition } from '../../helpers/helpers';
import * as routes from '../../routes';

import Button from '../../components/Button';
import Box from '../../components/Box';
import { Error, Success } from '../../components/Info';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  name: state.counterState.name,
  time: state.counterState.time
});

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: false}
  }

  componentDidMount() {
    if (!this.props.name || !this.props.time) {
      this.setState({error: true})
    }
  }

  onSubmit = (e) => {
    const id = uuidv1();
    db.createCounter(id, this.props.name, this.props.time, this.props.authUser.uid);

    e.preventDefault();
  };

  render() {
    const isInvalid = this.props.name === '' || this.props.time === '';

    return (
      <Box width={227} display="column" margin="30px">
        <form onSubmit={this.onSubmit} className="column" style={{width: '100%'}}>
          {
            this.props.name ?
              <p>{this.props.name}</p> :
              <Link to={routes.STEP_1}><p className="link">No counter name!</p></Link>
          }
          {
            this.props.time ?
              <p>{this.props.time}</p> :
              <Link to={routes.STEP_1}><p className="link">No counter time!</p></Link>
          }
          <Button disabled={isInvalid} type="submit">Set</Button>
        </form>
        {this.props.success && <Success>Your counter has been set!</Success>}
        {this.state.error && <Error>Something is missing, please check date or time.</Error>}
      </Box>
    )
  }
}

export default compose(
  withRouter,
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(StepThree);