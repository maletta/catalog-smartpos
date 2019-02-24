import React, { Component } from 'react';
import categories from 'categorias';
import { LinkItem } from 'components/List';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background: none;
  width: 100%;
  height: 48px;
  font-size: 1rem;
`;

const List = styled.ul`
  border-bottom: 1px whitesmoke solid;
  padding: 10px 0;
`;

class CategoryFilterListBottom extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  selectCategory(item) {
    this.setState({ selected: item, isOpen: false });
  }

  openCategories() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
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

  renderTitle() {
    const { selected } = this.state;
    return (
      <Button onClick={() => this.openCategories()} type="button">{selected ? selected.title : 'Categorias' }</Button>
    );
  }

  renderList() {
    const items = categories.map(item => (
      <LinkItem
        key={item.id}
        text={item.title}
        iconName={this.isSelected(item) ? 'check' : ''}
        selected={this.isSelected(item)}
        onClick={() => this.selectCategory(item)}
      />
    ));
    return (
      <>
        <div>
          <List>
            <LinkItem
              text="Tudo"
              iconName={this.isSelected() ? 'check' : ''}
              selected={this.isSelected()}
              onClick={() => this.selectCategory()}
            />
            { items }
          </List>
        </div>
        { this.renderTitle() }
      </>
    );
  }

  render() {
    const { isOpen } = this.state;
    return isOpen ? this.renderList() : this.renderTitle();
  }
}

CategoryFilterListBottom.propTypes = {
};

CategoryFilterListBottom.defaultProps = {
};


export default CategoryFilterListBottom;
