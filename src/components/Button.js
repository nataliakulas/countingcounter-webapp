import React from 'react';

export default  (props) =>
  <button className="button"
          id={props.id}
          type={props.type}
          disabled={props.disabled}
          onClick={props.onClick}>{props.children}
  </button>;
