import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CategoryFilterList from 'components/CategoryFilterList';
import OrderOption from 'components/OrderOption';
import ExibithionModeList from 'components/ExibithionModeList';

import { getCategories } from 'requests';

const SideBar = (props) => {
  const {
    categoryFilter,
    onFilterCategory,
    order,
    onChangeOrder,
    viewMode,
    onChangeView,
    storeInfo,
  } = props;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storeInfo.id) {
      getCategories(storeInfo.id)
        .then(response => setCategories(response.data))
        .finally(() => setLoading(false));
    }
  }, [storeInfo.id]);

  return (
    <aside>
      <CategoryFilterList
        categoryFilter={categoryFilter}
        onFilterCategory={onFilterCategory}
        categoriesList={categories}
        loading={loading}
      />
      <OrderOption
        order={order}
        onChangeOrder={onChangeOrder}
      />
      <ExibithionModeList
        viewMode={viewMode}
        onChangeView={onChangeView}
      />
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
  storeInfo: PropTypes.object.isRequired,
};

SideBar.defaultProps = {
  viewMode: 'GRID',
  order: 'AZ',
  categoryFilter: -1,
};

export default SideBar;
