import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

import BgCreditCard from 'assets/credit_card.png';

const DivInvalid = styled.div`
  color: #dc3545;
  margin-bottom: 8px;
  width: 100%;
  height: 15px;
`;

const StyledLabel = styled.label`
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
  margin: 0;

  :focus {
    border-color: ${props => (props.hasError ? '#dc3545' : 'var(--color-primary)')};
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
  background: url(${BgCreditCard}) #fff no-repeat ${props => (props.brand && brandPosition[props.brand].positionBg)};
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
        {label}
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
  field: PropTypes.shape({}),
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
};

export default InputCreditCard;
