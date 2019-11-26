import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {FormattedPlural, injectIntl, intlShape} from 'react-intl';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

import SelectDropDown from 'components/Form/SelectDropDown';
import Button from 'components/Form/Button';
import ButtonPrice from 'components/Form/ButtonPrice';
import TextArea from 'components/Form/TextArea';
import Checkbox from 'components/Form/RenderCheckbox';
import Counter from 'components/Form/Counter';
import Row from 'components/Row';
import Grid from 'components/Grid';
import SideBar from 'components/SideBar';
import ShopContext from 'contexts/ShopContext';
import ItemModifiers from 'components/ItemModifiers';

import getInfoProduct from './requestProduct';
import NoImage from '../../assets/no-image.png';
import uuidv1 from "uuid/v1";

const Img = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const Container = styled.div`
  display: flex;
  background: #fff;  
  border-radius: 5px;
  padding: 15px 15px 0 15px;
  height: auto;
`;

const FooterContainer = styled.div`
  background: #fff;
  height: 80px;
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
`;

const Price = styled.h3`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 15px;
  color: #707070;
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
  ${props => (props.hasError ? `
    border-width: 0 0 0 1px;
    border-style: solid;
    border-color: #ff2323;
    padding: 10px 0 10px 9px;
    ` : `
    border-width: 0;
    padding: 10px 0 10px 10px;
  `)}
`;

const ModifierTitle = styled.span`
  font-size: 1rem;
  line-height: 1.25em;
  font-weight: 600;
  color: ${props => (props.hasError ? ' #ff2323' : '#3f3e3e')};
`;

const ModifierAmountTitle = styled.span`
  font-weight: 100;
  font-size: 0.875rem;
  line-height: 17px;
  display: block;
  color: ${props => (props.hasError ? ' #ff2323' : '#717171')};
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

const SingleProduct = (props) => {
  const { intl } = props;
  const [product, setProduct] = useState({
    variants: [],
  });
  const [productPricing, setProductPricing] = useState({
    product: 0,
    modifiers: 0,
  });
  const [modifierSelected, setModifierSelected] = useState([[]]);
  const [variantSelected, setVariantSelected] = useState({ name: '' });
  const [initialValues, setInitialValues] = useState({ quantity: 1 });
  const [isLoaded, setLoaded] = useState(false);
  const { shop, categories } = useContext(ShopContext);
  const [image, setImage] = useState(NoImage);
  const barBotton = useRef(null);
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}product/${product.codigo}?lastUpdate`;

  const img = new Image();
  img.src = imageBaseUrl;

  img.onload = () => {
    setImage(imageBaseUrl);
  };

  const sumProductPricing = (productPricing.product + productPricing.modifiers);

  const submitItem = (values) => {
    console.log(values);
  };


  useEffect(() => {
    setLoaded(false);
    const { params: { id } } = props.match;
    getInfoProduct(shop.id, id).then((response) => {
      setInitialValues({
        variant: {},
        note: '',
        quantity: 1,
        id: response.id,
        descricao: response.descricao,
        categoria: response.categoria,
        pricing: productPricing,
        viewMode: response.viewMode,
        atualizacao: response.atualizacao,
        uuid: uuidv1(),
      });
      setProduct(response);
      setProductPricing({
        product: response.valorVenda,
        modifiers: 0,
      });
      setModifierSelected(prevState => ([...prevState, []]));
    }).finally(() => setLoaded(true));
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
          <Formik
            onSubmit={submitItem}
            initialValues={initialValues}
            render={propsForm => (
              <Form style={{ width: '100%' }}>
                <Row className="d-flex">
                  <Grid cols="12 3 3 6 6">
                    <Img src={image} title={product.descricao} alt="Produto" />
                  </Grid>
                  <Grid cols="12 3 3 6 6">
                    <Title>{product.descricao}</Title>
                    {(product.hasVariant) && (<PriceFrom>a partir de </PriceFrom>)}
                    <Price>{intl.formatNumber(product.valorVenda, { style: 'currency', currency: 'BRL' })}</Price>
                    <hr />
                    {(product.variants.length > 0) && (
                      <SelectDropDown
                        id="variants"
                        label="Variações"
                        options={product.variants}
                        getOptionLabel={label => (
                          <LabelVariant>
                            <div>{label.name}</div>
                            {(label.sellValue) && (<div>{intl.formatNumber(label.sellValue, { style: 'currency', currency: 'BRL' })}</div>)}
                          </LabelVariant>
                        )}
                        onChange={(value) => {
                          propsForm.setFieldValue('variant', value);
                          setVariantSelected({ name: value.name });
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
                            const hasError = false;
                            return (
                              <div key={mod.id}>
                                <ModifierHeader
                                  hasError={hasError}
                                >
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
                                  />
                                </ul>
                              </div>
                            );
                          })}
                        </ModifiersArea>
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
                      </>
                    )}
                  </Grid>
                  <FooterContainer>
                    <Row
                      className="justify-content-end"
                    >
                      <Grid cols="6">
                        <Row>
                          <Grid cols="5">
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
                            className="d-flex justify-content-start align-items-end"
                          >
                            <div>
                              <ButtonPrice
                                value="ADICIONAR"
                                price={intl.formatNumber((propsForm.values.quantity * sumProductPricing), { style: 'currency', currency: 'BRL' })}
                                type="submit"
                              />
                            </div>
                          </Grid>
                        </Row>
                      </Grid>
                    </Row>
                  </FooterContainer>
                </Row>
              </Form>
            )}
          />
        </Container>
      </Row>
    </>
  );
};

SingleProduct.propTypes = {
  match: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(SingleProduct);
