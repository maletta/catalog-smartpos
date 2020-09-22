import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

import BgCreditCard from 'assets/credit_card.png';

const DivInvalid = styled.div`
  font-size: 0.9rem;
  color: #dc3545;
  margin-bottom: 4px;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 0.9rem;
  width: 100%;
  margin-bottom: 0;
  margin-top: 3px;
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
    positionBg: '0 -43px',
  },
  visa: {
    positionBg: '0 -86px',
  },
  amex: {
    positionBg: '0 -129px',
  },
  diners: {
    positionBg: '0 -172px',
  },
  elo: {
    positionBg: '0 -215px',
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

const BrandCard = styled.span`
  position: absolute;
  width: 70px;
  height: 43px;
  background: url(${BgCreditCard}) #fff no-repeat ${props => (brandPosition[props.brand] && brandPosition[props.brand].positionBg)};
  transition: background-position 0.2s ease-in;
`;

const InputCreditCard = ({
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
        <BrandCard brand={brand} />
      </StyledLabel>
      <DivInvalid>{hasError ? error : ''}</DivInvalid>
    </>
  );
};

InputCreditCard.propTypes = {
  field: PropTypes.any,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  formatter: PropTypes.func,
  hasAccess: PropTypes.bool,
  isSelectedOnFocus: PropTypes.bool,
  brand: PropTypes.string,
  optionalLabel: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  invalid: PropTypes.string,
  errorMessage: PropTypes.string,
  innerRef: PropTypes.PropTypes.shape({}),
};

InputCreditCard.defaultProps = {
  field: {},
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

export default InputCreditCard;
