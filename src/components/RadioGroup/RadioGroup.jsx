import React from 'react';
import PropTypes from 'prop-types';

import RadioButton from './RadioButton';

const mapRadio = name => (props) => {
  return (
    <RadioButton {...props} name={name} />
  );
};

const RadioGroup = (props) => {
  const { radiosProps, name } = props;
  const radios = radiosProps.map(mapRadio(name));

  return (
    <>
      {radios}
    </>
  );
};

RadioGroup.propTypes = {
  radiosProps: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default RadioGroup;
