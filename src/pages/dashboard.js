import React from 'react';

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

  componentDidMount() {
    db.getUsers().then(snapshot =>
      this.setState(() => ({users: snapshot.val()}))
    );
  }

  render() {
    console.log(this.state.users)

    return (
      <Box width={227} display="column" margin="30px">
        <p>Users</p>
        <ol>
          {this.state.users && Object.keys(this.state.users).map(key =>
            <li key={key}>{this.state.users[key].username}</li>)}
        </ol>
      </Box>
    );
  }
}

export default withAuthorization(authCondition)(Dashboard);
