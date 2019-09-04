import React from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';
import notFound from 'assets/no_result_found.png';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  padding-top: 30px;
`;

const GridList = (props) => {
  const { itens, openModal } = props;
  const items = itens.map(item => <GridItem key={item.id} item={item} openModal={openModal} />);
  return (
    <>
      {items.length > 0 ? (
        <div className="column is-fluid is-paddingless">
          <div className="columns is-mobile is-multiline">
            {items}
          </div>
        </div>
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
};

GridList.defaultProps = {
};

export default GridList;
