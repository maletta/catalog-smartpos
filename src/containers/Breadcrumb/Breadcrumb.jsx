import React, { useContext } from 'react';
import Grid from 'components/Grid';
import Row from 'components/Row';
import styled from 'styled-components';
import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';

import history from 'utils/history';

const Nav = styled.nav`
  &&& {
    background: transparent;
  }
`;

const BreadcrumbButton = styled.span`
  align-items: center;
  color: var(--color-link);
  display: flex;
  justify-content: center;
  padding: 0 0.75em;
  cursor: pointer;
`;

const LinkCategories = styled.span`
  cursor: pointer;

  :hover {
    color: var(--color-primary);
  }
`;

const Breadcrumb = (prop) => {
  const { goHome } = prop;
  const { filter, updateFilter } = useContext(FilterContext);
  const { shop } = useContext(ShopContext);

  const home = () => {
    history.push('/');
    updateFilter({
      ...filter, label: '',
    });
    const baseUrl = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
    window.history.pushState({}, '', `${baseUrl}`);
  };
  return (
    <Row>
      <Grid cols="12">
        <Nav>
          <ol className="breadcrumb pl-0 mb-0">
            <li className="breadcrumb-item"><BreadcrumbButton onClick={e => goHome(e)} href="#">{shop.usuario}</BreadcrumbButton></li>
            <li>
              {filter && (
              <>
                {filter.search ? `/ resultados para: ${filter.search}` : (
                  <>
                    {filter.categoryName && (
                    <LinkCategories onClick={() => {
                      updateFilter({
                        ...filter,
                        label: '',
                        redirect: false,
                      });
                      home();
                    }}
                    >
                      {`/ ${filter.categoryName}`}
                    </LinkCategories>
                    )}
                    <LinkCategories>
                      {` / ${filter.label}`}
                    </LinkCategories>
                  </>
                )}
              </>
              )}

            </li>
          </ol>
        </Nav>
      </Grid>
    </Row>
  );
};

Breadcrumb.propTypes = { };

export default Breadcrumb;
