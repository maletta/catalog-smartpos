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
  cursor: ${props => (props.clicable === 'true' ? 'pointer' : 'auto')};

  @media (max-width: 768px) {
    padding: 0.35rem !important;
  }
`;

const Container = styled.div`
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
  width: 100%;
  background-color: #ffff;
  border-radius: 5px;
`;

const Img = styled.img`
  height: 223px;
  border-radius: 5px 5px 0 0;

  @media (max-width: 375px) {
    height: 170px;
  }
`;

const Cardcontent = styled.div`
  background-color: transparent;
  padding: 1.2rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const Descricao = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: 1rem;
`;

const PriceFrom = styled.p`
  font-size: 0.9rem;
  text-align: left;
  margin-bottom: -8px;
  color: #333;
`;
const Price = styled.p` 
  color: #333;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: left;
`;

const Unavailable = styled.p`
  color: #333;
  padding-bottom: -10px;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: left;
`;

const SpinnerCointainer = styled.div`
  padding-top: 50px;
  width: 100%;
  height: 223px;

  @media (max-width: 768px) {
    padding-top: 80px;
    width: 100%;
    height: 223px;
  }

  @media (max-width: 375px) {
    padding-top: 30px;
    width: 100%;
    height: 170px;
  }
`;


const GridItem = (props) => {
  const { item, intl, openModal } = props;
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
      <Item
        className="column is-6-mobile is-4-tablet is-4-desktop"
        onClick={() => {
          if (process.env.REACT_APP_SELL_ONLINE === 'true') {
            openModal(item);
          }
        }}
        clicable={process.env.REACT_APP_SELL_ONLINE}
      >
        <Container className="card-image">
          <div className="card-image">
            <figure className="is-160x160">
              {load ? (<SpinnerCointainer><Spinner /></SpinnerCointainer>) : (<Img src={image} alt="product" />)}
            </figure>
          </div>
          <Cardcontent>
            <div>
              {(item.hasVariant === 1) && (<PriceFrom>a partir de </PriceFrom>)}
              <Price>
                {intl.formatNumber(item.valorVenda, { style: 'currency', currency: 'BRL' })}
              </Price>
            </div>
            <Descricao>
              <span>{item.descricao}</span>
            </Descricao>
            {(item.not_control_stock === 0 && item.stock <= 0)
              && (<Unavailable>Produto indisponível</Unavailable>)}
          </Cardcontent>
        </Container>
      </Item>
    </>

  );
};

GridItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    valorVenda: PropTypes.number.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};


export default injectIntl(GridItem);
