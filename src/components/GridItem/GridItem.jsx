import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner';
import { injectIntl, intlShape } from 'react-intl';
import NoImage from '../../assets/no-image.png';

const Item = styled.div`
  display: flex !important;
  text-align: center;
  justify-content: center;
`;

const Container = styled.div`
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
  width: 100%;
  background-color: #ffff;
  border-radius: 5px;
`;

const Img = styled.img`
  border-radius: 5px 5px 0 0;
`;

const Descricao = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: 1rem;
`;

const Price = styled.p`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: #333;
  font-weight: bold;
  font-size: 1.3rem;
`;


const GridItem = (props) => {
  const { item, intl } = props;
  const [load, setload] = useState(true);
  const [image, setImage] = useState(NoImage);
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}product/${item.id}`;

  const img = new Image();
  img.src = imageBaseUrl;
  img.onerror = () => {
    img.src = NoImage;
    img.onload = () => {
      setload(false);
    };
  };

  img.onload = () => {
    setload(false);
    setImage(imageBaseUrl);
  };

  return (
    <>
      <Item className="column is-6-mobile is-4-tablet is-4-desktop">
        <Container className="card-image">
          <div className="card-image">
            <figure className="image is-160x160">
              {load ? (<Spinner />) : (<Img src={image} alt="product" />)}
            </figure>
          </div>
          <div className="card-content">
            <div>
              <Price>
                {intl.formatNumber(item.valorVenda, { style: 'currency', currency: 'BRL' })}
              </Price>
            </div>
            <Descricao className="content">
              <span>{item.descricao}</span>
            </Descricao>
          </div>
        </Container>
      </Item>
    </>

  );
};

GridItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    valorVenda: PropTypes.number.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};


export default injectIntl(GridItem);
