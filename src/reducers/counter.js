import { COUNTER_SET_NAME, COUNTER_SET_TIME, COUNTER_SEARCH_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  time: '',
};

function setCounterReducer(state = INITIAL_STATE, action) {
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

function searchCounterReducer(state = '', action) {
  switch (action.type) {
    case COUNTER_SEARCH_NAME:
      return action.payload
    default:
      return state
  }
}

export default setCounterReducer;