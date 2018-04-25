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
import Button from '../components/Button';
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
    this.getCounters();
  }

  componentWillReceiveProps(nextProps) {
    let filteredCounters = [];

    if (!nextProps.startTime && !nextProps.endTime) {
      this.getCounters();
    }
    else if (this.props.startTime !== nextProps.startTime) {
      console.log('startTime has changed!', nextProps.startTime);

      this.state.counters.filter(counter => {
        let counterTime = moment(counter.timestamp);

        if (counterTime.isSameOrAfter(nextProps.startTime)) {
          filteredCounters.push(counter);
        }
      });
      this.setState({counters: filteredCounters})
    }
    else if (this.props.endTime !== nextProps.endTime) {
      console.log('endTime has changed!', nextProps.endTime);

      this.state.counters.filter(counter => {
        let counterTime = moment(counter.timestamp);

        if (counterTime.isSameOrBefore(nextProps.endTime)) {
          filteredCounters.push(counter);
        }
      });
      this.setState({counters: filteredCounters})
    }
  }

  getCounters() {
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
  };

  updateSearch(e) {
    this.setState({search: e.target.value.substr(0, 20)})
  }

  updateStartTime = ({startDate: newStartTime}, e) => {
    if (this.props.endTime && this.props.endTime.isBefore(newStartTime)) {
      return e.preventDefault;
    }

    this.props.onFilterCounterStartTime(newStartTime);
  };

  updateEndTime = ({endDate: newEndTime}, e) => {
    if (this.props.startTime && this.props.startTime.isAfter(newEndTime)) {
      return e.preventDefault;
    }

    this.props.onFilterCounterEndTime(newEndTime);
  };

  resetFilters = (e) => {
    this.getCounters();
    this.setState({search: ''});
    this.updateStartTime({startDate: null}, e);
    this.updateEndTime({endDate: null}, e);
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
            <Col xs={1}/>
            <Col xs={5}>
              <div className="row space-between" style={{marginTop: '10%'}}>
                <Link className="button column center"
                      to={routes.CREATE}>Add new</Link>
              </div>
              <Field legend="Set filter" display="column center" margin="60px 0 0 0">
                <Input className="search"
                       width='100%'
                       type="text"
                       placeholder="Counter name"
                       value={this.state.search}
                       onChange={e => this.updateSearch(e)}/>
                <div className="row space-between" style={{width: '100%'}}>
                  <CounterPicker
                    className="search"
                    placeholderText="Start time"
                    selected={startTime}
                    selectsStart
                    startDate={startTime}
                    endDate={endTime}
                    onChange={(newStartTime, e) => this.updateStartTime({startDate: newStartTime}, e)}
                  />
                  <CounterPicker
                    className="search"
                    placeholderText="End time"
                    selected={endTime}
                    selectsEnd
                    startDate={startTime}
                    endDate={endTime}
                    onChange={(newEndTime, e) => this.updateEndTime({endDate: newEndTime}, e)}
                  />
                </div>
                <div className="row space-between" style={{width: '60%'}}>
                  <Button type="button" className="column center" onClick={this.resetFilters}>Reset</Button>
                </div>
              </Field>
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
