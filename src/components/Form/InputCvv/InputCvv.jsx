import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

import BgCvv from 'assets/CVV.png';

const DivInvalid = styled.div`
  font-size: 0.9rem;
  color: #dc3545;
  margin-bottom: 4px;
  margin-top: 3px;
  width: 100%;
  height: 15px;
`;

const StyledLabel = styled.label`
  font-size: 0.9rem;
  width: 100%;
  margin-bottom: 0;
  position: relative;
  padding-right: 70px;
`;

const OptionalLabel = styled.label`
  color: var(--color-gray-light-2);
  font-size: 0.8rem;
  margin: 0 0 0 10px;
`;

const brandPosition = {
  none: {
    positionBg: '0 0',
  },
  mastercard: {
    positionBg: '0 0',
  },
  visa: {
    positionBg: '0 0',
  },
  amex: {
    positionBg: '0 -43px',
  },
  diners: {
    positionBg: '0 0',
  },
  elo: {
    positionBg: '0 0',
  },
};

const StyledInput = styled.input`
  background: #fff no-repeat;
  border: 1px solid #212121;
  border-color: ${props => (props.hasError ? '#dc3545' : '#d7d7d7')};
  border-radius: 0.1rem;
  box-shadow: none;
  color: #212121;
  font-size: 0.8rem;
  line-height: 1.5;
  outline: initial;
  padding: 0.7rem 0.75rem 0.65rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;
  margin-top: 1px;

  :focus {
    border-color: ${props => (props.hasError ? '#dc3545' : 'var(--button-primary-background)')};
  }

  :disabled {
    background-color: var(--color-gray-light);
    color: var(--color-gray-light-2);
  }
`;

const CvvCard = styled.span`
  position: absolute;
  width: 70px;
  height: 43px;
  background: url(${BgCvv}) #fff no-repeat ${props => (props.brand && brandPosition[props.brand].positionBg)};
  transition: background-position 0.2s ease-in;
`;


const InputCvv = ({
  inputId,
  label,
  invalid,
  errorMessage,
  field,
  form: { touched, errors },
  formatter,
  brand,
  hasAccess,
  isSelectedOnFocus,
  innerRef,
  optionalLabel,
  ...props
}) => {
  const error = errorMessage || get(errors, field.name);
  const hasError = invalid || (get(touched, field.name) && error);

  return (
    <>
      <StyledLabel htmlFor={inputId}>
        {`${label} *`}
        {optionalLabel && (<OptionalLabel>{optionalLabel}</OptionalLabel>)}
        <StyledInput
          id={inputId}
          hasError={hasError}
          ref={innerRef}
          {...field}
          {...props}
          onFocus={(event) => {
            if (isSelectedOnFocus) {
              event.target.select();
            }
          }}
        />
        <CvvCard brand={brand} />
      </StyledLabel>
      <DivInvalid>{hasError ? error : ''}</DivInvalid>
    </>
  );
};

InputCvv.propTypes = {
  field: PropTypes.any,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  formatter: PropTypes.func,
  hasAccess: PropTypes.bool,
  isSelectedOnFocus: PropTypes.bool,
  brand: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  optionalLabel: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  invalid: PropTypes.string,
  errorMessage: PropTypes.string,
  innerRef: PropTypes.PropTypes.shape({}),
};

InputCvv.defaultProps = {
  field: PropTypes.any,
  form: {
    touched: {},
    errors: {},
  },
  formatter: value => (value),
  isSelectedOnFocus: false,
  hasAccess: true,
  brand: 'none',
  optionalLabel: null,
  invalid: null,
  errorMessage: null,
  innerRef: null,
};

export default InputCvv;
