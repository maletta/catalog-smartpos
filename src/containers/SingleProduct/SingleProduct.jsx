import React, { useState, useContext, useEffect } from 'react';
import useRouterHook from 'utils/useRouterHook';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';
import { Formik, Form, Field } from 'formik';
import uuidv1 from 'uuid/v1';
import lodash from 'lodash';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
// import paths from 'paths';
import formatCurrency from 'utils/formatCurrency';
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
import { getCategories } from 'requests';
import ReactImageMagnify from 'react-image-magnify';
// import NoImage from 'assets/no-image.png';
import ArrowLeft from 'assets/arrow-left.svg';
import ArrowRight from 'assets/arrow-right.svg';
import Modal from 'components/Modal/Modal';
import orderValidation from './orderSchema';
import getInfoProduct from './requestProduct';
import LoadingSpinner from './components/LoadingSpinner';
import ProductNotFoundMessage from './components/ProductNotFoundMessage';
import ShareIcons from './components/ShareIcons';
import Arrow from './components/Arrow';

import { showStoreIsClosedModal } from '../Cart/components/cartFooterModal';

const Img = styled.img`
  width: 100%;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const ModalImg = styled.img`
  width: 100%;
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
  margin-top: 20px;
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
  align-items: flex-start;
`;

const LabelVariantValues = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
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

const Unavailable = styled.p`
  color: #333;
  font-size: 0.8rem;
  text-align: left;
  margin: 0;
`;

const Carousel = styled.div`
  padding: 0 30px;

  @media (max-width: 576px) {
    padding: 0 0;
  }
`;

const CodCategory = styled.span`
  font-size: 14px;
  color: #989696;
  margin-top: -5px;
`;

const IconFlecha = styled.div`
  height: 80px;

  @media (max-width: 576px) {
    height: 60px;
    right: 20px;
  }

  background-color: #a9a8a8;
  color: white;
  border-radius: 3px;
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
  opacity: 0.7;
`;

const Flecha = styled.img`
  width: 25px;

  @media (max-width: 576px) {
    width: 15px;
  }
`;

const ImageBelow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  justify-content: center;

  @media (max-width: 576px) {
    display: none;
  }
`;

const SmallThumb = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  justify-content: center;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Thumb = styled.div`
  margin-right: 10px;
  max-width: 100px;
  padding: 0;
  display: flex;
  flex: 1;
  cursor: pointer;
  ${props => props.IsActive && ('box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);')}
`;

const AreaModal = styled.div`
  width: 550px;

  @media (max-width: 660px) {
    width: 450px;
  }

  @media (max-width: 576px) {
    width: 250px;
  }

  @media (max-width: 420px) {
    width: 180px;
    padding-top: 20px;
  }
`;

const Page = styled.div`
  font-size: 1rem;
  color: #a9a8a8;
  opacity: 1;
  text-align: center;
`;

const Fluid = styled.div`
  width: auto;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const Portal = styled.div`
  position: absolute;
  z-index: 500;
`;

const VariantContainer = styled.div`
  display: flex;
  font-weight: 600;
