import React from 'react';

const Spinner = () => (
  <div className="spin-loader-container">
    <svg viewBox="0 0 50 50" className="spin-loader">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="2"
      />
    </svg>
  </div>
);

export default Spinner;
