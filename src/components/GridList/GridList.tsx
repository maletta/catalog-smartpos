import React, { useContext } from 'react';
import styled from 'styled-components';

import FilterContext from 'contexts/FilterContext';
import Row from 'components/Row';
import GridItem from 'components/GridItem';
import notFoundImagePath from 'assets/no_result_found.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  padding-top: 30px;
`;

type Item = {
  id: number
  descricao: string
  valorVenda: number
  atualizacao: string
  viewMode: string
  hasVariant: boolean
  not_control_stock: boolean
  stock: number
};

type Props = {
  notFound: boolean
  items: Item[]
};

const GridList = (props: Props) => {
  const { filter } = useContext(FilterContext);
  const { items, notFound } = props;

  const mappedItems = items.map(item => (
    <GridItem key={item.id} item={item} />
  ));

  const CategoryNameWithItems = () => {
    const categoryName = filter.categoryName !== 'Todas as categorias' && filter.categoryName;

    return (
      <>
        <h2>{categoryName}</h2>
        <hr />
        <Row className="d-flex">{mappedItems}</Row>
      </>
    );
  };

  const NotFoundItems = () => (
    <>
      <Container className="container is-fluid">
        <img src={notFoundImagePath} alt="nenhum resultado" />
      </Container>
      <Container className="container is-fluid">
        <Text>Nenhum resultado encontrado.</Text>
      </Container>
    </>
  );

  if (notFound) {
    return <NotFoundItems />;
  }

  return <CategoryNameWithItems />;
};

export default GridList;
