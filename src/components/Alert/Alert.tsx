import React from 'react';
import styled from 'styled-components';

const style = {
  primary: {
    color: '#004085',
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff',
  },
  danger: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  warning: {
    color: '#856404',
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
  },
};

type Div = {
  typeAlert: 'primary' | 'danger' | 'warning'
}

const DivAlert = styled.div<Div>`
  position: relative;
  padding: 12px 15px;
  margin-bottom: 1rem;
  border: 1px solid;
  border-radius: 0;
  color: ${props => style[props.typeAlert].color};
  background-color: ${props => style[props.typeAlert].backgroundColor};
  border-color: ${props => style[props.typeAlert].borderColor};
`;

type Props = {
  text: string
}

const Alert = (props: Props & Div) => {
  const { text, typeAlert } = props;
  return (
    <DivAlert typeAlert={typeAlert} className="fade show">
      <span className="font-weight-bold">{text}</span>
    </DivAlert>
  );
};

Alert.defaultProps = {
  typeAlert: 'primary',
};

export default Alert;
