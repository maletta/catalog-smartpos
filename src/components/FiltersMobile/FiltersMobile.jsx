import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FilterContext from 'contexts/FilterContext';

const Div = styled.div`
  display: flex;
  flex-grow: 0;
  justify-content: space-between;
  background: #fff;
`;

const Label = styled.div`
  padding: 5px 15px 5px 15px;
  color: #3483fa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Icon = styled.span`
  margin-right: 5px;
  font-size: 0.8rem;
`;

const AreaSelect = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100%;
  z-index: 9999;
  background: #fff;
  overflow: auto;
`;

const Select = styled.ul`
  height: auto;
`;

const SelectItem = styled.li`
  padding: 10px 10px 10px 25px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
`;

const SelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  border-bottom: 1px solid #ddd;
`;

const SelectTitle = styled.span`
  font-size: 1.5rem;
  color: #333;
  font-weight: bolder;
`;

const CloseSelect = styled.div`
  color: #3483fa;
`;

const Dropdown = styled.div`
  display: inline-block;
  position: relative;
`;

const DropdownContent = styled.ul`
  position: absolute;
  top: 34px;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownContenItem = styled.li`
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const FiltersMobile = ({ categories }) => {
  const [isSelectCategoryOpen, setSelectCategoryOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);
  const [dropdownSelected, setDropdownSelected] = useState(null);
  const { updateFilter } = useContext(FilterContext);

  const renderCategories = categories.map(item => (
    <SelectItem
      key={item.id}
      title={item.descricao}
      onClick={() => {
        updateFilter({
          categoria: item.id, page: 1, search: undefined, redirect: true, label: item.descricao,
        });
        setSelectCategoryOpen(false);
        setCategorySelected(item.descricao);
      }}
    >
      {item.descricao}
    </SelectItem>
  ));

  function collapse() {
    setDropdownOpen(false);
  }

  useEffect(
    () => {
      if (isDropdownOpen) {
        document.addEventListener('click', collapse);
      } else {
        document.removeEventListener('click', collapse);
      }

      return () => {
        document.removeEventListener('click', collapse);
      };
    },
    [isDropdownOpen],
  );

  return (
    <div className="d-md-none">
      <Div>
        <Dropdown>
          <Label onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <Icon>
              <FontAwesomeIcon icon={['fa', 'sort']} size="1x" />
            </Icon>
            {(dropdownSelected || 'Ordenar')}
          </Label>
          {isDropdownOpen && (
            <DropdownContent>
              <DropdownContenItem
                onClick={() => {
                  updateFilter({ orderBy: 'desc', sortBy: 'valorVenda' });
                  setDropdownOpen(false);
                  setDropdownSelected('Maior preço');
                }}
              >


                Maior preço
              </DropdownContenItem>
              <DropdownContenItem
                onClick={() => {
                  updateFilter({ orderBy: 'asc', sortBy: 'valorVenda' });
                  setDropdownOpen(false);
                  setDropdownSelected('Menor preço');
                }}
              >


                Menor preço
              </DropdownContenItem>
              <DropdownContenItem
                onClick={() => {
                  updateFilter({ orderBy: 'asc', sortBy: 'descricao' });
                  setDropdownOpen(false);
                  setDropdownSelected('A-Z');
                }}
              >


                A-Z
              </DropdownContenItem>
              <DropdownContenItem
                onClick={() => {
                  updateFilter({ orderBy: 'desc', sortBy: 'descricao' });
                  setDropdownOpen(false);
                  setDropdownSelected('Z-A');
                }}
              >


                Z-A
              </DropdownContenItem>
            </DropdownContent>
          )}
        </Dropdown>
        <Label onClick={() => setSelectCategoryOpen(true)}>
          <Icon>
            <FontAwesomeIcon icon={['fa', 'sliders-h']} size="1x" />
          </Icon>
          {(categorySelected || 'Categorias')}
        </Label>
      </Div>
      {isSelectCategoryOpen && (
        <AreaSelect>
          <SelectHeader>
            <div>
              <SelectTitle>Categorias</SelectTitle>
            </div>
            <CloseSelect onClick={() => setSelectCategoryOpen(false)}>
              <FontAwesomeIcon icon={['fa', 'times']} size="2x" />
            </CloseSelect>
          </SelectHeader>
          <Select>
            <SelectItem
              title="Todas as categorias"
              onClick={() => {
                updateFilter({
                  categoria: 0, label: 'Todas as categorias', search: undefined, page: 1,
                });
                setSelectCategoryOpen(false);
                setCategorySelected(null);
              }}
            >


              Todas as Categorias
            </SelectItem>
            {renderCategories}
          </Select>
        </AreaSelect>
      )}
    </div>
  );
};

FiltersMobile.propTypes = {
  categories: PropTypes.array,
};

FiltersMobile.defaultProps = {
  categories: null,
};

export default FiltersMobile;
