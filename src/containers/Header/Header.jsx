import React, { useContext, useState } from 'react';
import ReactGA from 'react-ga';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Grid from 'components/Grid';
import FiltersMobile from 'components/FiltersMobile';

import FilterContext from 'contexts/FilterContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import history from 'utils/history';
import paths from 'paths';
import ShopContext from 'contexts/ShopContext';

const Container = styled.nav`
  padding-top: 5px;
  padding-bottom: 8px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding-bottom: 0;
  }

  &&& {
    background: var(--color-header);
  }
`;

const AreaMenu = styled.div`
  padding: 10px 0 10px 0;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Field = styled.div`
  justify-content: center;
  width: 80%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Logo = styled.div`
  margin: 0;
  cursor: pointer;
  height: 50px;

  @media (max-width: 376px) {
    margin-left: 8px;
  }
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Search = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

const SearchInput = styled.input`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  width: 100%;
  height: 36px;
  border: 2px solid white;
  border-right: none;
  padding: 5px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: black;
`;

const SearchButton = styled.button`
  width: 40px;
  height: 36px;
  border: 2px solid white;
  background: white;
  text-align: center;
  color: black;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

const CartIcon = styled.i`
  cursor: pointer;
  position: relative;
  color: #fff;
  font-size: 1.5rem;
  top: 9px;
`;

const CartCounter = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  top: -30px;
  right: -20px;
  color: #fff;
  background: #dc0300;
  border-radius: 50%;
  padding: 4px;
  line-height: 13px;
  font-size: 11px;
  text-align: center;
  box-sizing: border-box;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  transform: scale(0);
  animation-delay: 3s;
  ${props => (props.count > 0) && css`
    animation-name: scale;
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease;
  `}
  @keyframes scale {
    0% { transform: scale(1); }
    50% { transform: scale(1.6); }
    100% { transform: scale(1); }
  }
`;

const StoreNameArea = styled.div`
  color: white;
  margin-left: 15px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Fantasia = styled.span`
  font-size: 18px;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Whatsapp = styled.span`
  font-size: 12px;
`;

const Header = ({ goHome, store }) => {
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { updateFilter } = useContext(FilterContext);
  const { shop } = useContext(ShopContext);
  const [search, setSearch] = useState('');
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}/store/${store.codigo}?lastUpdate=${store.atualizacao}`;

  const onSubmit = (e) => {
    e.preventDefault();

    if (search) {
      ReactGA.event({
        category: 'HEADER',
        action: 'SEARCH',
        label: search,
      });

      history.push(paths.home);
      updateFilter({
        search, page: 1, categoria: 0, label: '', categoryName: '',
      });
    }

    setSearch('');
    const { origin, pathname } = window.location;
    window.history.pushState({}, '', `${origin}${pathname}?search=${search}`);
  };

  const formatPhoneNumber = (number = '') => {
    if (number === '') return '';
    const ddd = number.slice(0, 2);
    const phone = number.slice(2);
    return `(${ddd}) ${phone}`;
  };

  const onClickCartIcon = () => {
    updateShoppingCart({ cardOverlay: true });
  };

  const onChangeSearch = ({ target }) => {
    setSearch(target.value);
  };

  const cartBasketCount = shoppingCart.basketCount;

  return (
    <Container className="fixed-top">
      <AreaMenu
        className="container"
      >
        <Row>
          <Grid
            cols="2 3 3 3 3"
            className="d-flex align-items-center justify-content-center"
          >
            <Logo onClick={goHome}>
              <LogoImage src={imageBaseUrl} alt="Logo" />
            </Logo>
            <StoreNameArea>
              <Fantasia>
                {store.storeName}
              </Fantasia>
              <Whatsapp>
                {formatPhoneNumber(store ? store.whatsapp : '')}
              </Whatsapp>
            </StoreNameArea>
          </Grid>
          <Grid
            cols="8 7 7 7 8"
            className="d-flex justify-content-center align-items-center"
          >
            <Field>
              <form onSubmit={onSubmit}>
                <Search>
                  <SearchInput
                    value={search}
                    onChange={onChangeSearch}
                    placeholder="Buscar produtos, marcas e muito mais…"
                    name="search"
                  />
                  <SearchButton type="submit">
                    <i className="fa fa-search" />
                  </SearchButton>
                </Search>
              </form>
            </Field>
          </Grid>
          <Grid
            className="d-flex align-items-center justify-content-center"
            cols="2 2 2 2 1"
          >
            <div>
              {shop.is_enableOrder ? (
                <CartIcon
                  onClick={onClickCartIcon}
                  className="fa fa-shopping-cart"
                >
                  <CartCounter count={cartBasketCount}>
                    {cartBasketCount}
                  </CartCounter>
                </CartIcon>
              ) : null}
            </div>
          </Grid>
        </Row>
      </AreaMenu>
      {history.location.pathname !== '/checkout' && <FiltersMobile />}
    </Container>
  );
};

Header.propTypes = {
  goHome: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

export default Header;
