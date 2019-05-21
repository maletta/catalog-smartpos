import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FilterContext from 'contexts/FilterContext';
import { LinkItem } from 'components/List';

const Button = styled.button`
  width: 100%;
  height: 48px;
  border: 1px solid #eee;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
  background: #fff;
  border-radius: 5px;
  font-size: 1rem;
  color: #929292;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 55px;
  background: #fff;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
  width: 100%;
  border-radius: 5px;
  border: 1px solid #eee;
  z-index: 9;
`;

const List = styled.ul`
  padding: 10px 0;
  overflow-y: auto;
  height: 300px;
`;

const Icon = styled.div`
  font-size: 18px;
  display: inline-block;
  padding: 8px;
`;

const DivSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CategoryFilterListBottom = (props) => {
  const { categories } = props;
  const { updateFilter } = useContext(FilterContext);
  const [isOpen, setIsOpen] = useState(false);

  function collapse() {
    setIsOpen(false);
  }

  const items = categories.map(item => (
    <LinkItem
      key={item.id}
      text={item.descricao}
      onClick={() => updateFilter({ categoria: item.id, page: 1 })}
    />
  ));

  useEffect(
    () => {
      if (isOpen) {
        document.addEventListener('click', collapse);
      } else {
        document.removeEventListener('click', collapse);
      }

      return () => {
        document.removeEventListener('click', collapse);
      };
    },
    [isOpen],
  );

  return (
    <>
      {isOpen && (
        <Dropdown>
          <List>
            <LinkItem text="Tudo" onClick={() => updateFilter({ categoria: 0 })} />
            {items}
          </List>
        </Dropdown>
      )}

      <Button onClick={() => setIsOpen(true)} type="button">
        <DivSelect>
          <div> Categorias </div>
          <Icon>
            <FontAwesomeIcon icon="caret-down" size="lg" />
          </Icon>
        </DivSelect>
      </Button>
    </>
  );
};

CategoryFilterListBottom.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoryFilterListBottom;
