import React from 'react';
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
      <div className={`nav-menu ${this.state.open ? "open" : ""}`}>
        <span/>
        <span className="nav-toggle" onClick={this.toggle}/>
        <span className="nav-toggle close" onClick={this.toggle}/>
        <ul>
          <li><Link to={routes.DASHBOARD}>Dashboard</Link></li>
          <li><Link to={routes.PROFILE}>Profile</Link></li>
          <li onClick={() => auth.logOut()}>Logout</li>
        </ul>
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
      <div className={`nav-menu ${this.state.open ? "open" : ""}`}>
        <span/>
        <span className="nav-toggle" onClick={this.toggle}/>
        <span className="nav-toggle close" onClick={this.toggle}/>
        <ul>
          <li><Link to={routes.LANDING}>Home</Link></li>
          <li><Link to={routes.LOG_IN}>Login</Link></li>
          <li><Link to={routes.SIGN_UP}>Sign up</Link></li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Navigation);


