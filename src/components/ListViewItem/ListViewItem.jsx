import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const Item = styled.div`
  display: flex !important;
`;

const Image = styled.img`
  padding: 10px;
  width: 200px;
  height: 200px;

  @media (max-width: 769px) {
    width: 120px;
    height: 120px;
    min-width: 120px;
    min-height: 120px;
    max-width: 120px;
    max-height: 120px;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 10px;
  display: flex;
  align-items: center;
`;


const Category = styled.p`
  color: ${props => props.theme.secondary};
  font-size: 13px;
`;

const Price = styled.p`
  color: #f38a00;
`;

const Description = styled.p`
  color: ${props => props.theme.secondary};
  font-size: 13px;
`;

const Product = styled.div`
  color: ${props => props.theme.primary};
  font-weight: bold;
`;

class ListViewItem extends Component {
  render() {
    const { item, intl } = this.props;
    return (
      <Item className="column is-full">
        <div>
          <Image src={item.img} />
        </div>
        <Content>
          <Product>
            <p>{item.name}</p>
            <Category>{item.category.name}</Category>
            <Price>{intl.formatNumber(item.price, { style: 'currency', currency: 'BRL' })}</Price>
            <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam imperdiet sed quam ut ultricies. Fusce maximus a massa placerat condimentum.</Description>
          </Product>
        </Content>
      </Item>
    );
  }
}

ListViewItem.propTypes = {
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

ListViewItem.defaultProps = {
};


export default injectIntl(ListViewItem);
