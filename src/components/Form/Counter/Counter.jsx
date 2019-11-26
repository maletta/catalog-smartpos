import React, { useState } from 'react';
import styled from 'styled-components';
import {
  func, number,
} from 'prop-types';

const Area = styled.div`
  width: 100px;
`;

const Button = styled.span`
  display: block;
  color: var(--color-primary);
  cursor: pointer;
  padding: 10px 15px 10px 15px;
`;

const ValueNumber = styled.span`
  display: block;
  font-size: 1rem;
  line-height: 1.25em;
  font-weight: 600;
  color: #3f3e3e;
  min-width: 21px;
  margin-top: 6px;
  text-align: center;
`;

const Label = styled.label`
  color: #3f3e3e;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0;
  margin: 0;
`;

const AreaCounter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: #707070 1px solid;
  border-radius: 3px;
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
    <Area>
      <Label>Quantidade</Label>
      <AreaCounter>
        <Button
          className="fa fa-minus"
          onClick={remove}
        />
        <ValueNumber>{value}</ValueNumber>
        <Button
          className="fa fa-plus"
          onClick={add}
        />
      </AreaCounter>
    </Area>
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
