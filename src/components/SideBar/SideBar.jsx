import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Spinner from 'components/Spinner';
import { List, LinkItem } from 'components/List';
import OrderOption from 'components/OrderOption';

const Aside = styled.aside`
  margin-top: 0.75rem;
`;

const SideBar = (props) => {
  const {
    loading,
    order,
    onChangeOrder,
    categories,
  } = props;

  const items = categories.map(item => (
    <LinkItem
      key={item.id}
      text={item.descricao}
      onClick={() => ''}
    />
  ));

  return (
    <Aside>
      <List title="Categorias">
        <LinkItem
          text="Tudo"
          onClick={() => ''}
        />
        {loading ? <Spinner /> : items}
      </List>
      <OrderOption
        order={order}
        onChangeOrder={onChangeOrder}
      />
    </Aside>
  );
};

SideBar.propTypes = {
  order: PropTypes.string.isRequired,
  onChangeOrder: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
};


export default SideBar;
