import React from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../routes';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';
import { db } from '../firebase/index';

import Box from '../components/Box';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  // componentDidMount() {
  //   db.getUsers().then(snapshot =>
  //     this.setState(() => ({users: snapshot.val()}))
  //   );
  // }

  render() {
    return (
      <Box width={227} display="column" margin="30px">
        <p>It seems like you don't have any counter yet</p>
        <Link className="button column" to={routes.STEP_1}>Set it up!</Link>
      </Box>
    );
  }
}

export default compose(
  withAuthorization(authCondition),
  withRouter
)(Dashboard);
