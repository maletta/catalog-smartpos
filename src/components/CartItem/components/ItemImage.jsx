import React, { useState } from 'react';
import styled from 'styled-components';

import NoImage from 'assets/no-image.png';

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
  const [imageProduct, setImage] = useState(NoImage);
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}product/${product.id}?lastUpdate=${product.atualizacao}`;

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

export default ItemImage;
