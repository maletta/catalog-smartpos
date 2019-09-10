import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import * as yup from 'yup';

import GridList from 'components/GridList';
import Spinner from 'components/Spinner';
import ModalOrderItem from 'components/ModalOrderItem';
import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';

import { getProducts, getSearch } from 'requests';

import formatFormErrors from 'utils/formatFormErrors';
import initGA from 'initGA';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [productOnModal, setProductOnModal] = useState({});
  const [maxPage, setMaxPage] = useState(1);
  const { filter, updateFilter } = useContext(FilterContext);
  const { shop } = useContext(ShopContext);

  const prodArray = Object.keys(products).map(i => products[i]);

  const getProductList = (data) => {
    setLoading(true);
    if (filter.search) {
      return getSearch(data.id, filter)
        .then((response) => {
          setProducts(response.data.produtos);
          setMaxPage(response.data.totalPages);
        })
        .catch(() => {
          setProducts({});
          setMaxPage(-1);
        })
        .finally(() => setLoading(false));
    }
    return getProducts(data, filter)
      .then((response) => {
        setProducts(response.data.produtos);
        setMaxPage(response.data.totalPages);
      })
      .catch(() => {
        setProducts({});
        setMaxPage(-1);
      })
      .finally(() => setLoading(false));
  };

  const handleOpenModal = (item) => {
    setProductOnModal(item);
    setModalOpen(true);
  };

  const handlePagination = (data) => {
    updateFilter({ page: data.selected + 1 });
    setLoading(false);
  };

  useEffect(() => {
    yup.setLocale(formatFormErrors());
    getProductList(shop);
    window.scrollTo(0, 0);
    initGA();
  }, [shop]);

  return (
    <>
      {loading ? (
        <Container>
          <Spinner />
        </Container>
      ) : (
        <GridList
          itens={prodArray}
          loading={loading}
          openModal={handleOpenModal}
        />
      )}
      {(prodArray.length > 1 && maxPage > 1) && (
        <ReactPaginate
          previousLabel="Anterior"
          nextLabel="Próxima"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={maxPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePagination}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
          forcePage={(filter.page ? filter.page - 1 : 0)}
        />
      )}
      <ModalOrderItem
        productOnModal={productOnModal}
        setProductOnModal={setProductOnModal}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        storeId={shop.id}
      />
    </>
  );
};

GridProducts.propTypes = {

};

GridProducts.defaultProps = {

};

export default GridProducts;
