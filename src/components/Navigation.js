import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../routes';

const Navigation = ({authUser}) =>
  <div>{authUser ? <NavigationAuth/> : <NavigationNonAuth/>}</div>;

class NavigationAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  toggle = () => {
    this.setState({open: !this.state.open})
  };

  render() {
    return (
      <div className="navigation auth">
        <Grid>
          <Row>
            <Col xs={12}>
              <Link to={routes.DASHBOARD}><h1 className="title">Counting Counter</h1></Link>
              <div className={`nav-menu ${this.state.open ? "open" : ""}`}>
                <span/>
                <span className="nav-toggle" onClick={this.toggle}/>
                <span className="nav-toggle close" onClick={this.toggle}/>
                <ul>
                  <li><Link to={routes.PROFILE}>Profile</Link></li>
                  <li onClick={() => auth.logOut()}>Logout</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

class NavigationNonAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  toggle = () => {
    this.setState({open: !this.state.open})
  };

  render() {
    return (
      <div className="navigation">
        <Grid>
          <Row>
            <Col xs={12}>
              <Link to={routes.LANDING}><h1 className="title">Counting Counter</h1></Link>
              <div className={`nav-menu ${this.state.open ? "open" : ""}`}>
                <span/>
                <span className="nav-toggle" onClick={this.toggle}/>
                <span className="nav-toggle close" onClick={this.toggle}/>
                <ul>
                  <li><Link to={routes.LOG_IN}>Login</Link></li>
                  <li><Link to={routes.SIGN_UP}>Sign up</Link></li>
                </ul>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Navigation);


