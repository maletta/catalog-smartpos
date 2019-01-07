import React, { Component } from 'react';
import CategoryFilterList from 'components/CategoryFilterList';
import OrderOption from 'components/OrderOption';
import ExibithionModeList from 'components/ExibithionModeList';
import SideBarFooter from 'components/SideBarFooter';

class SideBar extends Component {
  render() {
    return (
      <aside className="column is-one-fifth is-narrow-mobile is-fullheight section is-hidden-touch">
        <CategoryFilterList />
        <OrderOption />
        <ExibithionModeList />
        <SideBarFooter />
      </aside>
    );
  }
}

SideBar.propTypes = {
};

SideBar.defaultProps = {
};


export default SideBar;
