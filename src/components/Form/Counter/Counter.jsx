import React, { useState } from 'react';
import styled from 'styled-components';
import {
  func, number,
} from 'prop-types';

const Button = styled.span`
  color: var(--color-primary);
  cursor: pointer;
  padding: 15px;
`;

const ValueNumber = styled.span`
  font-size: 1rem;
  line-height: 1.25em;
  font-weight: 600;
  color: #3f3e3e;
`;

const Counter = (props) => {
  const [value, setValue] = useState(props.value);

  const add = () => {
    if (value <= props.limit) {
      setValue((prevState) => {
        props.counter(prevState + 1);
        return (prevState + 1);
      });
    }
  };

  const remove = () => {
    if (value > props.min) {
      setValue((prevState) => {
        props.counter(prevState - 1);
        return (prevState - 1);
      });
    }
  };

  return (
    <div className="is-pulled-right">
      <Button
        className="fa fa-minus"
        onClick={remove}
      />
      <ValueNumber>{value}</ValueNumber>
      <Button
        className="fa fa-plus"
        onClick={add}
      />
    </div>
  );
};

Counter.propTypes = {
  min: number,
  limit: number,
  counter: func.isRequired,
  value: number.isRequired,
};

Counter.defaultProps = {
  min: 0,
  limit: 1000,
};

export default Counter;
