import React from 'react';
import styled from 'styled-components';
import {
  number,
  string,
  shape,
  bool,
} from 'prop-types';
import get from 'lodash/get';
import media from 'styles/media';

const Label = styled.label`
  width: 100%;
  margin-bottom: 0;
`;

const Textarea = styled.textarea`
  background: #fff;
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
  margin-top: 5px;

  :focus {
    border-color: ${props => (props.hasError ? '#dc3545' : 'var(--color-primary)')};
  }
`;

const DivInvalid = styled.div`
  color: #dc3545;
  margin-bottom: 8px;
  width: 100%;
`;

const ValueContainer = styled.div`
  margin-bottom: 24px;
  ${media.desktop`
    margin-bottom: 16px;
  `}
`;

const Value = styled.div` 
  margin: 8px 0;
  font-size: 16px;
`;

const TextArea = (props) => {
  const {
    inputId,
    label,
    rows,
    invalid,
    errorMessage,
    field,
    form: { touched, errors },
    hasAccess,
  } = props;

  const error = errorMessage || get(errors, field.name);
  const hasError = invalid || (get(touched, field.name) && error);

  if (hasAccess) {
    return (
      <>
        <Label htmlFor={inputId}>
          {label}
          <Textarea
            id={inputId}
            rows={rows}
            invalid={invalid}
            hasError={hasError}
            autoFocus={false}
            {...field}
            {...props}
          >
            {field.value}
          </Textarea>
        </Label>
        <DivInvalid>{hasError ? error : '​'}</DivInvalid>
      </>
    );
  }

  return (
    <ValueContainer htmlFor={inputId}>
      {label}
      <Value id={inputId}>
        {field.value}
      </Value>
    </ValueContainer>
  );
};

TextArea.propTypes = {
  inputId: string.isRequired,
  invalid: bool,
  rows: number,
  errorMessage: string,
  label: string.isRequired,
  field: shape({}),
  hasAccess: bool,
  form: shape({
    touched: shape({}),
    errors: shape({}),
  }),
};

TextArea.defaultProps = {
  errorMessage: '',
  invalid: false,
  rows: 1,
  field: {},
  form: {
    touched: {},
    errors: {},
  },
  hasAccess: true,
};

export default TextArea;
