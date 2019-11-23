import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


import Row from 'components/Row';
import Grid from 'components/Grid';
import SideBar from 'components/SideBar';
import ShopContext from 'contexts/ShopContext';

import getInfoProduct from './requestProduct';
import NoImage from '../../assets/no-image.png';

const Img = styled.img`
  width: 100%;
  border-radius: 5px 5px 0 0;
`;

const Container = styled.div`
  background: #fff;
  border-radius: 5px;
  padding-bottom: 15px;
`;

const SingleProduct = (props) => {
  const [product, setProduct] = useState([]);
  const { shop, categories } = useContext(ShopContext);
  const [image, setImage] = useState(NoImage);
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}product/${product.codigo}?lastUpdate`;

  const img = new Image();
  img.src = imageBaseUrl;

  img.onload = () => {
    setImage(imageBaseUrl);
  };

  useEffect(() => {
    const { params: { id } } = props.match;
    getInfoProduct(shop.id, id).then((response) => {
      setProduct(response);
    });
  }, [false]);

  return (
    <>
      <Row>
        <Grid
          className="d-none d-md-block"
          cols="12 3 3 3 3"
        >
          <SideBar categories={categories} />
        </Grid>
        <Container
          className="col col-12 col-sm-3 col-md-3 col-lg-3 col-xl-9"
        >
          <Row>
            <Grid cols="12 3 3 6 6">
              <Img src={image} title={product.descricao} alt="Produto" />
            </Grid>
            <Grid cols="12 3 3 6 6">
              {product.descricao}
            </Grid>
          </Row>
        </Container>
      </Row>
    </>
  );
};

SingleProduct.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default SingleProduct;
