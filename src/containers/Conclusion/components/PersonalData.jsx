import React from 'react';
import PropTypes from 'prop-types';

const PersonalData = (props) => {
  const {
    name, email, phone, cpf,
  } = props;

  return (
    <div>
      <h4>Dados Pessoais:</h4>
      <span>{name}</span>
      <br />
      <span>{`CPF: ${cpf}`}</span>
      <br />
      <span>{email}</span>
      <br />
      <span>{`Telefone: ${phone}`}</span>
    </div>
  );
};

PersonalData.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
};

export default PersonalData;
