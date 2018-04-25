import React from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-grid-system';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

import * as routes from '../routes';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';
import { db } from '../firebase/index';

import Field from '../components/Field';
import Input from '../components/Input';
import CounterPicker from '../components/CounterPicker';
import { filterCounterStartTime, filterCounterEndTime } from "../actions";

const mapStateToProps = (state) => ({
  startTime: state.counterFilter.startTime,
  endTime: state.counterFilter.endTime
});

const mapDispatchToProps = (dispatch) => ({
  onFilterCounterStartTime: (newStartTime) => dispatch(filterCounterStartTime(newStartTime)),
  onFilterCounterEndTime: (newEndTime) => dispatch(filterCounterEndTime(newEndTime)),
});

const Counter = (props) =>
  <div className="counter">
    <p>{props.time}</p>
    <p className="bold">{props.name}</p>
  </div>;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCounters: false,
      counters: [],
      search: ''
    };
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

        if (counters.length > 0) {
          this.setState(() => ({hasCounters: true, counters: counters}))
        }
      }
    );
  }

  updateSearch(e) {
    this.setState({search: e.target.value.substr(0, 20)})
  }

  updateStartTime = ({startDate: newStartTime}) => {
    this.props.onFilterCounterStartTime(newStartTime);
  };

  updateEndTime = ({endDate: newEndTime}) => {
    if (this.props.startTime.isAfter(newEndTime)) {
      newEndTime = this.props.startTime
    }

    this.props.onFilterCounterEndTime(newEndTime);
  };

  render() {
    let filteredCounters = this.state.counters.filter(
      counter => {
        return counter.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
    );

    let startTime = this.props && this.props.startTime;
    let endTime = this.props && this.props.endTime;

    return (
      <Container style={{height: '100vh'}}>
        {this.state.hasCounters ?
          <Row style={{height: '100vh'}}>
            <Col xs={6}>
              <Field legend={filteredCounters.length > 0 ? "Here are your counters" : "Sorry, no counters!"}
                     display="column center" margin="10% 0 0 0">
                {filteredCounters.map(counter =>
                  <Counter key={counter.key}
                           path={counter.key}
                           name={counter.name}
                           time={moment(counter.timestamp).format('YYYY-MM-DD')}/>
                )}
              </Field>
            </Col>
            <Col xs={6}>
              <div className="row space-between" style={{width: '60%', marginTop: '10%'}}>
                <Link className="button column center"
                      to={routes.CREATE}>Add new</Link>
              </div>
              <Input className="search"
                     margin="60px 0 0 0"
                     width="60%"
                     type="text"
                     placeholder="Counter name"
                     value={this.state.search}
                     onChange={e => this.updateSearch(e)}/>
              <div className="row space-between" style={{width: '60%'}}>
                <CounterPicker
                  className="search"
                  placeholderText="Start time"
                  selected={startTime}
                  selectsStart
                  startDate={startTime}
                  endDate={endTime}
                  onChange={newStartTime => this.updateStartTime({startDate: newStartTime})}
                />
                <CounterPicker
                  className="search"
                  placeholderText="End time"
                  selected={endTime}
                  selectsEnd
                  startDate={startTime}
                  endDate={endTime}
                  onChange={newEndTime => this.updateEndTime({endDate: newEndTime})}
                />
              </div>
            </Col>
          </Row> :
          <Row style={{height: '100vh'}}>
            <Col xs={4}/>
            <Col xs={4}>
              <Field display="column center" margin="10% 0 0 0">
                <p className="text-center">It seems like you don't have any counter yet</p>
                <Link className="button column center" to={routes.CREATE}>Set it up!</Link>
              </Field>
            </Col>
            <Col xs={4}/>
          </Row>
        }
      </Container>
    );
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(null, mapDispatchToProps),
  connect(mapStateToProps),
  withRouter
)(Dashboard);
