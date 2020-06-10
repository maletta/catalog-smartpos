import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const isPrimaryColor = ({ isActive }) =>
  isActive ? "var(--color-primary)" : "#b6b6b6";

const StepCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: ${isPrimaryColor};

  @media (max-width: 425px) {
    height: 25px;
    width: 25px;
  }
`;

const StepText = styled.p`
  margin-top: 7px;
  width: 100px;
  text-align: center;
  color: ${isPrimaryColor};

  @media (max-width: 425px) {
    font-size: 12px;
    width: 70px;
  }

  @media (max-width: 425px) {
    width: 50px;
  }
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Step = ({ icon, text, isActive }) => {
  return (
    <StepContainer isActive={isActive}>
      <StepCircle isActive={isActive}>
        <FontAwesomeIcon
          color="white"
          size={window.outerWidth < 426 ? "xs" : "lg"}
          icon={icon}
        />
      </StepCircle>
      <StepText isActive={isActive}>{text}</StepText>
    </StepContainer>
  );
};

export default Step;
