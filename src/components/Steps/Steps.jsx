import React from "react";
import styled from "styled-components";
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

const steps = stepsInfo.map(({ icon, text, isActive }) => (
  <Step icon={icon} text={text} isActive={isActive} />
));

const Steps = () => {
  return (
    <StepsContainer>
      <Line />
      <Cont>{steps}</Cont>
    </StepsContainer>
  );
};

export default Steps;
