import React, { useContext } from 'react';
import ReactPaginate from 'react-paginate';

import FilterContext from 'contexts/FilterContext';
import Row from 'components/Row';

type Props = {
  pageCount: number
};

const GridProductsPagination = (props: Props) => {
  const { pageCount } = props;
  const { filter, updateFilter } = useContext(FilterContext);
  const forcePage = filter.page ? filter.page - 1 : 0;

  return (
    <Row className="d-flex align-items-center justify-content-center">
      <ReactPaginate
        previousLabel="Anterior"
        nextLabel="Próxima"
        breakLabel="..."
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName="pagination"
        activeClassName="active"
        pageCount={pageCount}
        forcePage={forcePage}
        onPageChange={data => updateFilter({ page: data.selected + 1 })}
      />
    </Row>
  );
};

export default GridProductsPagination;
