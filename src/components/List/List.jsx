import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const ListContainer = styled.ul`
  ${props => props.isFullHeight && ('height: 100%')};

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Title = styled.div` 
  font-size: 15px;
  font-weight: bold;
  padding: 0;
  margin-left: 0;
  color: #363636;
`;

const List = (props) => {
  const { children, title, isFullHeight } = props;
  return (
    <Container>
      <Title>
        {title}
      </Title>
      <ListContainer isFullHeight={isFullHeight}>
        {children}
      </ListContainer>
    </Container>
  );
};

List.propTypes = {
  title: PropTypes.string,
  isFullHeight: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

List.defaultProps = {
  title: undefined,
  isFullHeight: false,
};


export default List;
