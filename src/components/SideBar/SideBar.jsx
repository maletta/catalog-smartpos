import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner';
import { List, LinkItem } from 'components/List';
import FilterContext from 'contexts/FilterContext';


const SideBar = (props) => {
  const {
    loading,
    categories,
  } = props;
  const { filter, updateFilter } = useContext(FilterContext);

  const items = categories.map(item => (
    <LinkItem
      key={item.id}
      text={item.descricao}
      selected={item.id === filter.categoria}
      onClick={() => updateFilter({
        categoria: item.id, label: item.descricao, search: undefined, page: 1,
      })}
    />
  ));
  return (
    <aside>
      <List title="Ordernar por" isFullHeight>
        <LinkItem
          text="Maior preço"
          onClick={() => updateFilter({ orderBy: 'desc', sortBy: 'valorVenda' })}
          selected={(filter.orderBy === 'desc' && filter.sortBy === 'valorVenda')}
        />
        <LinkItem
          text="Menor preço"
          onClick={() => updateFilter({ orderBy: 'asc', sortBy: 'valorVenda' })}
          selected={(filter.orderBy === 'asc' && filter.sortBy === 'valorVenda')}
        />
        <LinkItem
          text="A-Z"
          onClick={() => updateFilter({ orderBy: 'asc', sortBy: 'descricao' })}
          selected={(filter.orderBy === 'asc' && filter.sortBy === 'descricao')}
        />
        <LinkItem
          text="Z-A"
          onClick={() => updateFilter({ orderBy: 'desc', sortBy: 'descricao' })}
          selected={(filter.orderBy === 'desc' && filter.sortBy === 'descricao')}
        />
      </List>
      <List title="Categorias">
        <LinkItem
          text="Todas as categorias"
          onClick={() => updateFilter({
            categoria: 0, label: 'Todas as categorias', search: undefined, page: 1,
          })}
        />
        {loading ? <Spinner /> : items}
      </List>
    </aside>
  );
};

SideBar.propTypes = {
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
};


export default SideBar;
