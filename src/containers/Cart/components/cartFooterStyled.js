import styled from 'styled-components';

export const DeliveryContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const CEPContainer = styled.div`
  margin-bottom: 20px;

  @media (max-width: 425px) {
    width: 100%;
  }
`;
