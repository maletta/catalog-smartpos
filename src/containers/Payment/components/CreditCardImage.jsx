import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CreditCardImg = styled.img`
  border: 1px solid #818181;
  border-radius: 5px;
`;

const CreditCardImage = (props) => {
  const { name, imagePath } = props;

  return (
    <CreditCardImg
      src={`https://stc.pagseguro.uol.com.br/${imagePath}`}
      title={name}
      alt={name}
    />
  );
};

CreditCardImage.propTypes = {
  name: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
};

export default CreditCardImage;
