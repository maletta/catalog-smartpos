import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Grid from 'components/Grid';
import Row from 'components/Row';
import styled from 'styled-components';
import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import paths from 'paths';
// import history from 'utils/history';

const Nav = styled.nav`
  &&& {
    background: transparent;
  }
`;

const BreadcrumbButton = styled.span`
  align-items: center;
  color: var(--links-secondary);
  display: flex;
  justify-content: center;
  padding: 0 0.75em;
  cursor: pointer;
`;

const LinkCategories = styled.span`
  cursor: pointer;

  :hover {
    color: var(--links-secondary);
  }
`;

const Breadcrumb = ({ goHome }) => {
  const { filter, updateFilter } = useContext(FilterContext);
  const { shop } = useContext(ShopContext);
  const router = useRouter();
  const { search, origin, pathname } = window.location;
  const parsed = queryString.parse(search) || '';
  const isCart = pathname.includes('carrinho');
  const isCheckout = pathname.includes('checkout');
  const isOrder = pathname.includes('pedido');
  const filterCategoryName = filter.categoryName;

  const isNotFinishingPurchase = !(isCart || isCheckout || isOrder);

  const goTo = () => {
    router.push(paths.home);

    updateFilter({
      ...filter,
      label: '',
      redirect: false,
    });

    window.history.pushState(
      {},
      '',
      `${origin}${pathname}?categoria=${filter.categoria}&nome=${filterCategoryName}`,
    );
  };

  const FilterList = () => {
    if (filter.search) return `/ resultados para: ${filter.search}`;

    const parsedName = parsed.nome;
    const filterLabel = filter.label;
    const showCategoryName = (parsedName || filterCategoryName) ? `${filterCategoryName}` : '';
    const showAllCategoriesText = (parsedName === undefined && filterCategoryName === '') ? 'Todas as categorias' : '';
    const showFilterLabel = filterLabel ? ` ${filterLabel} ` : '';

    return (
      <>
        {isNotFinishingPurchase && (
          <LinkCategories onClick={goTo}>
            {showCategoryName}
            {showAllCategoriesText}
          </LinkCategories>
        )}
        <LinkCategories>
          {(isNotFinishingPurchase && filterLabel && (!parsedName || filterCategoryName)) && ' /'}
          {showFilterLabel}
        </LinkCategories>
      </>
    );
  };

  return (
    <Row>
      <Grid cols="12">
        <Nav>
          <ol className="breadcrumb pl-0 mb-0">
            <li className="breadcrumb-item">
              <BreadcrumbButton onClick={goHome}>
                {`${shop.usuario} /`}
              </BreadcrumbButton>
            </li>
            <li>
              {filter && <FilterList />}
            </li>
          </ol>
        </Nav>
      </Grid>
    </Row>
  );
};

Breadcrumb.propTypes = {
  goHome: PropTypes.func.isRequired,
};

export default Breadcrumb;
