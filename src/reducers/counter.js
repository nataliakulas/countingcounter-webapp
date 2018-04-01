import { COUNTER_SET_NAME, COUNTER_SET_TIME } from '../actions';

const INITIAL_STATE = {
  name: '',
  time: '',
};

function counterReducer(state = INITIAL_STATE, action) {
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

export default counterReducer;