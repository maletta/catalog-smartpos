import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const Item = styled.div`
  text-align: center;
  display: flex !important;
  flex-direction: column-reverse !important;
`;

const Image = styled.img`
  padding: 10px;

  @media (max-width: 769px) {
    width: 145px;
    height: 145px;
  }
`;

const Category = styled.p`
  color: ${props => props.theme.secondary};
`;

const Price = styled.p`
  color: #f38a00;
`;

const Product = styled.div`
  color: ${props => props.theme.primary};
  font-weight: bold;
`;

class GridItem extends Component {
  render() {
    const { item, intl } = this.props;
    return (
      <Item className="column is-6-mobile is-3-tablet is-2-desktop">
        <div>
          <Image src={item.img} />
          <Category>{item.category.name}</Category>
          <Product>
            <p>{item.name}</p>
            <Price>{intl.formatNumber(item.price, { style: 'currency', currency: 'BRL' })}</Price>
          </Product>
        </div>
      </Item>
    );
  }
}

GridItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string,
  }).isRequired,
  intl: intlShape.isRequired,
};

GridItem.defaultProps = {
};


export default injectIntl(GridItem);
