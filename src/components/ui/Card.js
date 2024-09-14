import React from 'react';

const Card = ({ children }) => (
  <div className="card">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="card-header">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <div className="card-title">
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="card-content">
    {children}
  </div>
);

const CardFooter = ({ children }) => (
  <div className="card-footer">
    {children}
  </div>
);

// Export all components
export { Card, CardHeader, CardTitle, CardContent, CardFooter };
