import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';
import Row from 'components/Row';
import GridItem from 'components/GridItem';
import notFoundImagePath from 'assets/no_result_found.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  padding-top: 30px;
`;

const GridList = (props) => {
  const { filter } = useContext(FilterContext);
  const { shop } = useContext(ShopContext);
  const { itens, notFound } = props;

  const items = itens.map(item => (
    <GridItem key={item.id} item={item} enableOrder={shop.is_enableOrder} />
  ));

  const CategoryNameWithItems = () => {
    const categoryName = filter.categoryName !== 'Todas as categorias' && filter.categoryName;

    return (
      <>
        <h2>{categoryName}</h2>
        <hr />
        <Row className="d-flex">{items}</Row>
      </>
    );
  };

  const NotFoundItems = () => (
    <>
      <Container className="container is-fluid">
        <img src={notFoundImagePath} alt="nenhum resultado" />
      </Container>
      <Container className="container is-fluid">
        <Text>
          <p>Nenhum resultado encontrado.</p>
        </Text>
      </Container>
    </>
  );

  if (notFound) {
    return <NotFoundItems />;
  }

  return <CategoryNameWithItems />;
};

GridList.propTypes = {
  notFound: PropTypes.bool.isRequired,
  itens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GridList;
