import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const styles = {
  primary: {
    bgColor: 'var(--button-primary-background)',
    border: '1px solid var(--button-primary-background)',
    color: 'var(--color-white)',
    colorLoading: 'rgba(0, 0, 0, 0.1)',
  },
  secondary: {
    bgColor: 'var(--color-white)',
    border: '1px solid var(--button-primary-background)',
    color: 'var(--button-primary-background)',
    colorLoading: 'var(--button-primary-background)',
  },
  tertiary: {
    bgColor: 'transparent',
    border: '0',
    color: 'var(--button-primary-background)',
    colorLoading: 'var(--button-primary-background)',
  },
  danger: {
    bgColor: 'transparent',
    border: '1px solid #F60A20',
    color: '#F60A20',
    colorLoading: 'rgba(246, 10, 32, 0.8)',
  },
};

const Btn = styled.button`
  background-color: ${props => styles[props.styleType].bgColor};
  border: ${props => styles[props.styleType].border};
  color: ${props => styles[props.styleType].color};
  font-weight: 600;
  letter-spacing: 0.05rem;
  border-radius: 2px;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  outline: initial;
  padding: 0.5rem 15px 0.5rem;
  position: relative;
  text-align: center;

  &&& {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-appearance: none; /* sobrescreve regra do bootstrap */
  }

  :hover {
    outline: initial;
    color: ${props => styles[props.styleType].color};
    text-decoration: none;
  }

  :focus {
    outline: initial;
  }

  @media (max-width: 576px) {
    font-size: 0.9rem;
    padding: 0.5rem 10px 0.5rem;
  }

  ${props => (props.isLoading ? `
    color: transparent !important;
    cursor: default;
  ` : '')}
  ${props => (props.size === 'lg' ? `
    letter-spacing: .05rem;
    line-height: 1.5;
    padding: .75rem 2.6rem .6rem;
  ` : '')}

  ${props => (props.size === 'sm' ? `
    font-size: .8rem;
    line-height: 1.5;
    padding: .04rem 1rem;
  ` : '')}

  ${props => (props.size === 'xs' ? `
    font-size: .76rem;
    line-height: 1.3;
    padding: .25rem .75rem;
  ` : '')}

  ${props => (props.isLoading ? `
  :after {
    color: transparent!important;
    pointer-events: none;
    display: block;
    content: '';
    border-color: ${styles[props.styleType].colorLoading};
    border-style: solid;
    border-width: 3px;
    position: absolute;
    left: calc(50% - (1em / 2));
    top: calc(45% - (1em / 2));
    border-left-color: var(--color-white);
    border-radius: 50%;
    width: 23px;
    height: 23px;

    ${props.size === 'sm' ? `
      width: 15px;
      height: 15px;
    ` : ''}

    animation: donut-spin .7s linear infinite;
    @keyframes donut-spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }` : '')}

  ${props => (props.disabled ? `
    background-color: ${styles[props.styleType].bgColor};
    border: ${styles[props.styleType].border};
    color: ${styles[props.styleType].color};
    opacity: 0.7;
    font-weight: 400;
    cursor: default;
  ` : '')}
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 0.875rem;
`;

const Value = styled.div`
  margin-right: 10px;
`;

const ButtonPrice = ({
  component: Component,
  value,
  size,
  isLoading,
  onClick,
  price,
  ...props
}) => (
  <Btn
    as={Component}
    size={size}
    isLoading={isLoading}
    onClick={() => {
      if (!isLoading) {
        onClick();
      }
    }}
    {...props}
  >
    <ValueContainer>
      <Value>
        {value}
      </Value>
      <div>
        {price}
      </div>
    </ValueContainer>
  </Btn>
);

ButtonPrice.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  value: PropTypes.node.isRequired,
  price: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'sm', 'xs', '']),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  styleType: PropTypes.string,
  disabled: PropTypes.bool,
};

ButtonPrice.defaultProps = {
  component: 'button',
  type: 'button',
  size: '',
  isLoading: false,
  onClick: () => { },
  styleType: 'primary',
  disabled: false,
};

export default ButtonPrice;
