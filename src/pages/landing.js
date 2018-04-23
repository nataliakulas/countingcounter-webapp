import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
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

        const direction = random(0, 1);
        const size = random(10, 150);
        const position = random(0, 100) + '%';
        const delay = random(1, 60) + 's';

        return <li key={i} className={direction === 0 ? 'up' : 'down'}
                   style={
                     {
                       width: size,
                       height: size,
                       left: position,
                       animationDelay: delay
                     }
                   }/>;
      })}
    </ul>
  )
};

const LandingPage = ({authUser}) => {
  return (
    <Container style={{height: '100vh'}}>
      <Row style={{height: '100vh'}}>
        <Col xs={1} sm={3} md={4}/>
        <Col xs={10} sm={6} md={4}>
          <Field display="column center" margin="50% 0 0 0">
            <p>Everyone is waiting for something.<br/>
              Everyday we count years, weeks, days...</p>
            <p>Counting Counter will count it for you!</p>
            <p>Set up multiple counters, change their format and write a special message to your future self!</p>

            {authUser ?
              <p><Link className="link" to={routes.DASHBOARD}>Go to dashboard</Link></p> :
              <p><Link className="link" to={routes.SIGN_UP}>Create an account</Link> today or
                <Link className="link" to={routes.LOG_IN}> log in</Link> if you are registered.</p>
            }
          </Field>
        </Col>
        <Col xs={1} sm={3} md={4}/>
      </Row>
      < LandingBackground/>
    </Container>
  )
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

export default compose(
  connect(mapStateToProps),
)(LandingPage)