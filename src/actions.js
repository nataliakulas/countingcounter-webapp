export const COUNTER_SET_NAME = 'COUNTER_SET_NAME';
export const COUNTER_SET_TIME = 'COUNTER_SET_TIME';
export const COUNTER_SEARCH_NAME = 'COUNTER_SEARCH_NAME';

export const setCounterName = name => {
  return {
    type: COUNTER_SET_NAME,
    payload: name
  }
};

export const setCounterTime = time => {
  return {
    type: COUNTER_SET_TIME,
    payload: time
  }
};

export const searchCounterTime = name => {
  return {
    type: COUNTER_SEARCH_NAME,
    payload: name
  }
};
