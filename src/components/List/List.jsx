import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
  background-color: #ffff;
  width: 100%;
  margin-bottom: 10px;
`;

const ListContainer = styled.ul`
  overflow-y: auto;
  height: 300px;

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
  padding: 10px;
  margin-left: 10px;
  background: #fff;
`;

const List = (props) => {
  const { children, title } = props;
  return (
    <Container>
      <Title>
        {title}
      </Title>
      <ListContainer className="menu-list">
        {children}
      </ListContainer>
    </Container>
  );
};

List.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

List.defaultProps = {
  title: undefined,
};


export default List;
