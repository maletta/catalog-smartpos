import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled.span`
  font-size: 18px;
  display: inline-block;
  padding: 8px;
`;

const ExibithionModeList = (props) => {
  const { viewMode, onChangeView } = props;

  const getIconName = () => (viewMode === 'GRID' ? 'th' : 'list');

  const toggleMode = () => {
    onChangeView(viewMode === 'GRID' ? 'LIST' : 'GRID');
  };

  return (
    <Icon onClick={() => toggleMode()}>
      <FontAwesomeIcon
        icon={getIconName()}
        size="lg"
      />
    </Icon>
  );
};

ExibithionModeList.propTypes = {
  viewMode: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
};

ExibithionModeList.defaultProps = {
  viewMode: 'LIST',
};

export default ExibithionModeList;
