import React from 'react';

export default (props) =>
  <div className="checkbox-wrapper">
    <label className="checkbox">{props.children}
      <input type="checkbox" checked={props.checked} readOnly={props.readOnly}/>
      <span className="checkmark"/>
    </label>
    <p className={`checkbox-label ${props.checked ? '' : 'placeholder'}`}>{props.label}</p>
  </div>;