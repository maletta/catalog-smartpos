import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NoImage from '../../assets/no-image.png';


const Img = styled.img`
  height: 100px;
  min-width: 100px;
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


const ImageBox = (props) => {
  const { product } = props;
  const { id, atualizacao } = product;

  const [imageProduct, setImage] = useState(NoImage);
  const [imageBaseUrl] = useState(`${process.env.REACT_APP_IMG_API}product/${id}?lastUpdate=${atualizacao}`);

  useEffect(() => {
    if (product) {
      const img = new Image();
      img.src = imageBaseUrl;

      img.onload = () => {
        setImage(imageBaseUrl);
      };
    }
  }, [false]);
  return (
    <Img src={imageProduct} alt="product" />
  );
};

ImageBox.propTypes = {
  product: PropTypes.object,
};

ImageBox.defaultProps = {
  product: {},
};

export default ImageBox;
