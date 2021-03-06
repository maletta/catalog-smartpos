import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// import NoImage from 'assets/no-image.png';

const Img = styled.img`
  height: 80px;
  min-width: 80px;
  border-radius: 3px;

  @media (max-width: 992px) {
    height: 65px;
    min-width: 65px;
  }

  @media (max-width: 768px) {
    height: 55px;
    min-width: 55px;
  }
`;

const ItemImage = ({ product }) => {
  const NoImage = 'assets/no-image.png';
  const [imageProduct, setImage] = useState(NoImage);
  const imageBaseUrl = `${process.env.NEXT_PUBLIC_IMG_API}product/${product.id}?lastUpdate=${product.atualizacao}`;

  const img = new Image();
  img.src = imageBaseUrl;

  img.onload = () => {
    setImage(imageBaseUrl);
  };

  return (
    <>
      <div className="mr-3">
        <Img src={imageProduct} alt="product" />
      </div>
    </>
  );
};

ItemImage.propTypes = {
  product: PropTypes.any.isRequired,
};

export default ItemImage;
