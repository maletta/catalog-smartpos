import React from 'react';
import PropTypes, { bool, string } from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

import media from 'styles/media';

const DivInvalid = styled.div`
  font-size: 0.9rem;
  ${props => props.isErrorHide && (`
    display: none;
  `)}
  color: #dc3545;
  margin-bottom: 4px;
  width: 100%;
`;

const HelpText = styled.div`
  color: var(--color-gray-light-2);
  margin-bottom: 8px;
  width: 100%;
`;

const StyledLabel = styled.label`
  width: 100%;
  margin-bottom: 0;
`;

const OptionalLabel = styled.label`
  color: var(--color-gray-light-2);
  font-size: 0.8rem;
  margin: 0 0 0 10px;
`;

const StyledInput = styled.input`
  background: #fff;
  border: 1px solid ${props => (props.hasError ? '#dc3545' : '#d7d7d7')};
  border-radius: 0.1rem;
  box-shadow: none;
  color: #212121;
  font-size: 0.8rem;
  line-height: 1.5;
  outline: initial;
  padding: 0.7rem 0.75rem 0.65rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;
  margin-top: 0;
  display: block;

  :focus {
    border-color: ${props => (props.hasError ? '#dc3545' : 'var(--color-primary)')};
  }

  :disabled {
    background-color: var(--color-gray-light);
    color: var(--color-gray-light-2);
  }
`;

const ValueContainer = styled.div`
  margin-bottom: 24px;
  ${media.desktop`
    margin-bottom: 16px;
  `}
`;

const Value = styled.div`
  font-size: 16px;
  margin: 8px 0;
`;

const Label = styled.span`
  font-size: 0.9rem;
  line-height: 1.25em;
  ${props => props.isLabelFloat && (`
    position: relative;
    left: 12px;
    top: 16px;
    background-color: var(--color-white);
    padding: 4px;
    color: #707070;
  `)}

  ${props => props.isRequired && (`
    :after {
      content: " *";
    }
  `)}
`;

const Static = styled.span`
  &&& {
    border-radius: 0.1rem;
    box-shadow: none;
    color: #212121;
    font-size: 0.8rem;
    line-height: 1.5;
    outline: initial;
    padding: 0.7rem 0.75rem 0.65rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-top: 5px;
    display: block;
  }
`;

const Input = ({
  inputId,
  label,
  invalid,
  errorMessage,
  field,
  form: { touched, errors },
  formatter,
  hasAccess,
  isSelectedOnFocus,
  helpText,
  optionalLabel,
  isErrorHide,
  isLabelFloat,
  staticTextLeft,
  staticTextRight,
  isRequired,
  ...props
}) => {
  const error = errorMessage || get(errors, field.name);
  const hasError = invalid || (get(touched, field.name) && error);

  if (hasAccess) {
    return (
      <>
        <StyledLabel htmlFor={inputId}>
          <Label
            isLabelFloat={isLabelFloat}
            isRequired={isRequired}
          >
            {label}
          </Label>
          {optionalLabel && (<OptionalLabel>{optionalLabel}</OptionalLabel>)}

          <div>
            <div className="input-group-prepend">
              {staticTextLeft && (<Static className="input-group-text">{staticTextLeft}</Static>)}
              <StyledInput
                id={inputId}
                hasError={hasError}
                {...field}
                {...props}
                onFocus={(event) => {
                  if (isSelectedOnFocus) {
                    event.target.select();
                  }
                }}
                aria-required={isRequired}
              />
              {staticTextRight && (<Static className="input-group-text">{staticTextRight}</Static>)}
            </div>
          </div>
        </StyledLabel>
        {(helpText ? <HelpText>{helpText}</HelpText> : <DivInvalid isErrorHide={isErrorHide}>{hasError ? error : '​'}</DivInvalid>)}
      </>
    );
  }

  return (
    <ValueContainer htmlFor={inputId}>
      {label}
      <Value id={inputId}>
        {formatter(field.value || props.value)}
      </Value>
    </ValueContainer>
  );
};

Input.propTypes = {
  field: PropTypes.shape({}),
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  formatter: PropTypes.func,
  hasAccess: PropTypes.bool,
  isSelectedOnFocus: PropTypes.bool,
  helpText: PropTypes.string,
  optionalLabel: PropTypes.string,
  isLabelFloat: PropTypes.bool,
  staticTextLeft: PropTypes.string,
  staticTextRight: PropTypes.string,
  isRequired: PropTypes.bool,
  inputId: PropTypes.string,
  label: PropTypes.string.isRequired,
  invalid: bool,
  errorMessage: string,
  isErrorHide: bool,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.any,
};

Input.defaultProps = {
  field: {},
  form: {
    touched: {},
    errors: {},
  },
  formatter: value => (value),
  isSelectedOnFocus: false,
  hasAccess: true,
  helpText: null,
  optionalLabel: null,
  isLabelFloat: false,
  staticTextLeft: null,
  staticTextRight: null,
  isRequired: false,
  inputId: '',
  invalid: false,
  errorMessage: '',
  isErrorHide: false,
};

export default Input;
