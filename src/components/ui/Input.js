// Input.js
import React from 'react';

const Input = ({ type, value, onChange }) => (
  <input type={type} value={value} onChange={onChange} />
);

export default Input;
