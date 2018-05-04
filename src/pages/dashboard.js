import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

import * as routes from '../routes';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';
import { db } from '../firebase/index';

import Loader from '../components/Loader';
import Field from '../components/Field';
import Input from '../components/Input';
import Button from '../components/Button';
import CounterPicker from '../components/CounterPicker';
import { filterCounterStartTime, filterCounterEndTime } from "../actions";

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  startTime: state.counterFilter.startTime,
  endTime: state.counterFilter.endTime
});

const mapDispatchToProps = (dispatch) => ({
  onFilterCounterStartTime: (newStartTime) => dispatch(filterCounterStartTime(newStartTime)),
  onFilterCounterEndTime: (newEndTime) => dispatch(filterCounterEndTime(newEndTime)),
});

const Counter = (props) =>
  <Link to={routes.DETAILS + props.path} className={`counter ${props.message ? 'message' : ''}`}>
    <p>{props.time}</p>
    <p className="bold">{props.name}</p>
  </Link>;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCounters: false,
      counters: [],
      search: '',
      loading: true
    };
  }

  componentDidMount() {
    this.getCounters();
  }

  componentWillReceiveProps(nextProps) {
    let filteredCounters = [];

    if (!nextProps.startTime && !nextProps.endTime) {
      this.getCounters();
    }
    else if (this.props.startTime !== nextProps.startTime) {
      this.state.counters.forEach(counter => {
        let counterTime = moment(counter.timestamp);

        if (counterTime.isSameOrAfter(nextProps.startTime)) {
          filteredCounters.push(counter);
        }
      });
      this.setState({counters: filteredCounters})
    }
    else if (this.props.endTime !== nextProps.endTime) {
      this.state.counters.forEach(counter => {
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

          if (this.props.authUser.uid === counter.uid) {
            counters.push(counter)
          }
        });

        if (counters.length > 0) {
          this.setState(() => ({hasCounters: true, counters: counters, loading: false}))
        }
      }
    );
  }

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

    if (this.state.loading) {
      return (
        <Loader/>
      )
    }

    return (
      <Grid>
        {this.state.hasCounters ?
          <Row top="xs" style={{minHeight: 'calc(100vh - 110px)'}}>
            <Col xsOffset={1} xs={10} smOffset={1} sm={5} xlOffset={0} xl={6} style={{marginTop: 110}}>
              <Field title={filteredCounters.length > 0 ? "Here are your counters" : "Sorry, no counters!"}
                     display="column center">
                {filteredCounters.map(counter =>
                  <Counter key={counter.key}
                           path={counter.key}
                           name={counter.name}
                           time={moment(counter.timestamp).format('dddd, DD-MM-YYYY')}
                           message={counter.message}/>
                )}
              </Field>
            </Col>

            <Col xsOffset={1} xs={10} smOffset={1} sm={5} lg={4} xl={5} style={{marginTop: 110}}>
              <div className="display-row space-between">
                <Link className="button column center"
                      to={routes.CREATE}>Add new</Link>
              </div>
              <Field title="Filters" display="column center" margin="60px 0 0 0">
                <Input className="search"
                       type="text"
                       placeholder="Counter name"
                       value={this.state.search}
                       onChange={e => this.updateSearch(e)}/>
                <div className="filters-wrapper">
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
                <div className="display-row space-between" style={{width: '60%'}}>
                  <Button type="button" className="column center" onClick={this.resetFilters}>Reset</Button>
                </div>
              </Field>
            </Col>
          </Row> :
          <Row middle="xs" style={{minHeight: 'calc(100vh - 110px)'}}>
            <Col xsOffset={1} xs={10} smOffset={3} sm={6} lgOffset={4} lg={4}>
              <Field display="column center" margin="10% 0 0 0">
                <p className="text-center">It seems like you don't have any counter yet</p>
                <Link className="button column center" to={routes.CREATE}>Set it up!</Link>
              </Field>
            </Col>
          </Row>
        }
      </Grid>
    );
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(null, mapDispatchToProps),
  connect(mapStateToProps),
  withRouter
)(Dashboard);
