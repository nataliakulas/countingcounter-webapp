import { combineReducers } from 'redux';

import sessionReducer from './session';
import counterReducer from './counter';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  counterState: counterReducer,
});

export default rootReducer;