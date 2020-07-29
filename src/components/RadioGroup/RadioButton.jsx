import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = (props) => {
  const {
    label,
    name,
    checked,
    onChange,
    value,
  } = props;

  const id = name + label + value;

  return (
    <>
      <label htmlFor={id}>
        <input
          style={{ marginRight: '5px' }}
          type="radio"
          id={id}
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
        />
        {label}
      </label>
    </>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RadioButton;
