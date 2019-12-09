import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FormattedPlural, injectIntl, intlShape } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';
import lodash from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';

import SelectDropDown from 'components/Form/SelectDropDown';
import ButtonPrice from 'components/Form/ButtonPrice';
import TextArea from 'components/Form/TextArea';
import Counter from 'components/Form/Counter';
import Row from 'components/Row';
import Grid from 'components/Grid';
import SideBar from 'components/SideBar';
import ShopContext from 'contexts/ShopContext';
import FilterContext from 'contexts/FilterContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import ItemModifiers from 'components/ItemModifiers';
import history from 'utils/history';
import orderValidation from './orderSchema';

import getInfoProduct from './requestProduct';
import NoImage from '../../assets/no-image.png';
import ClosedStore from '../../assets/closed-store.svg';

const Img = styled.img`
  width: 100%;
  border-radius: 5px;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  background: #fff;
  border-radius: 5px;
  padding-top: 15px;
  min-height: 50vh;

  @media (max-width: 576px) {
    min-height: 40vh;
  }
`;

const FooterContainer = styled.div`
  background: #fff;
  height: 75px;
  width: 100%;
  position: sticky;
  bottom: 0;
  border-radius: 0  0 5px 5px;
  box-shadow: 0 -3px 6px -3px #ababab;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #707070;
 
  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

const SubTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #707070;
  margin: 0 0 10px 0;
`;

const Price = styled.h3`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 15px;
  color: #707070;

  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const PriceFrom = styled.p`
  font-size: 0.9rem;
  text-align: left;
  margin-bottom: -8px;
  color: #707070;
`;

const LabelVariant = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ModifiersArea = styled.div`
  margin-bottom: 18px;
  transition: width 1s, height 4s;
`;

const ModifierHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin: 0 0 0 0;
`;

const ModifierTitle = styled.span`
  font-size: 1rem;
  line-height: 1.25em;
  font-weight: 600;
  color: #3f3e3e;
`;

const ModifierAmountTitle = styled.span`
  font-weight: 100;
  font-size: 0.875rem;
  line-height: 17px;
  display: block;
  color: #3f3e3e;
`;

const ModifierTitleRequired = styled.span`
  font-size: 0.8rem;
  background-color: ${props => (props.hasError ? ' #ff2323' : '#717171')};
  margin-right: 15px;
  color: #f5f0eb;
  border: none;
  padding: 6px 6px 4px;
  border-radius: 3px;
`;

const SocialIcon = styled.i`
  font-size: 2rem;
  color: #00529b;
  cursor: pointer;
`;

