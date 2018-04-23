export const COUNTER_SET_NAME = 'COUNTER_SET_NAME';
export const COUNTER_SET_TIME = 'COUNTER_SET_TIME';

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