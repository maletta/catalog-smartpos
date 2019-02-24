import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryFilterList from 'components/CategoryFilterList';
import OrderOption from 'components/OrderOption';
import ExibithionModeList from 'components/ExibithionModeList';
import SideBarFooter from 'components/SideBarFooter';

class SideBar extends Component {
  render() {
    return (
      <aside className="column is-one-fifth is-narrow-mobile is-fullheight section is-hidden-touch">
        <CategoryFilterList
          categoryFilter={this.props.categoryFilter}
          onFilterCategory={this.props.onFilterCategory}
        />
        <OrderOption
          order={this.props.order}
          onChangeOrder={this.props.onChangeOrder}
        />
        <ExibithionModeList
          viewMode={this.props.viewMode}
          onChangeView={this.props.onChangeView}
        />
        <SideBarFooter />
      </aside>
    );
  }
}

SideBar.propTypes = {
  viewMode: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
  order: PropTypes.string,
  onChangeOrder: PropTypes.func.isRequired,
  categoryFilter: PropTypes.number,
  onFilterCategory: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
  viewMode: 'GRID',
  order: 'AZ',
  categoryFilter: -1,
};

export default SideBar;
