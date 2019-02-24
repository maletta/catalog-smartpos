import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExibithionModeBottom from 'components/ExibithionModeBottom';
import OrderFilterBottom from 'components/OrderFilterBottom';
import CategoryFilterListBottom from 'components/CategoryFilterListBottom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  align-items: flex-end;
`;

const Category = styled.div`
  width: 100%;
  position: relative;
`;
const Options = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

class BottomBar extends Component {
  render() {
    return (
      <Nav className="navbar is-fixed-bottom has-shadow is-hidden-desktop">
        <Category>
          <CategoryFilterListBottom
            categoryFilter={this.props.categoryFilter}
            onFilterCategory={this.props.onFilterCategory}
          />
          <Options>
            <OrderFilterBottom
              order={this.props.order}
              onChangeOrder={this.props.onChangeOrder}
            />
            <ExibithionModeBottom
              viewMode={this.props.viewMode}
              onChangeView={this.props.onChangeView}
            />
          </Options>
        </Category>
      </Nav>
    );
  }
}

BottomBar.propTypes = {
  viewMode: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
  order: PropTypes.string,
  onChangeOrder: PropTypes.func.isRequired,
  categoryFilter: PropTypes.number,
  onFilterCategory: PropTypes.func.isRequired,
};

BottomBar.defaultProps = {
  viewMode: 'GRID',
  order: 'AZ',
  categoryFilter: -1,
};


export default BottomBar;
