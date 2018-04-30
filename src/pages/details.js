import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { Container, Row, Col } from 'react-grid-system';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';
import { db } from '../firebase';

import Field from '../components/Field';
import Button from '../components/Button';
import moment from "moment/moment";

class CounterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: '',
      format: "seconds"
    }
  }

  componentWillMount() {
    db.getCounters().then(snap => {
      const counters = [];

      snap.forEach(item => {
        let counter = item.val();
        counter.key = item.key;

        counters.push(counter)
      });
      console.log(counters);

      counters.forEach(counter => {
        console.log(counter.key)
        if (counter.key === this.props.match.params.id) {
          this.setState({counter: counter})
        }
      })
    })
  }

  changeFormat = (e) => {
    this.setState({format: e.target.value})
  };

  render() {
    const now = moment();
    const timer = moment(this.state.counter.timestamp);
    const formatWeekday = "dddd";
    const formatDate = "DD MMMM YYYY";
    const formatTime = "HH:mm";

    const formats = ["seconds", "minutes", "hours", "days", "months", "years"];

    return (
      <Container>
        <Row>
          <Col xs={12}>
            <Field legend={this.state.counter.name ? this.state.counter.name : "Waiting for counter.."}
                   margin="10% 0 0 0" padding="50px 60px">
              <Row>
                <Col xs={6}>
                  <div className="counter-box">
                    <div className="half top">
                      <p className="bold">Counter set to:</p>
                      <div>
                        <p>{timer.format(formatWeekday)},</p>
                        <p>{timer.format(formatDate)}</p>
                        <p>{timer.format(formatTime)}</p>
                      </div>
                    </div>
                    <div className="half bottom">
                      <p className="bold">Remaining time:</p>
                      <div>
                        <p>{timer.diff(now, this.state.format)}</p>
                        <select value={this.state.format} onChange={e => this.changeFormat(e)}
                                className="counter-format">
                          {formats.map((format, i) => {
                            return <option key={i} value={format}>{format}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={6} className="column center">
                  <Button>Edit</Button>
                </Col>
              </Row>
            </Field>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default compose(
  withAuthorization(authCondition),
  withRouter
)(CounterDetails)