const SingleProduct = (props) => {
  const { intl } = props;
  const [product, setProduct] = useState({
    variants: [],
  });
  const [productPricing, setProductPricing] = useState({
    product: 0,
    modifiers: 0,
  });
  const [modifierSelected, setModifierSelected] = useState([]);
  const [variantSelected, setVariantSelected] = useState({ name: '' });
  const [modifiersErrors, setModifiersErrors] = useState([]);
  const [initialValues, setInitialValues] = useState({ quantity: 1, variant: {} });
  const [isLoaded, setLoaded] = useState(false);
  const [isProductFound, setProductFound] = useState(true);
  const { shop, categories } = useContext(ShopContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const { updateFilter } = useContext(FilterContext);
  const [image, setImage] = useState(NoImage);
  const completeURL = window.location.href;

  const sumProductPricing = (productPricing.product + productPricing.modifiers);

  const submitItem = (values, { resetForm, setSubmitting }) => {
    if (!shop.allowOrderOutsideBusinessHours && shop.closedNow) {
      setSubmitting(false);
      Swal.fire({
        title: `<div>
          <div><img src="${ClosedStore}"></div>
          <div><span class="foradohorario-titulo">Este estabelecimento abre entre ${shop.openHour.openHour} - ${shop.openHour.closeHour}.</span><div>
          <div><span class="foradohorario-texto">Você pode olhar o catálogo à vontade e fazer o pedido quando o estabelecimento estiver aberto.</span><div>
        </div>`,
        showConfirmButton: true,
        confirmButtonColor: '#F38A00',
        showCloseButton: true,
      }).then(() => setLoaded(false));
      return false;
    }
    const prevCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const newItem = {
      ...values,
      pricing: productPricing,
      modifiers: modifierSelected,
    };

    let newCart = [];
    let indexToUpdate = null;
    const repeat = prevCart.filter((item, index) => {
      indexToUpdate = index;
      return (lodash.isEqual(
        lodash.omit(item, ['quantity']),
        lodash.omit(newItem, ['quantity']),
      ));
    });

    if (repeat.length) {
      prevCart[indexToUpdate].quantity += values.quantity;
      newCart = prevCart;
    } else {
      newCart = [
        ...prevCart,
        newItem,
      ];
    }
    const basketCount = newCart.reduce((count, val) => (count + val.quantity), 0);
    updateShoppingCart({
      basketCount,
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    localStorage.setItem('cartInit', new Date().getTime());
    setTimeout(() => {
      history.push('/cart');
      resetForm({ quantity: 1, variant: {} });
    }, 1000);
    return false;
  };


  useEffect(() => {
    setLoaded(false);
    window.scrollTo(0, 0);
    const { params: { id } } = props.match;
    getInfoProduct(shop.id, id).then((response) => {
      setInitialValues({
        variant: {},
        note: '',
        quantity: 1,
        id: response.codigo,
        descricao: response.descricao,
        categoria: response.categoria,
        pricing: productPricing,
        viewMode: response.viewMode,
        atualizacao: response.atualizacao,
        uuid: uuidv1(),
      });
      updateFilter({ label: response.descricao });
      setProduct(response);
      setProductPricing({
        product: response.valorVenda,
        modifiers: 0,
      });
      setModifierSelected(prevState => ([...prevState, []]));
      if (response.codigo) {
        const imageBaseUrl = `${process.env.REACT_APP_IMG_API}product/${response.codigo}?lastUpdate${response.atualizacao}`;
        const img = new Image();
        img.src = imageBaseUrl;
        img.onload = () => {
          setImage(imageBaseUrl);
        };
      }

      response.modifiers.map(() => setModifierSelected(prevState => ([...prevState, []])));
      const modRequired = response.modifiers.map(item => item.required);
      setModifiersErrors(modRequired);
      setProductFound(true);
    })
      .catch(() => setProductFound(false))
      .finally(() => setLoaded(true));
  }, [false]);

  const renderSocialIcon = () => (
    <div style={{ width: '50%' }} className="d-flex justify-content-between">
      <FacebookShareButton url={completeURL}>
        <SocialIcon className="fab fa-facebook-square" />
      </FacebookShareButton>
      <TwitterShareButton url={completeURL}>
        <SocialIcon className="fab fa-twitter-square" />
      </TwitterShareButton>
      <WhatsappShareButton url={completeURL}>
        <SocialIcon className="fab fa-whatsapp-square" />
      </WhatsappShareButton>
      <EmailShareButton url={completeURL}>
        <SocialIcon className="fas fa-envelope-square" />
      </EmailShareButton>
    </div>
  );

  const hasModifiersErrors = modifiersErrors.filter(item => item);

  return (
    <>
      <Row>
        <Grid
          className="d-none d-md-block"
          cols="12 3 3 3 3"
        >
          <SideBar categories={categories} />
        </Grid>
        <Grid
          cols="12 12 9 9 9"
        >
          {(isProductFound) ? (
            <>
              <Formik
                onSubmit={submitItem}
                initialValues={initialValues}
                validationSchema={orderValidation(product.variants)}
                enableReinitialize
                render={propsForm => (
                  <Form style={{ width: '100%' }}>
                    <Container className="row d-flex">
                      <Grid
                        cols="12 6 6 6 6"
                        className="d-none d-md-block"
                      >
                        <Row>
                          <Grid cols="12" className="mb-3">
                            <Img src={image} title={product.descricao} alt="Produto" />
                          </Grid>
                          <Grid cols="12" className="mb-3">
                            <SubTitle className="mb-2">Compartilhe nas redes sociais</SubTitle>
                            {renderSocialIcon()}
                          </Grid>
                          {(product.longDescription) && (
                            <>
                              <Grid cols="12 mb-3">
                                <SubTitle>Descrição do item</SubTitle>
                              </Grid>
                              <Grid cols="12 mb-3">
                                <ReactQuill
                                  readOnly
                                  theme="snow"
                                  value={product.longDescription}
                                  enable={false}
                                  modules={{
                                    toolbar: [],
                                  }}
                                />
                              </Grid>
                            </>
                          )}
                        </Row>
                      </Grid>
                      <Grid cols="12 12 6 6 6">
                        <Row>
                          <Grid cols="5 6 6 6 6" className="d-md-none mb-3">
                            <Img src={image} title={product.descricao} alt="Produto" />
                          </Grid>
                          <Grid cols="7 6 12 12 12">
                            <Title className="test-name-product">{product.descricao}</Title>
                            {(product.hasVariant) && (<PriceFrom>a partir de </PriceFrom>)}
                            <Price className="test-price-product">{intl.formatNumber(sumProductPricing, { style: 'currency', currency: 'BRL' })}</Price>
                          </Grid>
                        </Row>
                        <Row>
                          <Grid cols="12">
                            {(product.variants.length > 0) && (
                              <SelectDropDown
                                id="variants"
                                label="Variações"
                                options={product.variants}
                                value={variantSelected}
                                getOptionLabel={label => (
                                  <LabelVariant>
                                    <div>{label.name}</div>
                                    {(label.sellValue) && (<div>{intl.formatNumber(label.sellValue, { style: 'currency', currency: 'BRL' })}</div>)}
                                  </LabelVariant>
                                )}
                                onChange={(value) => {
                                  propsForm.setFieldValue('variant', value);
                                  setVariantSelected({ name: value.name });
                                  propsForm.setFieldTouched('variant', true);
                                  setProductPricing(prevState => ({
                                    ...prevState,
                                    product: value.sellValue,
                                  }));
                                }}
                                getOptionValue={option => option.id}
                                isInvalid={propsForm.errors.variant}
                                touched={propsForm.touched.variant}
                                isRequired
                              />
                            )}
                            {(isLoaded) && (
                              <>
                                <ModifiersArea>
                                  {product.modifiers.map((mod, index) => {
                                    const hasError = modifiersErrors[index];
                                    return (
                                      <div key={mod.id}>
                                        <ModifierHeader>
                                          <div>
                                            <ModifierTitle
                                              hasError={hasError}
                                            >
                                              {mod.name}
                                            </ModifierTitle>
                                            <ModifierAmountTitle
                                              hasError={hasError}
                                            >
                                              {`Máximo ${mod.maxQuantity} `}
                                              <FormattedPlural
                                                value={mod.maxQuantity}
                                                one="opção"
                                                other="opções"
                                              />
                                            </ModifierAmountTitle>
                                          </div>
                                          {(mod.required) && (
                                            <div>
                                              <ModifierTitleRequired
                                                hasError={hasError}
                                              >
                                                {'Obrigatório'}
                                              </ModifierTitleRequired>
                                            </div>
                                          )}
                                        </ModifierHeader>
                                        <ul>
                                          <ItemModifiers
                                            modifier={mod}
                                            hasError={hasError}
                                            propsForm={propsForm}
                                            index={index}
                                            modifierSelected={modifierSelected}
                                            setProductPricing={setProductPricing}
                                            setModifierSelected={setModifierSelected}
                                            setModifiersErrors={setModifiersErrors}
                                            modifiersErrors={modifiersErrors}
                                          />
                                        </ul>
                                      </div>
                                    );
                                  })}
                                </ModifiersArea>
                                {(shop.is_enableOrder === 1) && (
                                  <div className="column is-mb-paddingless is-12 is-mb-paddingless">
                                    <Field
                                      name="note"
                                      inputId="observacao"
                                      component={TextArea}
                                      label="Observação"
                                      autoFocus={false}
                                      rows={3}
                                    />
                                  </div>
                                )}
                              </>
                            )}
                          </Grid>
                          <Grid cols="12" className="d-md-none mb-3">
                            <SubTitle>Compartilhe nas redes sociais</SubTitle>
                            {renderSocialIcon()}
                          </Grid>
                          {(product.longDescription) && (
                            <>
                              <Grid cols="12" className="d-md-none">
                                <SubTitle>Descrição do item</SubTitle>
                              </Grid>
                              <Grid cols="12" className="d-md-none mb-3">
                                <ReactQuill
                                  readOnly
                                  theme="snow"
                                  value={product.longDescription}
                                  enable={false}
                                  modules={{
                                    toolbar: [],
                                  }}
                                />
                              </Grid>
                            </>
                          )}
                        </Row>
                      </Grid>
                      {(shop.is_enableOrder === 1) && (
                        <FooterContainer>
                          <div className="d-flex justify-content-end">
                            <Grid cols="12 12 12 6 6">
                              <Row>
                                <Grid
                                  cols="5"
                                  className="d-flex justify-content-center align-items-center"
                                >
                                  <div>
                                    <Counter
                                      limit={100}
                                      min={1}
                                      value={1}
                                      counter={(value) => {
                                        propsForm.setFieldValue('quantity', value);
                                      }}
                                    />
                                  </div>
                                </Grid>
                                <Grid
                                  cols="7"
                                  className="d-flex justify-content-center align-items-end"
                                >
                                  <div>
                                    <ButtonPrice
                                      value="ADICIONAR"
                                      price={intl.formatNumber((propsForm.values.quantity * sumProductPricing), { style: 'currency', currency: 'BRL' })}
                                      type="submit"
                                      disabled={(hasModifiersErrors.length > 0)}
                                      isLoading={propsForm.isSubmitting}
                                    />
                                  </div>
                                </Grid>
                              </Row>
                            </Grid>
                          </div>
                        </FooterContainer>
                      )}
                    </Container>
                  </Form>
                )}
              />
            </>
          ) : (
            <>O produto que você procura não foi encontrado!</>
          )}
        </Grid>
      </Row>
    </>
  );
};

SingleProduct.propTypes = {
  match: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(SingleProduct);
