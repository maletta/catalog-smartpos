import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ArrowLeft from 'assets/arrow-left.svg';
import ArrowRight from 'assets/arrow-right.svg';

const ArrowImg = styled.img`
  @media (max-width: 576px) {
    width: 8px;
  }
`;

const IconArrow = styled.div`
  width: 40px;
  height: 60px;

  @media (max-width: 576px) {
    width: 20px;
    height: 30px;
  }

  background-color: #00549b;
  color: white;
  border-radius: 3px;
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
  opacity: 0.7;
`;

const Arrow = ({ direction }) => {
  const ImgArrowSrc = direction === 'left' ? ArrowLeft : ArrowRight;

  return (
    <IconArrow>
      <ArrowImg src={ImgArrowSrc} />
    </IconArrow>
  );
};

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
};

export default Arrow;
