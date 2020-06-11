import React, { useState } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
// import { injectIntl, intlShape } from "react-intl";

import TextArea from "components/Form/TextArea";

const ObservationButton = styled.p`
  cursor: pointer;
  color: var(--color-primary);
`;

const ItemObservation = ({ id }) => {
  const [showObservation, setShowObservation] = useState(false);

  return (
    <>
      <ObservationButton onClick={() => setShowObservation(!showObservation)}>
        {"Adicionar observação"}
      </ObservationButton>
      {showObservation && (
        <TextArea inputId={`obs-${id}`} label="Observação" rows={3} />
      )}
    </>
  );
};

export default ItemObservation;
