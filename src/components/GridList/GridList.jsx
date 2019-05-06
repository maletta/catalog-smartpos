import React from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';

const GridList = (props) => {
  const { itens } = props;
  const items = itens.map(item => <GridItem key={item.id} item={item} />);
  return (
    <div className="column section is-fluid">
      <div className="columns is-mobile is-multiline">
        {items}
      </div>
    </div>
  );
};

GridList.propTypes = {
  itens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GridList.defaultProps = {
};

export default GridList;
