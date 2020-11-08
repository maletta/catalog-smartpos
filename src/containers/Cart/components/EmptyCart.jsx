import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Button from 'components/Form/Button';
import Grid from 'components/Grid';
// import history from 'utils/history';
import paths from 'paths';

const TitleEmptyCart = styled.h2`
  font-size: 2rem;
  text-align: center;
  font-weight: lighter;
  margin: 80px 80px;
`;

const EmptyCart = () => {
  const router = useRouter();

  return (
    <Grid
      cols="12"
      className="d-flex flex-column align-items-center"
      style={{ minHeight: '40vh' }}
    >
      <TitleEmptyCart>
        O seu carrinho está vazio
      </TitleEmptyCart>
      <Button
        value="Adicionar itens"
        type="submit"
        styleType="secondary"
        onClick={
          () => {
            router.push(paths.home);
          }
        }
      />
    </Grid>
  );
};

export default EmptyCart;
