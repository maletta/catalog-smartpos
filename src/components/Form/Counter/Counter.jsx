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

const Counter = ({
  min, max, initialCount, setState,
}) => {
  const [count, setCount] = useState(initialCount);

  const decrement = () => {
    if (count > min) {
      const decremented = count - 1;
      setCount(decremented);
      setState(decremented);
    }
  };

  const increment = () => {
    if (count < max) {
      const incremented = count + 1;
      setCount(incremented);
      setState(incremented);
    }
  };

  return (
    <Area>
      <Label>Quantidade</Label>
      <AreaCounter>
        <Button
          className="fa fa-minus"
          onClick={decrement}
        />
        <ValueNumber>{count}</ValueNumber>
        <Button
          className="fa fa-plus"
          onClick={increment}
        />
      </AreaCounter>
    </Area>
  );
};

Counter.propTypes = {
  min: number,
  max: number,
  initialCount: number.isRequired,
  setState: func.isRequired,
};

Counter.defaultProps = {
  min: 1,
  max: 100,
};

export default Counter;
