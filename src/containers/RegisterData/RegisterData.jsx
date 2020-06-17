import React from "react";
import styled from "styled-components";

import Grid from "components/Grid";
import Steps from "components/Steps";
import PurchasePrices from "containers/Cart/components/PurchasePrices";

const Container = styled.div`
  background: #fff;
  padding-right: 0;
`;

const StepsContainer = styled.div`
  width: 100%;
`;

const RegisterData = () => {
  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <StepsContainer>
          <Steps />
        </StepsContainer>
        <p>Hello</p>
      </Grid>
      <Grid cols="12 12 12 4 4" style={{ padding: 0 }}>
        <PurchasePrices
          // basketCountCart={basketCountCart}
          basketCountCart={0}
          // totalCart={totalCart}
          totalCart={0}
          // deliveryCost={deliveryCost}
          deliveryCost={{}}
          couponValue={-5}
        />
      </Grid>
    </Container>
  );
};

export default RegisterData;
