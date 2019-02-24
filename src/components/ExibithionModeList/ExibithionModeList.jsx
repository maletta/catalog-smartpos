import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, LinkItem } from 'components/List';

class ExibithionModeList extends Component {
  isSelected(item) {
    const { viewMode } = this.props;
    if (!item && !viewMode) {
      return true;
    }
    if ((item && !viewMode) || (!item && viewMode)) {
      return false;
    }
    return (item === viewMode);
  }

  render() {
    const items = [
      (<LinkItem
        key={1}
        text="Lista"
        iconName="list"
        selected={this.isSelected('LIST')}
        onClick={() => this.props.onChangeView('LIST')}
      />),
      (<LinkItem
        key={2}
        text="Grid"
        iconName="th"
        selected={this.isSelected('GRID')}
        onClick={() => this.props.onChangeView('GRID')}
      />),
    ];
    return (
      <List title="Exibir como">
        {items}
      </List>
    );
  }
}

ExibithionModeList.propTypes = {
  viewMode: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
};

ExibithionModeList.defaultProps = {
  viewMode: 'GRID',
};


export default ExibithionModeList;
