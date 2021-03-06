import React from 'react';

export const Error = (props) =>
  <div className="error">
    <p>{props.children}</p>
  </div>;

export const Success = (props) =>
  <div className="success">
    <p>{props.children}</p>
  </div>;

export const Warning = (props) =>
  <div className="warning">
    <p>{props.children}</p>
  </div>;

export const Create = (props) =>
  <div className="create">
    <p>{props.children}</p>
  </div>;

export const Remove = (props) =>
  <div className="remove">
    <p>{props.children}</p>
  </div>;
