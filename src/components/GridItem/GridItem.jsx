import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import slug from 'utils/slug';
import history from 'utils/history';
import uuidv1 from 'uuid/v1';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import Grid from 'components/Grid';

import getModifiersOfProduct from 'api/modifiersRequests';
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
  color: gray;
  font-size: 0.8rem;
  text-align: left;
  margin: 0;
`;

const UnavailableBox = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  border: 1px solid gray;
  padding: 5px;
  margin-top: 20px;
  border-radius: 2px;
`;

const Buy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 8px;
  margin: 0;
  margin-top: 20px;
  border-radius: 2px;
  background-color: var(--color-primary);
  cursor: pointer;
`;

const BuyText = styled.p`
  color: white;
  font-size: 0.8rem;
  text-align: left;
  margin: 0;
  font-weight: 700;
`;

const GridItem = (props) => {
  const {
    item,
    intl,
  } = props;
  const [image, setImage] = useState(NoImage);
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}product/${item.id}?lastUpdate=${item.atualizacao}`;

  const { updateShoppingCart } = useContext(ShoppingCartContext);

  let img;
  if (item.viewMode === 'IMAGE') {
    img = new Image();
    img.src = imageBaseUrl;

    img.onload = () => {
      setImage(imageBaseUrl);
    };
  }


  const addCart = (product) => {
    getModifiersOfProduct(product.tenant_id, product.id).then((response) => {
      if (response.data.length === 0) {
        const itemProduct = {
          ...product,
          quantity: 1,
          uuid: uuidv1(),
          variant: {},
          pricing: { product: product.valorVenda, modifiers: 0 },
          image: [],
          modifiers: [[]],
          note: '',
        };

        const merged = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        const basketCount = merged.reduce((count, val) => (count + val.quantity), 0);
        merged.push(itemProduct);
        localStorage.setItem('cart', JSON.stringify(merged));
        updateShoppingCart({
          basketCount,
          cardOverlay: true,
        });
      } else {
        history.push(`item/${item.id}/${slug(item.descricao)}`);
      }
    });
  };
  return (
    <>
      <Grid
        cols="6 4 4 4 4"
        className="mb-3"
      >
        <Container
          className="product-item"
        >
          <LinkToItem to={`item/${item.id}/${slug(item.descricao)}`}>
            <div className="card-image">
              <Img src={image} title={item.descricao} alt="Produto" />
            </div>
          </LinkToItem>
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
              ? (
                <UnavailableBox>
                  <Unavailable>PRODUTO INDISPONÍVEL</Unavailable>
                </UnavailableBox>
              ) : (
                <LinkToItem to={item.hasVariant === 1 && `item/${item.id}/${slug(item.descricao)}`}>
                  <Buy onClick={() => item.hasVariant !== 1 && addCart(item)}>
                    <BuyText> COMPRAR</BuyText>
                  </Buy>
                </LinkToItem>
              )}
          </Cardcontent>
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
};


export default injectIntl(GridItem);
