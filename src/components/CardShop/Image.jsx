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
  const { product, shoppingCart, url } = props;
  const { id } = product;
  const [imageProduct, setImage] = useState(NoImage);
  useEffect(() => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      setImage(url);
    };
    img.onError = () => {
      setImage(NoImage);
    };
  }, [shoppingCart, id]);
  return (
    <Img src={imageProduct} alt="product" />
  );
};

ImageBox.propTypes = {
  product: PropTypes.object,
  shoppingCart: PropTypes.object,
  url: PropTypes.string,
};

ImageBox.defaultProps = {
  product: {},
  shoppingCart: {},
  url: '',
};

export default ImageBox;
