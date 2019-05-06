import React from 'react';
import PropTypes from 'prop-types';
import CategoryFilterList from 'components/CategoryFilterList';
import OrderOption from 'components/OrderOption';
import ExibithionModeList from 'components/ExibithionModeList';
import SideBarFooter from 'components/SideBarFooter';

const SideBar = (props) => {
  const {
    categoryFilter,
    onFilterCategory,
    order,
    onChangeOrder,
    viewMode,
    onChangeView,
  } = props;

  return (
    <aside className="column is-one-fifth is-narrow-mobile is-fullheight section is-hidden-touch">
      <CategoryFilterList
        categoryFilter={categoryFilter}
        onFilterCategory={onFilterCategory}
      />
      <OrderOption
        order={order}
        onChangeOrder={onChangeOrder}
      />
      <ExibithionModeList
        viewMode={viewMode}
        onChangeView={onChangeView}
      />
      <SideBarFooter />
    </aside>
  );
};

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
