import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import paths from 'paths';

import FilterContext from 'contexts/FilterContext';
import Button from 'components/Form/Button';

const AddMoreItemsButton = () => {
  const { updateFilter } = useContext(FilterContext);
  const router = useRouter();

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
