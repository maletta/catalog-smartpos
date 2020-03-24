import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import Input from 'components/Form/Input';

const MaskInput = props => (
  <NumberFormat
    value={props.field.value}
    onValueChange={(value) => {
      if (value) {
        props.form.setFieldValue(props.field.name, value.floatValue);
      }
    }}
    onBlur={props.field.onBlur}
    {...props}
    customInput={Input}
  />
);

MaskInput.propTypes = {
  field: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  format: PropTypes.string.isRequired,
};

export default MaskInput;
