import React from 'react';
import PropTypes, { bool } from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

import checkMark from 'assets/check-mark.svg';

const DivInvalid = styled.div`
  color: #dc3545;
  margin-bottom: 8px;
  width: 100%;
`;

const Div = styled.div`
  position: relative;
`;

const Input = styled.input`
  transform: scale(1.5);
  margin-right: 5px;
  opacity: 0;

  @media print {
    opacity: unset;
  }
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0;
  box-shadow: none !important;
  margin-left: 23px;
  line-height: 25px;
  ${props => (props.disabled ? 'cursor: not-allowed;' : 'cursor: pointer;')}

  @media print {
    margin-left: 0;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    border-radius: 4px;
    top: 7px;
    width: 16px;
    height: 16px;
    ${props => (props.isChecked ? `
      background: var(--color-primary) url(${checkMark});
      border: 1px solid var(--color-primary);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 60% 60%;
    ` : `
      background: initial;
      border: 1px solid #909090;
    `)}

    @media print {
      content: unset;
    }
  }
`;

const RenderCheckbox = (props) => {
  const {
    label,
    input,
    field,
    form: { touched, errors },
    disabled,
  } = props;
  const checked = input.value || field.value;
  const error = get(errors, field.name);
  const hasError = get(touched, field.name) && error;

  return (
    <Div>
      <Label htmlFor={input.name} isChecked={checked} disabled={disabled}>
        {label}
        <Input
          id={input.name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...input}
          {...field}
          {...props}
        />
      </Label>
      {hasError && (
        <DivInvalid>{error}</DivInvalid>
      )}
    </Div>
  );
};

RenderCheckbox.propTypes = {
  input: PropTypes.shape({
    value: bool,
  }),
  field: PropTypes.shape({
    value: bool,
  }),
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
  }),
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

RenderCheckbox.defaultProps = {
  input: {
    value: false,
  },
  field: {
    value: false,
  },
  form: {
    touched: {},
    errors: {},
  },
  disabled: false,
  label: null,
};

export default RenderCheckbox;
