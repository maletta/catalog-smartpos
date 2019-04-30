import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  openCategories() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  selectCategory(item) {
    this.props.onFilterCategory(item);
    this.setState({ isOpen: false });
  }

  isSelected(item) {
    const { categoryFilter } = this.props;
    if (!item && !categoryFilter) {
      return true;
    }
    if ((item && !categoryFilter) || (!item && categoryFilter)) {
      return false;
    }
    return (item === categoryFilter);
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
        iconName={this.isSelected(item.id) ? 'check' : ''}
        selected={this.isSelected(item.id)}
        onClick={() => this.selectCategory(item.id)}
      />
    ));
    return (
      <>
        <div>
          <List>
            <LinkItem
              text="Tudo"
              iconName={this.isSelected(-1) ? 'check' : ''}
              selected={this.isSelected(-1)}
              onClick={() => this.selectCategory(-1)}
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
  categoryFilter: PropTypes.number,
  onFilterCategory: PropTypes.func.isRequired,
};

CategoryFilterListBottom.defaultProps = {
  categoryFilter: -1,
};


export default CategoryFilterListBottom;
