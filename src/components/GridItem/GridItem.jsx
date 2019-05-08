import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const Item = styled.div`
  display: flex !important;
  text-align: center;
  justify-content: center;
`;

const Image = styled.img`
  padding: 10px;

  @media (max-width: 769px) {
    width: 145px;
    height: 145px;
  }
`;

const Price = styled.p`
  color: #f38a00;
`;

const Product = styled.div`
  color: ${props => props.theme.primary};
  font-weight: bold;
`;

const GridItem = (props) => {
  const { item, intl } = props;
  return (
    <Item className="column is-6-mobile is-3-tablet is-2-desktop">
      <div>
        <Image src={`${process.env.REACT_APP_IMG_API}product/${item.id}`} />
        <Product>
          <p>{item.descricao}</p>
          <Price>{intl.formatNumber(item.valorVenda, { style: 'currency', currency: 'BRL' })}</Price>
        </Product>
      </div>
    </Item>
  );
};

GridItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    valorVenda: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
  intl: intlShape.isRequired,
};

GridItem.defaultProps = {
};


export default injectIntl(GridItem);
