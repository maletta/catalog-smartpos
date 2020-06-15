import React, { useState } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
// import { injectIntl, intlShape } from "react-intl";

import TextArea from "components/Form/TextArea";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ObservationButton = styled.p`
  cursor: pointer;
  color: var(--color-primary);
`;

const ItemObservation = ({ id }) => {
  const [showObservation, setShowObservation] = useState(false);

  return (
    <Container>
      <ObservationButton onClick={() => setShowObservation(!showObservation)}>
        {"Adicionar observação"}
      </ObservationButton>
      {showObservation && (
        <TextArea inputId={`obs-${id}`} label="Observação" rows={3} />
      )}
    </Container>
  );
};

export default ItemObservation;
