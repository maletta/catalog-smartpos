import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';

import {
  bool,
  string,
  shape,
  arrayOf,
  func,
  object,
  oneOfType,
  any,
  oneOf,
} from 'prop-types';

import './style.css';

const Label = styled.label`
  width: 100%;
  margin-bottom: 4px;
  font-size: 0.9rem;
`;

const Text = styled.span`
  ${props => props.isRequired && (`
    :after {
      content: " *";
    }
  `)}
`;

const DivInvalid = styled.div`
  width: 100%;
  height: 19px;
  margin-bottom: 4px;
  font-size: 0.9rem;
  color: #dc3545;
`;

const ExclamationIcon = styled.span`
  font-family: 'simple-line-icons', sans-serif;
  font-size: inherit;
  margin: 0 0 0 5px;
  color: var(--color-primary);
  font-weight: bold;
  cursor: pointer;
`;

const SelectDropDown = (props) => {
  const {
    async,
    id,
    label,
    cacheOptions,
    placeholder,
    options,
    defaultValue,
    noOptionsMessage,
    loadingMessage,
    getOptionLabel,
    getOptionValue,
    onChange,
    loadOptions,
    isClearable,
    isInvalid,
    onBlur,
    onFocus,
    touched,
    isDisabled,
    isMulti,
    defaultOptions,
    isLoading,
    inputId,
    value,
    menuPlacement,
    isMenuStatic,
    toolTip,
    isRequired,
  } = props;

  let classError = '';
  let invalidMessage = '';
  if (isInvalid && touched) {
    classError = 'react-select-container-error';
    invalidMessage = isInvalid;
  }

  return (
    <>
      <Label htmlFor={id}>
        <Text isRequired={isRequired}>{label}</Text>
        {toolTip && (<ExclamationIcon data-tip={toolTip} className="simple-icon-question" />)}
        {async ? (
          <AsyncSelect
            aria-labelledby={id}
            cacheOptions={cacheOptions}
            placeholder={placeholder}
            options={options}
            loadOptions={loadOptions}
            defaultValue={defaultValue}
            noOptionsMessage={() => noOptionsMessage}
            loadingMessage={() => loadingMessage}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isClearable={isClearable}
            onChange={onChange}
            classNamePrefix="react-select"
            className={`${classError} ${(isMenuStatic) && 'react-select-menu--static'}`}
            onBlur={onBlur}
            onFocus={onFocus}
            isDisabled={isDisabled}
            isMulti={isMulti}
            defaultOptions={defaultOptions}
            isLoading={isLoading}
            inputId={inputId}
            value={value}
            menuPlacement={menuPlacement}
            aria-required={isRequired}
          />
        ) : (
          <Select
            aria-labelledby={id}
            cacheOptions={cacheOptions}
            placeholder={placeholder}
            options={options}
            defaultValue={defaultValue}
            noOptionsMessage={() => noOptionsMessage}
            loadingMessage={() => loadingMessage}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isClearable={isClearable}
            onChange={onChange}
            classNamePrefix="react-select"
            className={`${classError} ${(isMenuStatic) && 'react-select-menu--static'}`}
            onBlur={onBlur}
            onFocus={onFocus}
            isDisabled={isDisabled}
            isMulti={isMulti}
            isLoading={isLoading}
            inputId={inputId}
            value={value}
            menuPlacement={menuPlacement}
            aria-required={isRequired}
          />
        )}
      </Label>
      <DivInvalid>{invalidMessage}</DivInvalid>
    </>
  );
};


SelectDropDown.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  async: bool,
  cacheOptions: bool,
  placeholder: string,
  options: arrayOf(object),
  isClearable: bool,
  defaultValue: oneOfType([arrayOf(object), shape({})]),
  noOptionsMessage: string,
  loadingMessage: string,
  getOptionLabel: func,
  getOptionValue: func,
  onChange: func.isRequired,
  loadOptions: func,
  isInvalid: string,
  onBlur: func,
  onFocus: func,
  touched: oneOfType([shape({}), bool]),
  isDisabled: bool,
  isMulti: bool,
  defaultOptions: bool,
  isLoading: bool,
  inputId: string,
  // eslint-disable-next-line react/require-default-props
  value: any,
  menuPlacement: oneOf(['auto', 'bottom', 'top']),
  isMenuStatic: bool,
  toolTip: string,
  isRequired: bool,
};

SelectDropDown.defaultProps = {
  inputId: '',
  async: false,
  cacheOptions: false,
  placeholder: null,
  defaultValue: {},
  options: null,
  noOptionsMessage: null,
  loadingMessage: null,
  getOptionLabel: null,
  getOptionValue: null,
  loadOptions: null,
  isClearable: false,
  isInvalid: null,
  onBlur: null,
  onFocus: null,
  touched: false,
  isDisabled: false,
  isMulti: false,
  defaultOptions: false,
  isLoading: false,
  menuPlacement: 'auto',
  isMenuStatic: false,
  toolTip: null,
  isRequired: false,
};

export default SelectDropDown;
