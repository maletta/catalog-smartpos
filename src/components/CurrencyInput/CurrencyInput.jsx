import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Form/Input';
import NumberFormat from 'react-number-format';

const CurrencyInput = props => (
  <NumberFormat
    fixedDecimalScale
    decimalScale={2}
    prefix="R$ "
    thousandSeparator="."
    decimalSeparator=","
    value={props.field.value}
    onValueChange={(value) => {
      props.form.setFieldValue(props.field.name, value.floatValue);
    }}
    onBlur={props.field.onBlur}
    type="tel"
    {...props}
    customInput={Input}
    isSelectedOnFocus
  />
);

CurrencyInput.propTypes = {
  field: PropTypes.any.isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  allowNegative: PropTypes.bool,
};

CurrencyInput.defaultProps = {
  allowNegative: false,
};

export default CurrencyInput;
