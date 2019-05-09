import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const Item = styled.div`
  display: flex !important;
  text-align: center;
  justify-content: center;
`;

const Container = styled.div`
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
  width: 100%;
  max-height: 380px;
  background-color: #ffff;
  cursor: pointer;

  :hover {
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
    font-weight: bold;
  }
`;

const ContainerImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 10px;
`;

const Img = styled.img`
  display: block;
  max-width: 160px;
  max-height: 160px;
  width: auto;
  height: auto;
  padding: 10px;
`;

const Descricao = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 20px;
`;

const Preco = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 10px;
  font-weight: bold;
`;

const Price = styled.p`
  color: #f38a00;
  font-size: 16px;
`;


const GridItem = (props) => {
  const { item, intl } = props;
  const [error, setError] = useState(false);

  return (
    <Item className="column is-6-mobile is-4-tablet is-4-desktop">
      <Container>
        <ContainerImage>
          { error ? (<Img src="https://www.magazinerural.com.br/media/padroes/produto-sem-imagem.png" />)
            : (<Img src={`${process.env.REACT_APP_IMG_API}product/${item.id}`} onError={() => setError(true)} />) }
        </ContainerImage>
        <Preco>
          <Price>{intl.formatNumber(item.valorVenda, { style: 'currency', currency: 'BRL' })}</Price>
        </Preco>
        <Descricao>
          <p>{item.descricao}</p>
        </Descricao>
      </Container>
    </Item>
  );
};

GridItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    valorVenda: PropTypes.number.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};

GridItem.defaultProps = {
};


export default injectIntl(GridItem);
