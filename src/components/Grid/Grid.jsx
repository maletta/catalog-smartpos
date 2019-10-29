import React, { Component } from 'react';
import {
  oneOfType,
  arrayOf,
  node,
  string,
  bool,
} from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

const StyledGrid = styled.div`
  ${props => (props.isFlex
    ? 'display: flex;'
    : ''
  )}
`;

class Grid extends Component {
  toCssClasses = (numbers) => {
    const cols = numbers ? numbers.split(' ') : [];
    let classes = '';

    if (cols[0]) classes += `col-${cols[0]}`;
    if (cols[1]) classes += ` col-sm-${cols[1]}`;
    if (cols[2]) classes += ` col-md-${cols[2]}`;
    if (cols[3]) classes += ` col-lg-${cols[3]}`;
    if (cols[4]) classes += ` col-xl-${cols[4]}`;

    return classes;
  }

  render() {
    const {
      cols,
      children,
      className,
      ...props
    } = this.props;

    const GridClasses = this.toCssClasses(cols);

    return (
      <StyledGrid
        className={classNames('col', className, GridClasses)}
        {...props}
      >
        {children}
      </StyledGrid>
    );
  }
}

Grid.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
  cols: string,
  isFlex: bool,
  className: string,
};

Grid.defaultProps = {
  cols: '',
  isFlex: false,
  className: '',
};


export default Grid;
