import React, { useContext } from 'react';
import Grid from 'components/Grid';
import Row from 'components/Row';
import styled from 'styled-components';

import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';

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
  const { filter } = useContext(FilterContext);
  const { shop } = useContext(ShopContext);

  return (
    <Row>
      <Grid cols="12">
        <Nav>
          <ol className="breadcrumb pl-0 mb-0">
            <li className="breadcrumb-item"><BreadcrumbButton onClick={e => goHome(e)} href="#">{shop.usuario}</BreadcrumbButton></li>
            <li>
              {filter.search ? `/ resultados para: ${filter.search}` : (
                <LinkCategories>
                  {`/ ${filter.label}`}
                </LinkCategories>
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
