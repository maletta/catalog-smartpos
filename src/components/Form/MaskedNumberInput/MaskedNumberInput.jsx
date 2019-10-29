import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import Input from 'components/Form/Input';

const MaskedNumberInput = props => (
  <NumberFormat
    allowNegative={false}
    value={props.field.value || undefined}
    onValueChange={({ value }) => {
      props.form.setFieldValue(props.field.name, value);
    }}
    onBlur={props.field.onBlur}
    name={props.field.name}
    format={props.format}
    mask="_"
    type="tel"
    {...props}
    customInput={Input}
  />
);

MaskedNumberInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  format: PropTypes.string.isRequired,
};

export default MaskedNumberInput;
