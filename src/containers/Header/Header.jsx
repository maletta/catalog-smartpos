import React, { useContext, useState } from 'react';
import ReactGA from 'react-ga';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import FilterContext from 'contexts/FilterContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import history from 'utils/history';

const Container = styled.nav`
  padding-top: 5px;
  padding-bottom: 8px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);

  &&& {
    background: #00529b;
  }
`;

const Field = styled.div`
  justify-content: center;
  padding-top: 15px;
  width: 70%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;
const Logo = styled.div`
  margin: 0;
  width: 70px;
  padding-top: 10px;
  cursor: pointer;

  @media (max-width: 376px) {
    margin-left: 8px;
  }
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Colums = styled.div`
  &&& {
    margin-right: 0;
  }
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

const CartArea = styled.div`
  padding-top: 23px;
`;

const CartIcon = styled.i`
  cursor: pointer;
  position: relative;
  color: #fff;
  font-size: 1.5rem;
`;

const CartCounter = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  top: -30px;
  right: -25px;
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


const Header = (props) => {
  const { updateFilter } = useContext(FilterContext);
  const { codigo, goHome } = props;
  const [search, setSearch] = useState('');
  const { shoppingCart } = useContext(ShoppingCartContext);
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}store/${codigo}`;
  const submit = (e) => {
    e.preventDefault();
    if (search) {
      ReactGA.event({
        category: 'HEADER',
        action: 'SEARCH',
        label: search,
      });
      updateFilter({
        search, page: 1, categoria: 0, label: '',
      });
    }
    setSearch('');
    const baseUrl = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
    window.history.pushState({}, '', `${baseUrl}?search=${search}`);
  };

  return (
    <>
      <Container className="navb9ar">
        <div className="container">
          <Colums className="columns is-mobile is-paddingless">
            <div className="column is-3-mobile is-2-tablet is-3-desktop is-3-fullhd is-flex justify-content-center">
              <Logo
                className=""
                onClick={() => goHome()}
              >
                <div>
                  <LogoImage src={imageBaseUrl} alt="Logo" />
                </div>
              </Logo>
            </div>
            <div className="column is-7-mobile is-8-tablet is-8-desktop is-8-fullhd is-flex justify-content-center">
              <Field className="">
                <form onSubmit={e => submit(e)}>
                  <Search>
                    <SearchInput
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Buscar produtos, marcas e muito mais…"
                      type="text"
                      name="search"
                    />
                    <SearchButton type="submit"><i className="fa fa-search" /></SearchButton>
                  </Search>
                </form>
              </Field>
            </div>
            <div className="column is-2-mobile is-2-tablet is-1-desktop is-1-fullhd">
              <CartArea>
                <CartIcon
                  onClick={() => {
                    history.push('/cart');
                  }}
                  className="fa fa-shopping-cart"
                >
                  <CartCounter
                    count={shoppingCart.basketCount}
                  >
                    {shoppingCart.basketCount}
                  </CartCounter>
                </CartIcon>
              </CartArea>
            </div>
          </Colums>
        </div>
      </Container>

    </>
  );
};

Header.propTypes = {
  codigo: PropTypes.number.isRequired,
  goHome: PropTypes.func.isRequired,
};

export default Header;
