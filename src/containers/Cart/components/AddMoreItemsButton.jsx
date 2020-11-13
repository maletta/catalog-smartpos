import React, { useContext } from 'react';
import useRouterHook from 'utils/useRouterHook';
import paths from 'paths';

import FilterContext from 'contexts/FilterContext';
import Button from 'components/Form/Button';

const AddMoreItemsButton = () => {
  const { updateFilter } = useContext(FilterContext);
  const router = useRouterHook();

  const handleClickAddMoreItems = () => {
    updateFilter({
      categoria: 0,
      label: 'Todas as categorias',
      page: 1,
      search: '',
      categoryName: '',
    });
    router.push(paths.home);
  };

  return (
    <Button
      className="mr-3"
      value="Adicionar mais itens"
      styleType="secondary"
      onClick={handleClickAddMoreItems}
    />
  );
};

export default AddMoreItemsButton;
