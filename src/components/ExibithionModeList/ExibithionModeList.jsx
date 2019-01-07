import React, { Component } from 'react';
import { List, LinkItem } from 'components/List';
import exibithions from './exibithions';

class ExibithionModeList extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: exibithions[0] };
  }

  selectCategory(item) {
    this.setState({ selected: item });
  }

  isSelected(item) {
    const { selected } = this.state;
    if (!item && !selected) {
      return true;
    }
    if ((item && !selected) || (!item && selected)) {
      return false;
    }
    return (item.id === selected.id);
  }

  render() {
    const items = exibithions.map(item => (
      <LinkItem
        key={item.id}
        text={item.title}
        iconName={item.iconName}
        selected={this.isSelected(item)}
        onClick={() => this.selectCategory(item)}
      />
    ));
    return (
      <List title="Exibir como">
        {items}
      </List>
    );
  }
}

ExibithionModeList.propTypes = {
};

ExibithionModeList.defaultProps = {
};


export default ExibithionModeList;
