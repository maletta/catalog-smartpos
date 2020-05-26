import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { List, LinkItem } from 'components/List';
import FilterContext from 'contexts/FilterContext';


const SideBar = (props) => {
  const {
    categories,
  } = props;
  const { filter, updateFilter } = useContext(FilterContext);
  const items = categories.map((item, index) => (
    <LinkItem
      key={item.id}
      id={index}
      text={item.descricao}
      selected={item.id === parseInt(filter.categoria, 10)}
      onClick={() => updateFilter({
        categoria: item.id, label: item.descricao, search: undefined, page: 1, redirect: true, categoryName: '',
      })}
    />
  ));

  const clear = (category, label) => {
    if (category) {
      return 'Todas as categorias';
    }
    return label;
  };

  return (
    <aside>
      <List title="Ordernar por" isFullHeight>
        <LinkItem
          text="Maior preço"
          onClick={() => updateFilter({
            categoryName: '',
            orderBy: 'desc',
            sortBy: 'valorVenda',
            redirect: true,
            categoria: filter.categoria,
            label: clear(filter.categoryName, filter.label),
          })}
          selected={(filter.orderBy === 'desc' && filter.sortBy === 'valorVenda')}
        />
        <LinkItem
          text="Menor preço"
          onClick={() => updateFilter({
            categoryName: '',
            orderBy: 'asc',
            sortBy: 'valorVenda',
            redirect: true,
            categoria: filter.categoria,
            label: clear(filter.categoryName, filter.label),
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
            label: clear(filter.categoryName, filter.label),
          })}
          selected={(filter.orderBy === 'asc' && filter.sortBy === 'descricao')}
        />
        <LinkItem
          text="Z-A"
          onClick={() => updateFilter({
            categoryName: '',
            orderBy: 'desc',
            sortBy: 'descricao',
            redirect: true,
            categoria: filter.categoria,
            label: clear(filter.categoryName, filter.label),
          })}
          selected={(filter.orderBy === 'desc' && filter.sortBy === 'descricao')}
        />
      </List>
      <List title="Categorias">
        <LinkItem
          text="Todas as categorias"
          onClick={() => updateFilter({
            categoryName: '', categoria: 0, label: 'Todas as categorias', search: undefined, page: 1, redirect: true,
          })}
          selected={(filter.label === 'Todas as categorias')}
        />
        {items}
      </List>
    </aside>
  );
};

SideBar.propTypes = {
  categories: PropTypes.array,
};

SideBar.defaultProps = {
  categories: null,
};

export default SideBar;
