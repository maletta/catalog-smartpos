import React, { useState } from 'react';
import Counter from 'components/Form/Counter';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import NoImage from '../../assets/no-image.png';

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 15px 0;
  height: 100%;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    padding: 15px;
    border-bottom: 3px solid #eee;
  }
`;

const TitleItem = styled.h2`
  font-weight: 400;
  color: #363636;
  margin: 0;

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const ItemDescription = styled.span`
  color: #333;
  font-size: 0.9rem;

  @media (max-width: 992px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 0.4rem;
  }
`;

const AreaControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
  }
`;

const ControlAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110px;
`;

const ControlExclude = styled.button`
  color: #00529b;
  background: #fff;
  border: 0;
  padding: 0;
  margin: 0;
`;

const ItemPricing = styled.div`
  color: #333;
  font-size: 1.9rem;
  width: 170px;

  @media (max-width: 992px) {
    font-size: 1.5rem;
    width: 145px;
  }
`;

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

const CartItem = (props) => {
  const {
    product,
    intl,
    deleteItem,
    updateAmount,
    prodIndex,
  } = props;
  const [imageProduct, setImage] = useState(NoImage);
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}product/${product.id}`;

  let img;
  if (product.viewMode === 'IMAGE') {
    img = new Image();
    img.src = imageBaseUrl;
    img.onload = () => {
      setImage(imageBaseUrl);
    };
  }

  return (
    <ListItem>
      <>
        <div
          className="d-flex justify-content-start"
        >
          <div
            className="mr-3"
          >
            <Img src={imageProduct} alt="product" />
          </div>
          <div>
            <TitleItem>{`${product.descricao} ${(product.variant.name) ? `- ${product.variant.name}` : ''}`}</TitleItem>
            <ItemDescription>
              {product.modifiers.map((modifier, modIndex) => (
                modifier.map((item, index) => ((modIndex || index) ? ` | ${item.name} ` : item.name))
              ))}
            </ItemDescription>
          </div>
        </div>
        <AreaControl>
          <ControlAmount>
            <Counter
              limit={100}
              min={1}
              value={product.amount}
              counter={(amount) => {
                updateAmount(amount, prodIndex);
              }}
            />
            <div style={{ marginTop: '-10px' }}>
              <ControlExclude
                onClick={() => deleteItem(product)}
              >
                { 'Excluir' }
              </ControlExclude>
            </div>
          </ControlAmount>
          <div className="d-flex">
            <ItemPricing>
              {intl.formatNumber((product.pricing.product + product.pricing.modifiers) * product.amount, { style: 'currency', currency: 'BRL' })}
            </ItemPricing>
          </div>
        </AreaControl>
      </>
    </ListItem>
  );
};

CartItem.propTypes = {
  intl: intlShape.isRequired,
  product: PropTypes.shape({}).isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
  prodIndex: PropTypes.number.isRequired,
};

export default injectIntl(CartItem);
