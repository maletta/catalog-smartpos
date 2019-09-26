import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import checkMark from 'assets/check-mark.svg';

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: var(--font-size-normal);
  ${props => !props.isPrintable && (`
    @media print {
      display: none;
    }
  `)}
`;

const Icon = styled.i`
  font-family: simple-line-icons, sans-serif;
  font-style: normal;
  margin-right: 8px;
`;

const Title = styled.div`
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Value = styled.div`
  position: relative;
  width: 50%;
  text-align: right;
  ${props => props.color === 'success' && `
    color: var(--color-success);
  `}
  ${props => props.color === 'danger' && `
    color: var(--color-danger);
  `}
`;

const Checkbox = styled.div`
  display: block;
  border-radius: 4px;
  top: 0;
  width: 16px;
  height: 16px;
  position: absolute;
  right: 0;
  ${props => (props.checked ? `
    background: var(--color-primary) url(${checkMark}) no-repeat center center;
    border: 1px solid var(--color-primary);   
    background-size: 60% 60%;  
  ` : `
    background: transparent;   
    border: 1px solid #909090;
  `)}
`;

const ItemMultiSelect = styled.label`
  border-radius: 2px;
  background-color: hsl(0, 0%, 90%);
  width: auto;
  margin-left: 5px;
  padding: 3px;
  white-space: nowrap;
`;

const DataSlideNav = ({
  title,
  value,
  icon,
  type,
  fallback,
  valueColor,
  isPrintable,
}) => {
  const typeSwitch = () => {
    switch (type) {
      case 'checkbox':
        return (<Checkbox checked={value} />);
      case 'text':
        return (value || fallback);
      case 'multiSelect':
        return (value.length ? (value.map(item => (
          <ItemMultiSelect key={item}>
            {item}
          </ItemMultiSelect>
        ))) : fallback);
      default:
        return (value || fallback);
    }
  };

  return (
    <Block isPrintable={isPrintable}>
      <Title>
        {icon && <Icon className={icon} />}
        <span>{title}</span>
      </Title>
      <Value color={valueColor}>{typeSwitch()}</Value>
    </Block>
  );
};

DataSlideNav.propTypes = {
  title: PropTypes.node,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  icon: PropTypes.string,
  fallback: PropTypes.string,
  type: PropTypes.oneOf(['checkbox', 'text', 'multiSelect']),
  valueColor: PropTypes.oneOf(['success', 'danger']),
  isPrintable: PropTypes.bool,
};

DataSlideNav.defaultProps = {
  type: 'text',
  fallback: '',
  isPrintable: true,
};

export default DataSlideNav;
