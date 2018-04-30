import React from 'react';

export default (props) =>
  <textarea className="textarea"
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            rows={props.rows}
            readOnly={props.readOnly}/>;