import React from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

import * as routes from '../routes';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';
import { db } from '../firebase/index';

import Box from '../components/Box';

const Panel = (props) => {
  return (
    <div className="panel">
      <div>
        <p>{props.name}</p>
        <p>{props.time}</p>
      </div>
      <div>
        <Link className="button details" to={props.path}/>
      </div>
    </div>
  )
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countersBool: false,
      counters: null
    };
  }

  componentWillMount() {
    db.getCounter().then(snap => {
        const counters = [];

        snap.forEach(item => {
          let counter = item.val();
          counter.key = item.key;

          counters.push(counter)
        });
        // console.log(counters);
        this.setState(() => ({countersBool: true, counters: counters}))
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.countersBool ?
          <Box width={227} display="column" margin="30px">
            <p>Here are your counters:</p>
            {this.state.counters.map(counter => {

              return (
                <Panel key={counter.key} path={routes.DETAILS} name={counter.name}
                       time={moment(counter.time).format('YYYY-MM-DD')}/>
              )
            })}
            <Link className="button column" to={routes.STEP_1}>Add new</Link>
          </Box> :
          <Box width={227} display="column" margin="30px">
            <p>It seems like you don't have any counter yet</p>
            <Link className="button column" to={routes.STEP_1}>Set it up!</Link>
          </Box>
        }
      </div>
    );
  }
}

export default compose(
  withAuthorization(authCondition),
  withRouter
)(Dashboard);
