import { combineReducers } from 'redux';

import sessionReducer from './session';
import { setCounterReducer, filterCounterTime } from './counter';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  counterState: setCounterReducer,
  counterFilter: filterCounterTime,
});

export default rootReducer;