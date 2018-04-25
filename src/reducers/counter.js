import { COUNTER_SET_NAME, COUNTER_SET_TIME, COUNTER_FILTER_START_TIME, COUNTER_FILTER_END_TIME } from '../actions';

export function setCounterReducer(state = {name: '', time: ''}, action) {
  switch (action.type) {
    case COUNTER_SET_NAME : {
      return {
        ...state,
        name: action.payload,
      };
    }
    case COUNTER_SET_TIME : {
      return {
        ...state,
        time: action.payload,
      }
    }
    default :
      return state;
  }
}

export function filterCounterTime(state = {startTime: null, endTime: null}, action) {
  switch (action.type) {
    case COUNTER_FILTER_START_TIME: {
      return {
        ...state,
        startTime: action.payload
      }
    }
    case COUNTER_FILTER_END_TIME: {
      return {
        ...state,
        endTime: action.payload
      }
    }
    default :
      return state;
  }
}