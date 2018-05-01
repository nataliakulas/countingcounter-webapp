import React from 'react';

export default (props) =>
  <div className={`${props.title ? "field-border with-title" : "field-border"}`}
       style={{margin: `${props.margin ? props.margin : ""}`, padding: `${props.padding ? props.padding : ""}`}}>
    <div className={`field ${props.display ? props.display : ""}`}>
      {props.title ?
        <h2 className="field-title">{props.title}</h2> : null}
      {props.children}
    </div>
  </div>
;