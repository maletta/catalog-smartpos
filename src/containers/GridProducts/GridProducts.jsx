import React, { useState, useContext, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import * as yup from 'yup';

import GridList from 'components/GridList';
import Spinner from 'components/Spinner';
import ModalOrderItem from 'components/ModalOrderItem';
import Row from 'components/Row';
import Grid from 'components/Grid';
import SideBar from 'components/SideBar';
import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';

import { getCategories, getProducts, getSearch } from 'requests';

import formatFormErrors from 'utils/formatFormErrors';
import initGA from 'initGA';

const GridProducts = () => {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [products, setProducts] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [productOnModal, setProductOnModal] = useState({});
  const [maxPage, setMaxPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [store] = useState({});
  const { filter, updateFilter } = useContext(FilterContext);
  const { shop } = useContext(ShopContext);

  const prodArray = Object.keys(products).map(i => products[i]);

  const getCategoryList = (data) => {
    getCategories(data.id)
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => setCategories([]));
  };

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
        }).finally(() => setLoading(false));
    }
    return getProducts(data, filter)
      .then((response) => {
        setProducts(response.data.produtos);
        setMaxPage(response.data.totalPages);
      })
      .catch(() => {
        setNotFound(true);
        setProducts({});
        setMaxPage(-1);
      }).finally(() => setLoading(false));
  };

  const handleOpenModal = (item) => {
    setProductOnModal(item);
    setModalOpen(true);
  };

  const handlePagination = (data) => {
    updateFilter({ page: data.selected + 1 });
  };

  useEffect(() => {
    getCategoryList(shop);
  }, [false]);

  useEffect(() => {
    setProducts([]);
    setNotFound(false);
    yup.setLocale(formatFormErrors());
    getProductList(shop);
    window.scrollTo(0, 0);
    initGA();
  }, [filter.categoria]);

  return (
    <>
      <Row>
        <Grid
          className="d-none d-md-block"
          cols="12 3 3 3 3"
        >
          <SideBar
            categories={categories}
            storeInfo={store}
          />
        </Grid>
        {(!loading) ? (
          <Grid cols="12 12 9 9 9">
            <GridList
              itens={prodArray}
              notFound={notFound}
              enableOrder={shop.is_enableOrder}
              openModal={handleOpenModal}
            />
            {(prodArray.length > 1 && maxPage > 1) && (
              <Row className="d-flex align-items-center justify-content-center">
                <ReactPaginate
                  previousLabel="Anterior"
                  nextLabel="Próxima"
                  breakLabel="..."
                  breakClassName="break-me"
                  pageCount={maxPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={() => handlePagination()}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  activeClassName="active"
                  forcePage={(filter.page ? filter.page - 1 : 0)}
                />
              </Row>
            )}
          </Grid>
        ) : (
          <Grid
            cols="12 9 9 9 9"
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner />
          </Grid>
        )}
      </Row>
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
