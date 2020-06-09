import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FilterContext from 'contexts/FilterContext';
import Row from 'components/Row';
import GridItem from 'components/GridItem';
import ImgnotFound from 'assets/no_result_found.png';

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
  const {
    itens,
    enableOrder,
    notFound,
  } = props;
  const items = itens.map(item => (
    <GridItem key={item.id} item={item} enableOrder={enableOrder} />
  ));
  return (
    <>
      {(notFound) ? (
        <>
          <Container className="container is-fluid">
            <img src={ImgnotFound} alt="nenhum resultado" />
          </Container>
          <Container className="container is-fluid">
            <Text>
              <p> Nenhum resultado encontrado.</p>
            </Text>
          </Container>
        </>
      ) : (
        <>
          <h2>
            {filter.categoryName !== 'Todas as categorias' && filter.categoryName }
          </h2>
          <hr />
          <Row
            className="d-flex"
          >
            {items}
          </Row>
        </>
      ) }
    </>
  );
};

GridList.propTypes = {
  notFound: PropTypes.bool.isRequired,
  itens: PropTypes.arrayOf(PropTypes.object).isRequired,
  enableOrder: PropTypes.number.isRequired,
};

GridList.defaultProps = {
};

export default GridList;
