import React, {
  useState, useEffect, useContext,
} from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { Formik, Form, Field } from 'formik';
import { injectIntl, intlShape, FormattedPlural } from 'react-intl';
import lodash from 'lodash';
import uuidv1 from 'uuid/v1';
import {
  shape, func, bool, string,
} from 'prop-types';

import SelectDropDown from 'components/Form/SelectDropDown';
import Button from 'components/Form/Button';
import TextArea from 'components/Form/TextArea';
import Checkbox from 'components/Form/RenderCheckbox';
import Counter from 'components/Form/Counter';
import Row from 'components/Row';
import Grid from 'components/Grid';
import storage from 'utils/storage';
import utilsCart from 'utils/cart';

import getVariantsOfProduct from 'api/variantsRequests';
import getModifiersOfProduct from 'api/modifiersRequests';

import ShoppingCartContext from 'contexts/ShoppingCartContext';

import orderValidation from './orderSchema';

const AreaTitle = styled.div`
  background: #00529b;
  padding: 5px 0 5px 20px;
  margin: -20px 0 0 -20px;
  border-radius: 5px 5px 0 0;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 0;
  margin-right: 50px;
  width: 460px;

  @media (max-width: 992px) {
    margin-right: 40px;
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;

const Content = styled.div`
  padding-top: 10px;
  width: 500px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Price = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
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
  background: #f2f2f2;
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

const ModifierItem = styled.li`
  display: flex;
  padding: 10px 20px 10px 15px;
  border-bottom: 1px solid #f7f7f7;
  justify-content: space-between;
`;

const ModifierItemName = styled.div`
  width: 80%;
`;

const ModifierItemSellValue = styled.span`
  margin: 0;
  display: block;
  color: #ea1d2c;
  font-size: 0.875rem;
  font-weight: 600;
`;

const TotalValue = styled.div`
  font-weight: 600;
  margin-bottom: 15px;
`;

