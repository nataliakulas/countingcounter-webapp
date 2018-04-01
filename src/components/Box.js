import React from 'react';

export default (props) =>
  <div className={`box ${props.display ? props.display : ""}`}
       style={{
         width: props.width,
         margin: props.margin,
       }}>
    {props.children}
  </div>;
