import React from 'react';
import PropTypes from 'prop-types';
import { List, LinkItem } from 'components/List';


const ExibithionModeList = (props) => {
  const { viewMode, onChangeView } = props;

  const isSelected = (item) => {
    if (!item && !viewMode) {
      return true;
    }
    if ((item && !viewMode) || (!item && viewMode)) {
      return false;
    }
    return (item === viewMode);
  };
  const items = [
    (<LinkItem
      key={1}
      text="Lista"
      iconName="list"
      selected={isSelected('LIST')}
      onClick={() => onChangeView('LIST')}
    />),
    (<LinkItem
      key={2}
      text="Grid"
      iconName="th"
      selected={isSelected('GRID')}
      onClick={() => onChangeView('GRID')}
    />),
  ];
  return (
    <List title="Exibir como">
      {items}
    </List>
  );
};

ExibithionModeList.propTypes = {
  viewMode: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
};

ExibithionModeList.defaultProps = {
  viewMode: 'GRID',
};


export default ExibithionModeList;
