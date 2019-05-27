import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterContext from 'contexts/FilterContext';


const Container = styled.div`
  &&& {
    padding-top: 50px;
  }
`;
const Button = styled.a`
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
  };
  const previusPage = () => {
    if (currentPage > 1) {
      updateFilter({ page: Number(currentPage) - 1 });
    }
  };
  const gotoPage = (page) => {
    if (page >= 1) {
      updateFilter({ page });
    }
  };

  return (
    <>
      {maxPage > 0 && (
      <Container className="column is-half is-offset-one-quarter">
        <nav className="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
          {Number(currentPage) > 1 && (
          <Button
            type="button"
            onClick={() => previusPage()}
            flexGrowUnset
            className="pagination-previous"
          >
            <FontAwesomeIcon icon={['fas', 'arrow-left']} color="white" size="sm" />
          </Button>
          )}
          {Number(currentPage) < Number(maxPage) && (
          <Button
            type="button"
            onClick={() => nextPage()}
            flexGrowUnset
            className="pagination-next"
          >
            <FontAwesomeIcon icon={['fas', 'arrow-right']} color="white" size="sm" />
          </Button>
          )}
          <ul className="pagination-list">
            <li>
              {Number(currentPage) > 2 && (
              <Button
                type="button"
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
                type="button"
                onClick={() => gotoPage(Number(currentPage) - 1)}
                className="pagination-link"
              >
                {`${Number(currentPage) - 1}`}
              </Button>
              )}
            </li>
            <li>
              <Button
                type="button"
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
                type="button"
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
                type="button"
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
      )}

    </>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  maxPage: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  currentPage: 1,
};


export default Pagination;
