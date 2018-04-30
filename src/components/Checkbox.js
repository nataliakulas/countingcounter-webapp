import React from 'react';

export default (props) =>
  <div className={`checkbox-wrapper ${props.position ? props.position : ""}`}>
    <label className={`checkbox ${props.type ? props.type : ""}`}>{props.children}
      <input type="checkbox" checked={props.checked} readOnly={props.readOnly}/>
      <span className="checkmark"/>
    </label>
    <p className={`checkbox-label ${props.checked ? '' : 'placeholder'}`}>{props.label}</p>
  </div>;