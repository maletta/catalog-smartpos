import React, { useContext } from 'react';

import FilterContext from 'contexts/FilterContext';
import Button from 'components/Form/Button';

import { redirectToHome } from './cartFooterRouter';

const AddMoreItemsButton = () => {
  const { updateFilter } = useContext(FilterContext);

  const handleClickAddMoreItems = () => {
    updateFilter({
      categoria: 0,
      label: 'Todas as categorias',
      page: 1,
      search: '',
      categoryName: '',
    });
    redirectToHome();
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
