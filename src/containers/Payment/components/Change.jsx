import React from 'react';
import PropTypes from 'prop-types';

const Change = ({ value }) => (
  <>
    <small>Troco</small>
    <p style={{ marginTop: '10px' }}>{value}</p>
  </>
);

Change.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Change;
