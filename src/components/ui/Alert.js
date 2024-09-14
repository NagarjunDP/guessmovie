// src/components/ui/Alert.js
import React from 'react';

const Alert = ({ children }) => (
  <div className="alert">
    {children}
  </div>
);

const AlertDescription = ({ children }) => (
  <div className="alert-description">
    {children}
  </div>
);

export { Alert, AlertDescription }; // Named exports
