import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';

class GridList extends Component {
  render() {
    const itens = this.props.itens.map(item => <GridItem key={item.id} item={item} />);
    return (
      <div className="column section is-fluid">
        <div className="columns is-mobile is-multiline">
          {itens}
        </div>
      </div>
    );
  }
}

GridList.propTypes = {
  itens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GridList.defaultProps = {
};


export default GridList;
