import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DropDownMenu = styled.div`
  text-align: center;
  color: #fff;
`;

const HeaderBody = styled.div`
  padding: 10px 5px;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ItemsContainer = styled.ul`
  height: auto;
  max-height: ${props => (props.listOpen ? `calc(${props.itemsLength} * 45px)` : '0px')};
  background-color: rgba(0, 0, 0, 0.7);
  transition: all 1.5s ease-in-out;
`;

const Item = styled.li`
  padding: 10px;
`;

const Header = ({ title, isOpen, toggleList }) => (
  <HeaderBody onClick={() => toggleList()}>
    <div>
      {title}
      {' '}
      {isOpen ? '^' : 'v'}
    </div>
  </HeaderBody>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleList: PropTypes.func.isRequired,
};

const Items = ({ listOpen, list, selectItem }) => {
  const items = list.map(item => (
    <Item key={item.id} onClick={() => selectItem(item)}>
      {item.title}
    </Item>
  ));
  return (
    <ItemsContainer listOpen={listOpen} itemsLength={items.length}>
      {items}
    </ItemsContainer>
  );
};

Items.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  listOpen: PropTypes.bool.isRequired,
  selectItem: PropTypes.func.isRequired,
};

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: props.title,
    };
  }

  toggleList() {
    const { listOpen } = this.state;
    this.setState({ listOpen: !listOpen });
  }

  selectItem(item) {
    this.setState({ headerTitle: item.title, listOpen: false });
  }

  render() {
    const { list } = this.props;
    const { listOpen, headerTitle } = this.state;

    return (
      <DropDownMenu>
        <Header title={headerTitle} isOpen={listOpen} toggleList={() => this.toggleList()} />
        <Items listOpen={listOpen} list={list} selectItem={item => this.selectItem(item)} />
      </DropDownMenu>
    );
  }
}

DropDown.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

DropDown.defaultProps = {
};


export default DropDown;
