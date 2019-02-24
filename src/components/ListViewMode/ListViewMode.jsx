import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListViewItem from 'components/ListViewItem/ListViewItem';

class ListViewMode extends Component {
  render() {
    const itens = this.props.itens.map(item => <ListViewItem key={item.id} item={item} />);
    return (
      <div className="column section is-fluid">
        <div className="columns is-mobile is-multiline">
          {itens}
        </div>
      </div>
    );
  }
}

ListViewMode.propTypes = {
  itens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ListViewMode.defaultProps = {
};


export default ListViewMode;
