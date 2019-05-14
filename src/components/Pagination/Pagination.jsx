import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterContext from 'contexts/FilterContext';


const Container = styled.div`
  &&& {
    padding-top: 50px;
  }
`;
const Button = styled.button`
  &&& {
    border-color: #f38a00;
    background-color: white;
    color: #f38a00;
    cursor: pointer;
    ${props => props.current && (
    ` background-color: #f38a00;
      color: white;`
  )}
    ${props => props.flexGrowUnset && (
    ` flex-grow: unset;
      background-color: #f38a00;
      color: white;`
  )}
  }
`;

const Pagination = (props) => {
  const { currentPage, maxPage } = props;
  const { updateFilter } = useContext(FilterContext);

  const nextPage = () => {
    updateFilter({ page: Number(currentPage) + 1 });
    window.history.pushState('', '', `?page=${Number(currentPage) + 1}`);
  };
  const previusPage = () => {
    if (currentPage > 1) {
      updateFilter({ page: Number(currentPage) - 1 });
      window.history.pushState('', '', `?page=${Number(currentPage) - 1}`);
    }
  };
  const gotoPage = (page) => {
    if (page >= 1) {
      updateFilter({ page });
      window.history.pushState('', '', `?page=${page}`);
    }
  };

  return (
    <Container className="column is-half is-offset-one-quarter">
      <nav className="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
        {Number(currentPage) > 1 && (<Button type="Button" onClick={() => previusPage()} flexGrowUnset className="pagination-previous"> 🡐  </Button>)}
        {Number(currentPage) < Number(maxPage) && (<Button type="Button" onClick={() => nextPage()} flexGrowUnset className="pagination-next"> 🡒  </Button>)}
        <ul className="pagination-list">
          <li>
            {Number(currentPage) > 2 && (
            <Button
              type="Button"
              onClick={() => gotoPage(Number(currentPage) - 2)}
              className="pagination-link"
            >
              {`${Number(currentPage) - 2}`}
            </Button>
            )}
          </li>
          <li>
            {Number(currentPage) > 1 && (
              <Button
                type="Button"
                onClick={() => gotoPage(Number(currentPage) - 1)}
                className="pagination-link"
              >
                {`${Number(currentPage) - 1}`}
              </Button>
            )}
          </li>
          <li>
            <Button
              type="Button"
              className="pagination-link is-current"
              current
              aria-current="page"
            >
              {currentPage}
            </Button>
          </li>
          <li>
            {Number(currentPage) < Number(maxPage) && (
              <Button
                type="Button"
                onClick={() => gotoPage(Number(currentPage) + 1)}
                className="pagination-link"
              >
                {`${Number(currentPage) + 1}`}
              </Button>
            )}
          </li>
          <li>
            {Number(currentPage + 1) < Number(maxPage) && (
              <Button
                type="Button"
                onClick={() => gotoPage(Number(currentPage) + 2)}
                className="pagination-link"
              >
                {`${Number(currentPage) + 2}`}
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </Container>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
};

export default Pagination;
