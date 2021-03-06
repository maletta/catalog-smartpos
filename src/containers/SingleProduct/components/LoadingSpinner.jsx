import React from 'react';
import styled from 'styled-components';

import Spinner from 'components/Spinner';

const LoadingContainer = styled.div`
  display: grid;
  place-items: center;
`;

const LoadingSpinner = () => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);

export default LoadingSpinner;
