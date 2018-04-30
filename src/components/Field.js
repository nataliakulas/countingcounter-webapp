import React from 'react';

export default (props) =>
  <div className={`field ${props.display ? props.display : ""}`}
       style={{margin: `${props.margin ? props.margin : ""}`, padding: `${props.padding ? props.padding : ""}`}}>
    {props.legend ?
      <h2 className="field-legend">{props.legend}</h2> : null}
    {props.children}
  </div>;