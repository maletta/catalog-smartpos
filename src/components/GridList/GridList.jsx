import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Row from 'components/Row';
import GridItem from 'components/GridItem';
import notFound from 'assets/no_result_found.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  padding-top: 30px;
`;

const GridList = (props) => {
  const { itens, openModal, enableOrder } = props;
  const items = itens.map(item => (
    <GridItem key={item.id} item={item} openModal={openModal} enableOrder={enableOrder} />
  ));
  return (
    <>
      {itens.length > 0 ? (
        <Row
          className="d-flex"
        >
          {items}
        </Row>
      ) : (
        <>
          <Container className="container is-fluid">
            <img src={notFound} alt="nenhum resultado" />
          </Container>
          <Container className="container is-fluid">
            <Text>
              <p> Nenhum resultado encontrado.</p>
            </Text>
          </Container>
        </>
      )}
    </>
  );
};

GridList.propTypes = {
  itens: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
  enableOrder: PropTypes.number.isRequired,
};

GridList.defaultProps = {
};

export default GridList;
