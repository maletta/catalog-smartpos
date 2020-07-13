import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import {
  faShoppingBag,
  faEdit,
  faHome,
  faDonate,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import Step from './components/Step';

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
  {
    icon: faShoppingBag, text: 'Resumo de compra', isActive: false, path: '/carrinho',
  },
  {
    icon: faEdit, text: 'Dados cadastrais', isActive: false, path: '/dados-cadastrais',
  },
  {
    icon: faHome, text: 'Endereço', isActive: false, path: '/endereco',
  },
  {
    icon: faDonate, text: 'Pagamento', isActive: false, path: '/pagamento',
  },
  {
    icon: faThumbsUp, text: 'Conclusão', isActive: false, path: '/conclusao',
  },
];

const Steps = ({ activeIndex }) => {
  const [stateSteps, setStateStep] = useState(stepsInfo);

  useEffect(() => {
    const cloneSteps = lodash.cloneDeep(stateSteps);
    const activeSteps = cloneSteps.map((step, index) => {
      const cloneStep = lodash.cloneDeep(step);

      if (index <= activeIndex) {
        cloneStep.isActive = true;
      }

      return cloneStep;
    });

    setStateStep(activeSteps);
  }, []);

  const steps = stateSteps.map(({
    icon, text, isActive, path,
  }) => <Step key={text} icon={icon} text={text} isActive={isActive} path={path} />);

  return (
    <StepsContainer>
      <Line />
      <Cont>{steps}</Cont>
    </StepsContainer>
  );
};

Steps.propTypes = {
  activeIndex: PropTypes.any.isRequired,
};

export default Steps;
