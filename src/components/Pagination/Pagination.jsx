import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const Pagination = (props) => {
  const { setPage, currentPage, maxPage } = props;

  const nextPage = () => {
    setPage({ page: Number(currentPage) + 1 });
    window.history.pushState('', '', `?page=${Number(currentPage) + 1}`);
  };
  const previusPage = () => {
    if (currentPage > 1) {
      setPage({ page: Number(currentPage) - 1 });
      window.history.pushState('', '', `?page=${Number(currentPage) - 1}`);
    }
  };
  const gotoPage = (page) => {
    if (page >= 1) {
      setPage({ page });
      window.history.pushState('', '', `?page=${page}`);
    }
  };

  return (
    <div className="column is-half is-offset-one-quarter">
      <nav className="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
        <button type="button" onClick={() => previusPage()} className="pagination-previous"> Anterior  </button>
        <button type="button" onClick={() => nextPage()} className="pagination-next"> Próxima  </button>
        <ul className="pagination-list">
          <li>
            {Number(currentPage) > 2 && (
            <button
              type="button"
              onClick={() => gotoPage(Number(currentPage) - 2)}
              className="pagination-link"
            >
              {`${Number(currentPage) - 2}`}
            </button>
            )}
          </li>
          <li>
            {Number(currentPage) > 1 && (
              <button
                type="button"
                onClick={() => gotoPage(Number(currentPage) - 1)}
                className="pagination-link"
              >
                {`${Number(currentPage) - 1}`}
              </button>
            )}
          </li>
          <li>
            <button
              type="button"
              className="pagination-link is-current"
              aria-current="page"
            >
              {currentPage}
            </button>
          </li>
          <li>
            {Number(currentPage) < Number(maxPage) && (
              <button
                type="button"
                onClick={() => gotoPage(Number(currentPage) + 1)}
                className="pagination-link"
              >
                {`${Number(currentPage) + 1}`}
              </button>
            )}
          </li>
          <li>
            {Number(currentPage) < Number(maxPage) && (
              <button
                type="button"
                onClick={() => gotoPage(Number(currentPage) + 2)}
                className="pagination-link"
              >
                {`${Number(currentPage) + 2}`}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  setPage: PropTypes.func.isRequired,
  currentPage: PropTypes.string,
  maxPage: PropTypes.string.isRequired,
};

Pagination.defaultProps = {
  currentPage: '1',
};

export default Pagination;
