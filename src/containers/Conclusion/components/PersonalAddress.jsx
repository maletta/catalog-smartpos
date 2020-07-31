import React from 'react';
import PropTypes from 'prop-types';

const PersonalAddress = ({ address }) => {
  const {
    endereco,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    complemento,
  } = address;

  return (
    <div>
      <h4>Endereço:</h4>
      <span>
        {`${endereco}, ${numero} - ${bairro}`}
      </span>
      <br />
      <span>
        {`${cidade} / ${estado}`}
      </span>
      <br />
      <span>
        {`CEP: ${cep}`}
      </span>
      <br />
      <span>
        {`Complemento: ${complemento}`}
      </span>
      <br />
    </div>
  );
};

PersonalAddress.propTypes = {
  address: PropTypes.any.isRequired,
};

export default PersonalAddress;
