import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FilterContext from 'contexts/FilterContext';
import { LinkItem } from 'components/List';

const Button = styled.button`
  position: relative;
  border: none;
  background: none;
  width: 100%;
  height: 48px;
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

const CategoryFilterListBottom = (props) => {
  const { categories } = props;
  const { updateFilter } = useContext(FilterContext);
  const [isOpen, setIsOpen] = useState(false);

  const openCategories = () => {
    setIsOpen(!isOpen);
  };

  const items = categories.map(item => (
    <LinkItem
      key={item.id}
      text={item.descricao}
      onClick={() => updateFilter({ categoria: item.id })}
    />
  ));

  return (
    <>
      {isOpen && (
        <Dropdown>
          <List>
            <LinkItem
              text="Tudo"
              onClick={() => updateFilter({ categoria: 0 })}
            />
            { items }
          </List>
        </Dropdown>
      )}

      <Button onClick={() => openCategories()} type="button">Categorias</Button>
    </>
  );
};

CategoryFilterListBottom.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoryFilterListBottom;
