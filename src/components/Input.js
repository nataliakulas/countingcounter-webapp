import React from 'react';

export default  (props) => {
  return (
    <input className="input"
           id={props.id}
           value={props.value}
           onChange={props.onChange}
           type={props.type}
           placeholder={props.placeholder}
    />
  )
};
