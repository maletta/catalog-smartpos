import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FilterContext from 'contexts/FilterContext';

const Container = styled.nav` 
  padding-top: 5px;
  padding-bottom: 8px;

  &&& {
    background: #00529b;
  }
`;

const Field = styled.div`
  padding-top: 8px;
  margin-left: 120px;
  width: 450px;

  @media (max-width: 800px) {
    width: 300px;
    margin-left: 40px;
  }

  @media (max-width: 375px) {
    margin-left: 0;
    width: 200px;
  }
`;

const Input = styled.input`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  padding: 6px 6px 6px 35px;
  border-radius: 2px;
  width: 100%;
  color: #333;
  font-size: 16px;
  outline: 0;
  border: none;
  position: relative;
  box-sizing: border-box;
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


const Header = (props) => {
  const { codigo } = props;
  const { updateFilter } = useContext(FilterContext);

  const home = () => {
    updateFilter({ page: 1, categoria: 0 });
  };

  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}store/${codigo}`;

  return (

    <>
      <Container className="navbar">
        <div className="container">
          <Colums className="columns is-mobile">
            <div className="column is-3">
              <Logo onClick={() => home()}>
                <LogoImage src={imageBaseUrl} alt="Logo" />
              </Logo>
            </div>

            <div className="column">
              <Field>
                <div className="navbar-item">
                  <Input placeholder="Buscar produtos, marcas e muito mais…" />
                </div>
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
};

export default Header;
