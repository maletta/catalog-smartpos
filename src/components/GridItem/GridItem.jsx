import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Grid from 'components/Grid';
import moment from 'moment';

import NoImage from '../../assets/no-image.png';

const Container = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
  background-color: #ffff;
  border-radius: 5px;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 5px 5px 0 0;
`;

const Cardcontent = styled.div`
  background-color: transparent;
  padding: 0.4rem 1rem 1rem 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const Descricao = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: 1.2rem;
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
  margin-bottom: 0;
`;

const Unavailable = styled.p`
  color: #333;
  font-size: 0.8rem;
  text-align: left;
  margin: 0;
`;

const GridItem = (props) => {
  const {
    item,
    intl,
    openModal,
    enableOrder,
  } = props;
  const [image, setImage] = useState(NoImage);
  const dataAtual = moment().format('DD-MM-YYYY h:mm:ss');
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}product/${item.id}?lastUpdate=${data_atual}`;

  let img;
  if (item.viewMode === 'IMAGE') {
    img = new Image();
    img.src = imageBaseUrl;

    img.onload = () => {
      setImage(imageBaseUrl);
    };
  }

  return (
    <>
      <Grid
        cols="6 4 4 4 4"
        className="mb-3"
      >
        <Container
          onClick={() => {
            if (enableOrder) {
              openModal(item);
            }
          }}
          className={`${(enableOrder === 1) && 'cursor-pointer'}`}
        >
          <div className="card-image">
            {(item.viewMode === 'IMAGE') ? (
              <Img src={image} alt="product" />
            ) : (
              <Img src={image} alt="product" />
            )}
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
      </Grid>
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
  enableOrder: PropTypes.number.isRequired,
};


export default injectIntl(GridItem);
