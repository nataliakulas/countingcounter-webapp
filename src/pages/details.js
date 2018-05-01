import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import moment from 'moment/moment';

import * as routes from '../routes';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';
import { db } from '../firebase';

import Loader from '../components/Loader';
import Field from '../components/Field';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Textarea from '../components/Textarea';
import Modal from '../components/Modal';

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

class CounterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: '',
      format: "seconds",
      modal: false,
      loading: true
    }
  }

  componentWillMount() {
    db.getCounters().then(snap => {
      const counters = [];

      snap.forEach(item => {
        let counter = item.val();
        counter.key = item.key;

        if (this.props.authUser.uid === counter.uid) {
          counters.push(counter)
        }
      });
      counters.forEach(counter => {
        if (counter.key === this.props.match.params.id) {
          this.setState({counter: counter, loading: false})
        }
      })
    })
  }

  changeFormat = (e) => {
    this.setState({format: e.target.value})
  };

  deleteCounter = () => {
    db.deleteCounter(this.state.counter.key);
    this.props.history.push(routes.DASHBOARD)
  };

  onOpen = () => {
    this.setState({modal: true})
  };

  onClose = () => {
    this.setState({modal: false})
  };

  render() {
    const now = moment();
    const counterTime = moment(this.state.counter.timestamp);
    const formatWeekday = "dddd";
    const formatDate = "Do MMMM YYYY";
    const formatTime = "HH:mm";

    const formats = ["seconds", "minutes", "hours", "days", "months", "years"];

    if (this.state.loading) {
      return (
        <Loader/>
      )
    }

    return (
      <Grid>
        <Modal show={this.state.modal} close={this.onClose} className="column center">
          <p>Do you really want to delete this counter?</p>
          <div className="row" style={{width: '80%', marginTop: 30}}>
            <Button onClick={this.onClose}>No!</Button>
            <Button onClick={this.deleteCounter}>Yes!</Button>
          </div>
        </Modal>
        <Row top="xs" style={{minHeight: 'calc(100vh - 110px)'}}>
          <Col xsOffset={1} xs={10} smOffset={2} sm={8} lgOffset={3} lg={6} xlOffset={0} xl={12}
               style={{marginTop: 110}}>
            <Field title={this.state.counter.name ? this.state.counter.name : "Waiting for counter.."}
                   display="field-padding">
              <Row>
                <Col xs={12} xl={6}>
                  <div className="counter-box">
                    <div className="half top">
                      <p className="bold">Counter set to:</p>
                      <div>
                        <p>{counterTime.format(formatWeekday)},</p>
                        <p>{counterTime.format(formatDate)}</p>
                        <p>{counterTime.format(formatTime)}</p>
                      </div>
                    </div>
                    {counterTime.isAfter(now) ?
                      <div className="half bottom">
                        <p className="bold">Remaining time:</p>
                        <div>
                          <p className="counter-time">{counterTime.diff(now, this.state.format)}</p>
                          <select value={this.state.format} onChange={e => this.changeFormat(e)}
                                  className="counter-format">
                            {formats.map((format, i) => {
                              return <option key={i} value={format}>{format}</option>
                            })}
                          </select>
                        </div>
                      </div> :
                      <div className="half bottom" style={{justifyContent: 'center'}}>
                        {this.state.counter.message && counterTime.isBefore(now) ?
                          <p>It is time! You can read a message now.</p> : null}
                        {!this.state.counter.message && counterTime.isBefore(now) ? <p>Time is up!</p> : null}
                      </div>
                    }
                  </div>
                </Col>
                <Col xs={12} xl={6} className="column center" style={{justifyContent: 'flex-start'}}>
                  {this.state.counter.message ?
                    <Checkbox checked={this.state.counter.message && counterTime.isBefore(now)} type="message"
                              position="self-align-end" readOnly/> : null}
                  {this.state.counter.message && counterTime.isBefore(now) ?
                    <Textarea value={this.state.counter.message}
                              rows={7}
                              readOnly/> : null
                  }
                  <Button onClick={this.onOpen}>Delete</Button>
                </Col>
              </Row>
            </Field>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps),
  withRouter
)(CounterDetails)