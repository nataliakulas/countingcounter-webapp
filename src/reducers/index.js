import { combineReducers } from 'redux';

import sessionReducer from './session';
import setCounterReducer from './counter';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  counterState: setCounterReducer,
});

export default rootReducer;