const ModalOrderItem = (props) => {
  const {
    intl, productOnModal, setProductOnModal, modalOpen, setModalOpen, storeId,
  } = props;
  const [variantSelected, setVariantSelected] = useState({ name: '' });
  const [variants, setVariants] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [isModLoaded, setIsModLoaded] = useState(false);
  const [modifierSelected, setModifierSelected] = useState([]);
  const [modifiersErrors, setModifiersErrors] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const [productPricing, setProductPricing] = useState({
    product: 0,
    modifiers: 0,
  });
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (productOnModal.id) {
      setProductPricing({
        product: productOnModal.valorVenda,
        modifiers: 0,
      });

      setTimeout(() => setShowTextarea(true), 1);

      setInitialValues({
        variant: {},
        note: '',
        quantity: 1,
        id: productOnModal.id,
        descricao: productOnModal.descricao,
        categoria: productOnModal.categoria,
        pricing: productPricing,
        viewMode: productOnModal.viewMode,
        atualizacao: productOnModal.atualizacao,
        uuid: uuidv1(),
      });

      setIsModLoaded(false);
      getVariantsOfProduct(storeId, productOnModal.id).then((response) => {
        setVariants(response.data);
      });
      getModifiersOfProduct(storeId, productOnModal.id).then((response) => {
        setModifiers(response.data);
        // eslint-disable-next-line array-callback-return
        response.data.map((mod) => {
          if (mod.required) {
            setModifiersErrors(true);
          }
          return setModifierSelected(prevState => ([...prevState, []]));
        });
        setIsModLoaded(true);
      });
    }
  }, [productOnModal.id]);

  const onClose = () => {
    setModalOpen(false);
    setVariantSelected({ name: '' });
    setModifiersErrors(false);
    setModifiers([]);
    setModifierSelected([]);
    setProductOnModal({});
  };

  const submitOrderItem = (values) => {
    const prevCart = storage.getLocalCart();
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

    updateShoppingCart({
      cart: newCart,
      basketCount: utilsCart.sumCartQuantity(newCart),
      totalCart: utilsCart.sumCartTotalPrice(newCart),
    });
    storage.updateLocalCart(newCart);
    localStorage.setItem('cartInit', new Date().getTime());
    onClose();
  };


  const renderItem = (modifier, hasError, propsForm, index) => modifier.itens.map((item) => {
    const isChecked = modifierSelected[index].includes(item);
    const isAvailable = ((modifierSelected[index].length + 1) <= modifier.maxQuantity);
    return (
      <ModifierItem key={item.id}>
        <ModifierItemName>
          {item.name}
          {(item.sellValue > 0) && (<ModifierItemSellValue>{` + ${intl.formatNumber(item.sellValue, { style: 'currency', currency: 'BRL' })}`}</ModifierItemSellValue>)}
        </ModifierItemName>
        <Checkbox
          input={{
            value: isChecked,
          }}
          disabled={(!isAvailable && !isChecked)}
          onChange={() => {
            if (isChecked) {
              const removing = modifierSelected[index]
                .filter(itemChecked => (item.id !== itemChecked.id));
              setProductPricing(prevState => ({
                ...prevState,
                modifiers: (prevState.modifiers - item.sellValue),
              }));
              setModifierSelected((prevState) => {
                const newMod = prevState;
                newMod[index] = removing;
                return [...newMod];
              });
              if (modifier.required && !hasError) {
                setModifiersErrors(() => true);
              }
            } else if (modifierSelected[index].length < modifier.maxQuantity) {
              setProductPricing(prevState => ({
                ...prevState,
                modifiers: (prevState.modifiers + item.sellValue),
              }));
              setModifierSelected((prevState) => {
                prevState[index].push(item);
                return ([...prevState]);
              });
              if (modifier.required && hasError) {
                setModifiersErrors(() => false);
              }
            }
          }}
        />
      </ModifierItem>
    );
  });

  const sumProductPricing = (productPricing.product + productPricing.modifiers);

  return (
    <Modal
      open={modalOpen}
      styles={{
        modal: {
          borderRadius: '5px',
          padding: '1.2rem 0 1.2rem 1.2rem',
        },
        closeIcon: {
          fill: '#fff',
          marginTop: '-8px',
          cursor: 'pointer',
        },
      }}
      onClose={onClose}
      center
      closeOnOverlayClick={false}
    >
      <AreaTitle>
        <Title>{productOnModal.descricao}</Title>
      </AreaTitle>
      <Content>
        <Price>{intl.formatNumber(sumProductPricing, { style: 'currency', currency: 'BRL' })}</Price>
        <Formik
          onSubmit={submitOrderItem}
          initialValues={initialValues}
          validationSchema={orderValidation(variants)}
          enableReinitialize
          render={propsForm => (
            <Form>
              <div className="scrollAreaOrder">
                {(variants.length > 0) && (
                  <SelectDropDown
                    id="variants"
                    label="Variações"
                    options={variants}
                    getOptionLabel={label => (
                      <LabelVariant>
                        <div>{label.name}</div>
                        {(label.sellValue) && (<div>{intl.formatNumber(label.sellValue, { style: 'currency', currency: 'BRL' })}</div>)}
                      </LabelVariant>
                    )}
                    getOptionValue={option => option.id}
                    value={variantSelected}
                    onChange={(value) => {
                      propsForm.setFieldValue('variant', value);
                      setVariantSelected({ name: value.name });
                      setProductPricing(prevState => ({
                        ...prevState,
                        product: value.sellValue,
                      }));
                    }}
                    isInvalid={propsForm.errors.variant}
                    touched={propsForm.touched.variant}
                    isRequired
                  />
                )}
                {(isModLoaded) && (
                  <ModifiersArea>
                    {modifiers.map((mod, index) => {
                      const hasError = (mod.required && (modifierSelected[index].length <= 0));
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
                                {`Escolha até ${mod.maxQuantity} `}
                                <FormattedPlural
                                  value={mod.maxQuantity}
                                  one="opção."
                                  other="opções."
                                />
                              </ModifierAmountTitle>
                            </div>
                            {(mod.required) && (
                              <div>
                                <ModifierTitleRequired
                                  hasError={hasError}
                                >
                                  Obrigatório
                                </ModifierTitleRequired>
                              </div>
                            )}
                          </ModifierHeader>
                          <ul>
                            {renderItem(mod, hasError, propsForm, index)}
                          </ul>
                        </div>
                      );
                    })}
                  </ModifiersArea>
                )}
                {(showTextarea) && (
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
              </div>
              <Row
                className="pt-3 mr-2"
              >
                <Grid
                  cols="12"
                  className="d-flex align-items-sm-start justify-content-end"
                >
                  <TotalValue>
                    {`Total ${intl.formatNumber((propsForm.values.quantity * sumProductPricing), { style: 'currency', currency: 'BRL' })}`}
                  </TotalValue>
                </Grid>
                <Grid
                  cols="7 8 8 8 8"
                  className="d-flex align-items-center justify-content-end"
                >
                  <Counter
                    initialCount={1}
                    setState={(value) => {
                      propsForm.setFieldValue('quantity', value);
                    }}
                  />
                </Grid>
                <Grid
                  cols="5 4 4 4 4"
                  className="d-flex align-items-center justify-content-end"
                >
                  <div>
                    <Button
                      value="Adicionar"
                      type="submit"
                      disabled={modifiersErrors}
                    />
                  </div>
                </Grid>
              </Row>
            </Form>
          )}
        />
      </Content>
    </Modal>
  );
};

ModalOrderItem.propTypes = {
  intl: intlShape.isRequired,
  productOnModal: shape({}).isRequired,
  setProductOnModal: func.isRequired,
  modalOpen: bool.isRequired,
  setModalOpen: func.isRequired,
  storeId: string,
};

ModalOrderItem.defaultProps = {
  storeId: '',
};

export default injectIntl(ModalOrderItem);
