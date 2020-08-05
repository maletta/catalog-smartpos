import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Message = styled.p`
  color: #212121;
  font-weight: bold;
`;

const ThanksMessage = (props) => {
  const { email } = props;

  return (
    <Message>
      {`Obrigada pela compra! Você receberá todos os dados da sua conta no email: ${email}`}
    </Message>
  );
};

ThanksMessage.propTypes = {
  email: PropTypes.string.isRequired,
};

export default ThanksMessage;
