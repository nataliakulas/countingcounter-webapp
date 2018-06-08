import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import * as routes from '../routes';

import Field from '../components/Field';

import '../styles/animation.css';

const LandingBackground = () => {
  const items = [];
  for (let i = 0; i < 55; i++) {
    items.push('')
  }

  return (
    <ul className="landing-animation">
      {items.map((item, i = 0) => {
        i++;

        const random = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1)) + min
        };
        const colors = ['blue', 'green', 'orange', 'red', 'turqouise', 'yellow'];
        const colorClass = colors[Math.floor(Math.random() * colors.length)];

        const direction = random(0, 1);
        const directionClass = direction === 0 ? 'up' : 'down';
        const size = random(10, 150);
        const position = random(0, 100) + '%';
        const delay = random(1, 60) + 's';

        return <li key={i} className={`${directionClass} ${colorClass}`}
                   style={
                     {
                       width: size,
                       height: size,
                       left: position,
                       animationDelay: delay,
                     }
                   }/>;
      })}
    </ul>
  )
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

class LandingPage extends React.Component {
  render() {

    return (
      <Grid>
        <Row middle="xs" style={{minHeight: '100vh'}}>
          <Col xsOffset={1} xs={10} smOffset={3} sm={6} lgOffset={4} lg={4}>
            <Field display="column center" margin="85px 0 0 0">
              <p>Everyone is waiting for something.<br/>
                Everyday we count years, weeks, days...</p>
              <p>Counting Counter will count it for you!</p>
              <p>Set up multiple counters, change their format and write a special message to your future self!</p>
            </Field>
            {this.props.authUser ?
              <div style={{margin: 15}}>
                <Link className="button column center" to={routes.DASHBOARD}>Go to dashboard</Link>
              </div> :
              <div style={{margin: '15px auto'}} className="display-row space-between width-80">
                <Link className="button column center" style={{marginRight: 5}} to={routes.LOG_IN}>Log in</Link>
                <Link className="button column center" style={{marginLeft: 5}} to={routes.SIGN_UP}>Sign up</Link>
              </div>
            }
          </Col>
        </Row>
        <LandingBackground/>
      </Grid>
    )
  }
}

export default compose(
  connect(mapStateToProps),
)(LandingPage)