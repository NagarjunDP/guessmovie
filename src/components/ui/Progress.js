// Progress.js
import React from 'react';

const Progress = ({ value, max }) => (
  <progress value={value} max={max}></progress>
);

export default Progress;
