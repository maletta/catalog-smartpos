import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import slug from 'utils/slug';

import Grid from 'components/Grid';
import NoImage from '../../assets/no-image.png';


const LinkToItem = styled(Link)`
  color: #212529;
  text-decoration: none;

  :hover {
    color: #212529;
    text-decoration: none;
  }
`;

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

  @media (max-width: 768px) {
    font-size: 1rem;
  }
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
    enableOrder,
  } = props;
  const [image, setImage] = useState(NoImage);
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}product/${item.id}?lastUpdate=${item.atualizacao}`;

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
          className={`${(enableOrder === 1) && 'cursor-pointer'}`}
        >
          <LinkToItem to={`item/${item.id}/${slug(item.descricao)}`}>
            <div className="card-image">
              <Img src={image} title={item.descricao} alt="Produto" />
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
          </LinkToItem>
        </Container>
      </Grid>
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
  enableOrder: PropTypes.number.isRequired,
};


export default injectIntl(GridItem);
