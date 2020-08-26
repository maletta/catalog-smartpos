import React from 'react';

import { List, LinkItem } from 'components/List';
import PropTypes from 'prop-types';

const SideBarContainer = ({ categories, filter, updateFilter }) => {
  const items = categories.map((item, index) => (
    <LinkItem
      key={item.id}
      id={index}
      text={item.descricao}
      selected={item.id === parseInt(filter.categoria, 10)}
      onClick={() => updateFilter({
        categoria: item.id, label: '', search: undefined, page: 1, redirect: true, categoryName: item.descricao,
      })}
    />
  ));

  const clear = () => {
    if (categories) {
      const cat = categories.find(c => c.id === parseInt(filter.categoria, 10));
      if (!cat) {
        return 'Todas as categorias';
      }
      return (cat.descricao);
    }
    return false;
  };

  return (
    <aside>
      <List title="Ordenar por" isFullHeight>
        <LinkItem
          text="Maior preço"
          onClick={() => updateFilter({
            categoryName: clear(),
            orderBy: 'desc',
            sortBy: 'valorVenda',
            redirect2: true,
            categoria: filter.categoria,
            label: '',
          })}
          selected={(filter.orderBy === 'desc' && filter.sortBy === 'valorVenda')}
        />
        <LinkItem
          text="Menor preço"
          onClick={() => updateFilter({
            categoryName: clear(),
            orderBy: 'asc',
            sortBy: 'valorVenda',
            redirect: true,
            categoria: filter.categoria,
            label: '',
          })}
          selected={(filter.orderBy === 'asc' && filter.sortBy === 'valorVenda')}
        />
        <LinkItem
          text="A-Z"
          onClick={() => updateFilter({
            orderBy: 'asc',
            sortBy: 'descricao',
            redirect: true,
            categoria: filter.categoria,
            label: '',
            categoryName: clear(),
          })}
          selected={(filter.orderBy === 'asc' && filter.sortBy === 'descricao')}
        />
        <LinkItem
          text="Z-A"
          onClick={() => updateFilter({
            categoryName: filter.categoryName,
            orderBy: 'desc',
            sortBy: 'descricao',
            redirect: true,
            categoria: filter.categoria,
            label: '',
          })}
          selected={(filter.orderBy === 'desc' && filter.sortBy === 'descricao')}
        />
      </List>
      <List title="Categorias">
        <LinkItem
          text="Todas as categorias"
          onClick={() => updateFilter({
            categoryName: '', categoria: 0, label: '', search: undefined, page: 1, redirect: true,
          })}
          selected={(filter.categoryName === 'Todas as categorias')}
        />
        {items}
      </List>
    </aside>
  );
};

SideBarContainer.propTypes = {
  categories: PropTypes.array.isRequired,
  filter: PropTypes.shape({
    categoria: PropTypes.any.isRequired,
    categoryName: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
  }).isRequired,
  updateFilter: PropTypes.func.isRequired,

};

export default SideBarContainer;
