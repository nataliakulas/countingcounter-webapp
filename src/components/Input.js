import React from 'react';

export default (props) =>
  <input className={`input ${props.className ? props.className : ""}`}
         style={{
           margin: `${props.margin ? props.margin : ""}`,
           width: `${props.width ? props.width : ""}`
         }}
         id={props.id}
         value={props.value}
         onChange={props.onChange}
         type={props.type}
         placeholder={props.placeholder}/>;
