export const COUNTER_SET_NAME = 'COUNTER_SET_NAME';
export const COUNTER_SET_TIME = 'COUNTER_SET_TIME';
export const COUNTER_FILTER_START_TIME = 'COUNTER_FILTER_START_TIME';
export const COUNTER_FILTER_END_TIME = 'COUNTER_FILTER_END_TIME';

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

export const filterCounterStartTime = startTime => {
  return {
    type: COUNTER_FILTER_START_TIME,
    payload: startTime
  }
};

export const filterCounterEndTime = endTime => {
  return {
    type: COUNTER_FILTER_END_TIME,
    payload: endTime
  }
};