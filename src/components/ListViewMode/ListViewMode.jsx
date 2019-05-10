import React from 'react';
import PropTypes from 'prop-types';
import ListViewItem from 'components/ListViewItem/ListViewItem';

const ListViewMode = (props) => {
  const itens = props.itens.map(item => <ListViewItem key={item.id} item={item} />);
  return (
    <div className="column is-fluid">
      <div className="columns is-mobile is-multiline">
        {itens}
      </div>
    </div>
  );
};

ListViewMode.propTypes = {
  itens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ListViewMode.defaultProps = {
};


export default ListViewMode;
