import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const Item = styled.div`
  text-align: center;
`;

const Image = styled.img`
  border: 0;

  @media (max-width: 769px) {
    width: 145px;
    height: 145px;
  }
`;

const Category = styled.p`
  color: ${props => props.theme.secondary};
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
        <Image src={item.img} />
        <Category>{item.category.name}</Category>
        <Product>
          <p>{item.name}</p>
          <p>{intl.formatNumber(item.price, { style: 'currency', currency: 'BRL' })}</p>
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
  intl: intlShape.isRequired,
};

GridItem.defaultProps = {
};


export default injectIntl(GridItem);
