import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Item = styled.div`
  text-align: center;
`;

const Image = styled.img`
  border: 0;
  @media (max-width: 767px) {
    width: 145px;
    height: 145px;
  }  
`;

const Category = styled.p`
  color:${props => props.theme.secondary}
`;
const Product = styled.div`
  color:${props => props.theme.primary}
  font-weight: bold;
`;

const Description = styled.p`
`;
const Price = styled.p`
`;

class GridItem extends Component {
  getPrice = (price) => {
    const options = { style: 'currency', currency: 'BRL' };
    const numberFormat = new Intl.NumberFormat('pt-BR', options);
    return numberFormat.format(price);
  }

  render() {
    const { item } = this.props;
    return (
      <Item className="column is-6-mobile is-3-tablet is-2-desktop">
        <Image src={item.img} />
        <Category>{item.category.name}</Category>
        <Product>
          <Description>{item.name}</Description>
          <Price>{this.getPrice(item.price)}</Price>
        </Product>
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
};

GridItem.defaultProps = {
};


export default GridItem;
