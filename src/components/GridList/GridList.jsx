import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';
import styled from 'styled-components';

const List = styled.div``;

class GridList extends Component {
  render() {
    const itens = this.props.itens.map(item => <GridItem key={item.id} item={item} />);
    return (
      <List className="columns is-mobile is-multiline">
        {itens}
      </List>
    );
  }
}

GridList.propTypes = {
  itens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GridList.defaultProps = {
};


export default GridList;