`;

const SingleProduct = () => {
  const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  });
  const router = useRouterHook();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 10;
  const [product, setProduct] = useState({
    variants: [],
    hasVariant: true,
    images: [],
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
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { filter, updateFilter } = useContext(FilterContext);
  const NoImage = 'assets/no-image.png';
  const [image, setImage] = useState(NoImage);

  const sumProductPricing = productPricing.product + productPricing.modifiers;
  const submitItem = (values, { setSubmitting }) => {
    updateFilter({
      ...filter,
      categoryName: '',
    });

    setSubmitting(false);

    if (!shop.customerCanOrder) {
      showStoreIsClosedModal(shop.openHours[moment().day()], router);
      return;
    }

    const prevCart = lodash.cloneDeep(shoppingCart.cart);
    const newItem = {
      ...values,
      pricing: productPricing,
      modifiers: modifierSelected,
    };

    let cart = [];
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
      cart = prevCart;
    } else {
      cart = [
        ...prevCart,
        newItem,
      ];
    }

    localStorage.setItem('cartInit', new Date().getTime());

    updateShoppingCart({ cart, cardOverlay: true });
  };

  useEffect(() => {
    const { query: { id } } = router;
    setLoaded(false);
    window.scrollTo(0, 0);
    // const { params: { id } } = props.match;

    getInfoProduct(shop.id, id)
      .then((response) => {
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
          image: [],
        });

        getCategories(response.tenant_id)
          .then((res) => {
            const category = res.data.find(r => r.id === response.codcategoria);
            updateFilter({
              label: response.descricao,
              categoryName: category.descricao,
              categoria: category.id,
            });
          });

        setProduct(response);
        setProductPricing({
          product: response.valorVenda,
          modifiers: 0,
        });
        setModifierSelected([...modifierSelected, []]);

        if (response.codigo) {
          const imageBaseUrl = `${process.env.NEXT_PUBLIC_IMG_API}product/${response.codigo}?lastUpdate${response.atualizacao}`;
          const img = new Image();
          img.src = imageBaseUrl;

          img.onload = () => {
            setImage(imageBaseUrl);
          };
        }

        response.modifiers.map(() => setModifierSelected([...modifierSelected, []]));
        const modRequired = response.modifiers.map(item => item.required);
        setModifiersErrors(modRequired);
        setProductFound(true);
      })
      .catch(() => setProductFound(false))
      .finally(() => setLoaded(true));
    // eslint-disable-next-line
  }, []);

  const hasModifiersErrors = modifiersErrors.filter(item => item);
  const haveStock = () => {
    if (product.noStock && !product.hasVariant) {
      return true;
    }

    if (product.Estoque && product.Estoque.quantidade > 0) {
      return true;
    }
    return false;
  };

  const haveStockVariant = (variant) => {
    const { noStock, Estoque } = variant;
    if (noStock) {
      return true;
    }
    if (Estoque && Estoque.quantidade > 0) {
      return true;
    }
    return false;
  };

  const enableOrderButton = () => {
    const availableVariants = product.variants.filter(item => haveStockVariant(item));

    if (!shop.is_enableOrder) {
      return false;
    }

    if (product.catalogStock === 'ALL') {
      return true;
    }

    if (product.catalogStock === 'ONLY_STOCK') {
      if (haveStock() || availableVariants.length) {
        return true;
      }

      setProductFound(false);
      return false;
    }

    if (product.catalogStock === 'UNAVAILABLE') {
      return haveStock() || availableVariants.length > 0;
    }

    return false;
  };

  const renderOptionLabel = (values) => {
    let temp = null;
    if (values.catalogStock === 'UNAVAILABLE') {
      const div = <div style={{ width: 'auto', marginLeft: '10px' }}>Item indisponível</div>;
      temp = haveStockVariant(values) || div;
    }

    return (
      <LabelVariant>
        <LabelVariantValues>
          <div>{values.name}</div>
          {values.sellValue
            && (
              <VariantContainer>
                {formatCurrency(values.sellValue)}
                {temp}
              </VariantContainer>
            )}
        </LabelVariantValues>
      </LabelVariant>
    );
  };
  const [propsModal, setPropsModal] = useState({
    isOpen: false,
    urlPhoto: null,
  });
  const arrowModal = arrow => (
    <IconFlecha>
      {arrow === 'left' && <Flecha alt="arrow" src={ArrowLeft} />}
      {arrow === 'right' && <Flecha alt="arrow" src={ArrowRight} />}
    </IconFlecha>
  );

  const modal = () => (propsModal.isOpen && (
    <Modal
      onClose={() => setPropsModal({ isOpen: false, urlPhoto: null })}
    >
      <AreaModal>
        <Carousel>
          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={1}
            leftChevron={arrowModal('left')}
            rightChevron={arrowModal('right')}
            outsideChevron
            chevronWidth={70}
          >
            <ModalImg
              src={image}
              title={product.descricao}
              alt="Produto"
            />
            {product.images && (
              product.images !== 'notFound' && ((product.images).map(img => (
                <ModalImg
                  src={`${process.env.NEXT_PUBLIC_IMG_API}${img.key}`}
                  title={product.descricao}
                  alt="Produto"
                />
              )))
            )}
          </ItemsCarousel>
          <Page>
            {(Array.isArray(product.images)) && (
              `${activeItemIndex + 1}/${product.images.length + 1}`
            )}
          </Page>
          <ImageBelow>
            {product.images && (
              <>
                {product.images !== 'notFound' && (
                  <Thumb IsActive={activeItemIndex === 0}>
                    <Img onClick={() => setActiveItemIndex(0)} src={image} title={product.descricao} alt="Produto" />
                  </Thumb>
                )}
                {product.images !== 'notFound' && ((product.images).map((img, index) => (
                  <Thumb IsActive={activeItemIndex === index + 1}>
                    <Img onClick={() => setActiveItemIndex(index + 1)} src={`${process.env.NEXT_PUBLIC_IMG_API}${img.key}`} title={product.descricao} alt="Produto" />
                  </Thumb>
                )))}
              </>
            )}
          </ImageBelow>
        </Carousel>
      </AreaModal>
    </Modal>
  ));
  const renderImage = () => (

    <>
      {product.images && product.images !== 'notFound' ? (
        <Carousel>
          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={1}
            leftChevron={<Arrow direction="left" />}
            rightChevron={<Arrow direction="right" />}
            outsideChevron
            chevronWidth={chevronWidth}
          >
            <Fluid
              onClick={() => setPropsModal({
                urlPhoto: image,
                isOpen: true,
              })}
            >
              <ReactImageMagnify
                enlargedImagePortalId="portalarea"
                {...{
                  smallImage: {
                    isFluidWidth: true,
                    src: image,
                    title: product.descricao,
                    alt: 'Produto',
                  },
                  largeImage: {
                    src: image,
                    width: 1200,
                    height: 1200,
                  },
                  imageStyle: {
                    margin: '1px',
                  },
                  lensStyle: { backgroundColor: 'rgba(0, 0, 0, .6)' },
                }}
              />
            </Fluid>
            {product.images && (
              product.images !== 'notFound' && ((product.images).map(img => (
                <>
                  <Fluid
                    onClick={() => setPropsModal({
                      urlPhoto: `${process.env.NEXT_PUBLIC_IMG_API}${img.key}`,
                      isOpen: true,
                    })}
                  >
                    <ReactImageMagnify
                      enlargedImagePortalId="portalarea"
                      {...{
                        smallImage: {
                          isFluidWidth: true,
                          src: `${process.env.NEXT_PUBLIC_IMG_API}${img.key}`,
                          title: product.descricao,
                          alt: 'Produto',
                        },
                        largeImage: {
                          src: `${process.env.NEXT_PUBLIC_IMG_API}${img.key}`,
                          width: 1200,
                          height: 1200,
                        },
                        lensStyle: { backgroundColor: 'rgba(0, 0, 0, .6)' },
                      }}
                    />
                  </Fluid>
                </>
              )))
            )}
          </ItemsCarousel>
        </Carousel>
      ) : (
        <Fluid
          onClick={() => setPropsModal({
            urlPhoto: image,
            isOpen: true,
          })}
        >
          <ReactImageMagnify
            enlargedImagePortalId="portalarea"
            {...{
              smallImage: {
                isFluidWidth: true,
                src: image,
                title: product.descricao,
                alt: 'Produto',
              },
              largeImage: {
                src: image,
                width: 1200,
                height: 1200,
              },
              lensStyle: { backgroundColor: 'rgba(0, 0, 0, .6)' },
            }}
          />
        </Fluid>
      )}
    </>
  );

  return (
    <>
      {modal()}
      <Row>
        <Grid
          className="d-none d-md-block"
          cols="12 3 3 3 3"
        >
          <SideBar categories={categories} />
        </Grid>
        <Grid cols="12 12 9 9 9">
          {isLoaded ? (
            <>
              {isProductFound ? (
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
                                {renderImage()}
                                <SmallThumb>
                                  {product.images && (
                                    <>
                                      {product.images !== 'notFound' && (
                                        <Thumb IsActive={activeItemIndex === 0}>
                                          <Img onClick={() => setActiveItemIndex(0)} src={image} title={product.descricao} alt="Produto" />
                                        </Thumb>
                                      )}
                                      {product.images !== 'notFound' && ((product.images).map((img, index) => (
                                        <Thumb IsActive={activeItemIndex === index + 1}>
                                          <Img onClick={() => setActiveItemIndex(index + 1)} src={`${process.env.NEXT_PUBLIC_IMG_API}${img.key}`} title={product.descricao} alt="Produto" />
                                        </Thumb>
                                      )))}
                                    </>
                                  )}
                                </SmallThumb>
                              </Grid>
                              <Grid cols="12" className="mb-3">
                                <SubTitle className="mb-2">Compartilhe nas redes sociais</SubTitle>
                                <ShareIcons />
                              </Grid>
                              {product.longDescription && (
                                <>
                                  <Grid cols="12 mb-3">
                                    <SubTitle>Descrição do item</SubTitle>
                                  </Grid>
                                  <Grid cols="12 mb-3">
                                    <QuillNoSSRWrapper
                                      readOnly
                                      theme="snow"
                                      value={product.longDescription}
                                      enable={false}
                                      modules={{ toolbar: [] }}
                                    />
                                  </Grid>
                                </>
                              )}
                            </Row>
                          </Grid>
                          <Grid cols="12 12 6 6 6">
                            <Row>
                              <Portal id="portalarea" />
                              <Grid cols="5 6 6 6 6" className="d-md-none mb-3">
                                {renderImage()}
                              </Grid>
                              <Grid cols="7 6 12 12 12">
                                <>
                                  <Title className="test-name-product">{product.descricao}</Title>
                                  <CodCategory>
                                    {`Cód. ${product.codAlfa}`}
                                  </CodCategory>
                                  {(product.hasVariant) && (<PriceFrom>a partir de </PriceFrom>)}
                                  <Price className="test-price-product">{formatCurrency(sumProductPricing)}</Price>
                                  {(!enableOrderButton() && (product.catalogStock === 'UNAVAILABLE')) && (<Unavailable>Produto indisponível</Unavailable>)}
                                </>
                              </Grid>
                            </Row>
                            <Row>
                              <Grid cols="12">
                                {product.variants.length > 0 && (
                                  <SelectDropDown
                                    isRequired
                                    id="variants"
                                    label="Variações"
                                    options={product.variants}
                                    value={variantSelected}
                                    getOptionLabel={label => renderOptionLabel(label)}
                                    getOptionValue={option => option.id}
                                    isInvalid={propsForm.errors.variant}
                                    touched={propsForm.touched.variant}
                                    onChange={(value) => {
                                      const a = value.noStock === false;
                                      const b = value.Estoque && value.Estoque.quantidade > 0;

                                      if ((a && b) || value.noStock) {
                                        propsForm.setFieldValue('variant', value);
                                        propsForm.setFieldTouched('variant', true);

                                        setVariantSelected({ name: value.name });

                                        setProductPricing({
                                          ...productPricing,
                                          product: value.sellValue,
                                        });
                                      }
                                    }}
                                  />
                                )}
                                {isLoaded && (
                                  <>
                                    <ModifiersArea>
                                      {product.modifiers.map((mod, index) => {
                                        const hasError = (mod.required
                                          ? (modifierSelected[index]
                                            && modifierSelected[index].length > 0)
                                          : false);
                                        return (
                                          <div key={mod.id}>
                                            <ModifierHeader>
                                              <div>
                                                <ModifierTitle>
                                                  {mod.name}
                                                </ModifierTitle>
                                                <ModifierAmountTitle>
                                                  {`Máximo ${mod.maxQuantity} `}
                                                  {mod.maxQuantity !== 1 ? 'opções' : 'opção'}
                                                </ModifierAmountTitle>
                                              </div>
                                              {mod.required && (
                                                <div>
                                                  <ModifierTitleRequired
                                                    hasError={!hasError}
                                                  >
                                                    Obrigatório
                                                  </ModifierTitleRequired>
                                                </div>
                                              )}
                                            </ModifierHeader>
                                            <ul>
                                              <ItemModifiers
                                                modifier={mod}
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
                                    {enableOrderButton() && (
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
                                <ShareIcons />
                              </Grid>
                              {product.longDescription && (
                                <>
                                  <Grid cols="12" className="d-md-none">
                                    <SubTitle>Descrição do item</SubTitle>
                                  </Grid>
                                  <Grid cols="12" className="d-md-none mb-3">
                                    <QuillNoSSRWrapper
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
                          {(enableOrderButton()) && (
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
                                          initialCount={1}
                                          setState={(value) => {
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
                                          price={
                                            formatCurrency(
                                              propsForm.values.quantity * sumProductPricing,
                                            )
                                          }
                                          type="submit"
                                          disabled={
                                            hasModifiersErrors.length > 0 && isProductFound
                                          }
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
              ) : <ProductNotFoundMessage />}
            </>
          ) : <LoadingSpinner />}
        </Grid>
      </Row>
    </>
  );
};

SingleProduct.propTypes = {
  // match: PropTypes.any.isRequired,
};

export default SingleProduct;
