import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled.span`
  font-size: 18px;
  display: inline-block;
  padding: 8px;
`;


class ExibithionModeList extends Component {
  getIconName() {
    const { viewMode } = this.props;
    return viewMode === 'GRID' ? 'th' : 'list';
  }

  toggleMode() {
    const { viewMode } = this.props;
    this.props.onChangeView(viewMode === 'GRID' ? 'LIST' : 'GRID');
  }

  render() {
    return (
      <Icon onClick={() => this.toggleMode()}>
        <FontAwesomeIcon
          icon={this.getIconName()}
          size="lg"
        />
      </Icon>
    );
  }
}

ExibithionModeList.propTypes = {
  viewMode: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
};

ExibithionModeList.defaultProps = {
  viewMode: 'LIST',
};


export default ExibithionModeList;
