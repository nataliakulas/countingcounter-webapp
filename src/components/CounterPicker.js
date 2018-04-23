import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css';

export default (props) =>
  <DatePicker
    className={props.className}
    placeholderText={props.placeholderText}
    inline={props.inline}
    selected={props.selected}
    onChange={props.onChange}
    dropdownMode="select"
    minDate={props.minDate}
    dateFormat="YYYY/MM/DD"
    showMonthDropdown
    showYearDropdown
    dateFormatCalendar="MMMM"
    scrollableYearDropdown
    yearDropdownItemNumber={10}
    showTimeSelect={props.showTimeSelect}
    timeFormat={props.timeFormat}
    timeIntervals={props.timeIntervals}
    timeCaption={props.timeCaption}
    selectsStart={props.selectsStart}
    selectsEnd={props.selectsEnd}
    startDate={props.startDate}
    endDate={props.endDate}
  />;