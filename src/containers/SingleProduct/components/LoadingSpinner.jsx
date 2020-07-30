import React from 'react';
import styled from 'styled-components';

import Spinner from 'components/Spinner';

const LoadingContainer = styled.div`
  display: flex;
  justify-self: center;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner = () => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);

export default LoadingSpinner;
