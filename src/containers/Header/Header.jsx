import React, { useContext, useState } from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FilterContext from 'contexts/FilterContext';

const Container = styled.nav`
  padding-top: 5px;
  padding-bottom: 8px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);

  &&& {
    background: #00529b;
  }
`;

const Field = styled.div`
  padding-top: 8px;
  margin-left: 120px;
  width: 450px;

  @media (max-width: 800px) {
    width: 100%;
    margin-left: 20px;
  }

  @media (max-width: 375px) {
    margin-left: 0;
  }
`;
const Logo = styled.div`
  margin: 0;
  width: 70px;
  padding-left: 15px;
  padding-top: 8px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 100%;

  @media (max-width: 360px) {
    width: 45px;
  }
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


const Header = (props) => {
  const { updateFilter } = useContext(FilterContext);
  const { codigo, goHome } = props;
  const [search, setSearch] = useState('');
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
      <Container className="navbar">
        <div className="container">
          <Colums className="columns is-mobile">
            <div className="column is-2 is-3-desktop">
              <Logo onClick={() => goHome()}>
                <LogoImage src={imageBaseUrl} alt="Logo" />
              </Logo>
            </div>

            <div className="column is-9">
              <Field>
                <form className="navbar-item" onSubmit={e => submit(e)}>
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
