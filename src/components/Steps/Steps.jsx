import React, { useState, useEffect } from "react";
import styled from "styled-components";
import lodash from "lodash";
import {
  faShoppingBag,
  faEdit,
  faHome,
  faDonate,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";

import Step from "./components/Step";

const StepsContainer = styled.div`
  padding: 10px;
`;

const Line = styled.hr`
  margin-bottom: -25px;
  border: 1px dashed #d6d6d6;
  width: 90%;

  @media (max-width: 425px) {
    width: 80%;
    margin-bottom: -15px;
  }
`;

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
`;

const stepsInfo = [
  { icon: faShoppingBag, text: "Resumo de compra", isActive: false },
  { icon: faEdit, text: "Dados cadastrais", isActive: false },
  { icon: faHome, text: "Endereço", isActive: false },
  { icon: faDonate, text: "Pagamento", isActive: false },
  { icon: faThumbsUp, text: "Conclusão", isActive: false }
];

const Steps = ({ activeIndex }) => {
  const [stateSteps, setStateStep] = useState(stepsInfo);

  useEffect(() => {
    const cloneSteps = lodash.cloneDeep(stateSteps);
    cloneSteps[activeIndex].isActive = true;
    setStateStep(cloneSteps);
  }, []);

  const steps = stateSteps.map(({ icon, text, isActive }) => (
    <Step key={text} icon={icon} text={text} isActive={isActive} />
  ));

  return (
    <StepsContainer>
      <Line />
      <Cont>{steps}</Cont>
    </StepsContainer>
  );
};

export default Steps;
