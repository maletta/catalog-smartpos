import 'babel-polyfill';
import 'url-search-params-polyfill';
import React, { useState, useEffect, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { injectIntl, intlShape } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import GridList from 'components/GridList';
import MainContainer from 'containers/mainContainer';
import SideBar from 'components/SideBar';
import NotFound from 'NotFound';
import Spinner from 'components/Spinner';
import Footer from 'components/Footer';
import Header from 'containers/Header';
import TextArea from 'components/Form/TextArea';
import SelectDropDown from 'components/Form/SelectDropDown';
import Button from 'components/Form/Button';

import getStoreName from 'getStoreName';
import FiltersMobile from 'components/FiltersMobile';
import formatFormErrors from 'utils/formatFormErrors';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faArrowRight, faArrowLeft,
  faCaretDown, faSlidersH, faSort, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF, faWhatsapp, faInstagram, faGooglePlay,
} from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import {
  getStoreInfo,
  getProducts,
  getCategories,
  getSearch,
} from 'requests';

import getVariantsOfProduct from 'api/variantsRequests';
import FilterContext from 'contexts/FilterContext';
import orderValidation from './orderSchema';

import initGA from './initGA';


library.add(faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope,
  faFacebookF, faTimes, faGooglePlay, faWhatsapp, faInstagram, faHeart,
  faArrowRight, faArrowLeft, faCaretDown, faSlidersH, faSort);

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  &&& {
    padding-top: 20px;

    @media (max-width: 768px) {
      padding-top: 12px;
    }
  }
`;

const AreaTitle = styled.div`
  background: #00529b;
  padding: 5px 20px 5px 20px;
  margin: -20px -19px 0 -20px;
  border-radius: 5px 5px 0 0;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  color: #FFF;
`;

const Content = styled.div`
  padding-top: 10px;
  width: 500px;
  
  @media (max-width: 992px) {
    width: 400px;
  }
  
  @media (max-width: 768px) {
    width: 300px;
  }
  
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Price = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const App = ({ intl }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [store, setStore] = useState({});
  const [maxPage, setMaxPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [productOnModal, setProductOnModal] = useState({});
  const [variants, setVariants] = useState([]);
  const { filter, updateFilter } = useContext(FilterContext);

  const initialValues = {
    variant: {},
    observacao: '',
  };

  const notFoundHandle = () => (loading ? (
    <Container>
      <Spinner />
    </Container>
  ) : !loading && (<NotFound />));

  const handlePagination = (data) => {
    updateFilter({ page: data.selected + 1 });
    setLoading(false);
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

  const getCategoryList = (data) => {
    getCategories(data.id)
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => setCategories())
      .finally(() => setLoading(false));
  };

  const getStore = () => {
    getStoreInfo(getStoreName())
      .then((response) => {
        document.title = response.data.fantasia;
        setStore({ ...response.data, found: true, storeName: getStoreName() });
        getProductList(response.data);
        getCategoryList(response.data);
      })
      .catch(() => {
        setStore({ found: false });
        setLoading(false);
      });
  };

  const prodArray = Object.keys(products).map(i => products[i]);

  useEffect(() => {
    yup.setLocale(formatFormErrors());
    window.scrollTo(0, 0);
    getStore();
    initGA();
  }, [filter]);


  const home = (e) => {
    if (e) { e.preventDefault(); }
    updateFilter({
      categoria: 0, label: 'Todas as categorias', page: 1, search: '',
    });
    const baseUrl = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
    window.history.pushState({}, '', `${baseUrl}`);
  };

  const handleOpenModal = (item) => {
    setProductOnModal(item);
    setModalOpen(true);
    getVariantsOfProduct(store.id, item.id).then((response) => {
      setVariants(response.data);
    });
  };

  const submitOrderItem = values => values;

  return (
    <>
      {store.found ? (
        <div>
          <Header codigo={store.codigo} goHome={() => home()} />
          <FiltersMobile
            categories={categories}
          />
          <Section className="section">
            <div className="container">
              <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li><a onClick={e => home(e)} href="!#">{ store.storeName }</a></li>
                  <li className="is-active"><a href="!#" aria-current="page">{filter.search ? `resultados para: ${filter.search}` : filter.label}</a></li>
                </ul>
              </nav>
              <MainContainer>
                <div className="column is-hidden-touch is-3-desktop">
                  <SideBar
                    categories={categories}
                    storeInfo={store}
                  />
                </div>
                <div className="column is-12-tablet is-9-desktop">
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
                </div>
              </MainContainer>
            </div>
          </Section>
          <Footer storeInfo={store} />
        </div>
      ) : (notFoundHandle())}
      <Modal
        open={modalOpen}
        styles={{
          modal: {
            borderRadius: '5px',
          },
          closeIcon: {
            fill: '#FFF',
            marginTop: '-8px',
            cursor: 'pointer',
          },
        }}
        onClose={() => setModalOpen(false)}
        center
      >
        <AreaTitle>
          <Title>{productOnModal.descricao}</Title>
        </AreaTitle>
        <Content>
          <Description>{productOnModal.observacao}</Description>
          <Price>{intl.formatNumber(productOnModal.valorVenda, { style: 'currency', currency: 'BRL' })}</Price>
          <Formik
            onSubmit={submitOrderItem}
            initialValues={initialValues}
            validationSchema={orderValidation(variants)}
            enableReinitialize
            render={propsForm => (
              <Form>
                <div className="">
                  {(variants.length > 0) && (
                  <div className="columns is-paddingless">
                    <div className="column is-12 is-mb-paddingless">
                      <SelectDropDown
                        id="variants"
                        label="Variações"
                        options={variants}
                        getOptionLabel={label => label.name}
                        getOptionValue={option => option.id}
                        onChange={value => propsForm.setFieldValue('variant', value)}
                        isInvalid={propsForm.errors.variant}
                        touched={propsForm.touched.variant}
                        isRequired
                      />
                    </div>
                  </div>
                  )}
                  <div className="columns is-paddingless">
                    <div className="column is-12">
                      <Field
                        name="observacao"
                        inputId="observacao"
                        component={TextArea}
                        label="Observação"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="columns is-paddingless">
                    <div className="column is-12">
                      <Button
                        value="Adicionar"
                        type="submit"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          />
        </Content>
      </Modal>
    </>
  );
};


App.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(App);
