import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';

import SelectDropDown from 'components/Form/SelectDropDown';
import RenderCheckbox from 'components/Form/RenderCheckbox';
import Button from 'components/Form/Button';
import Input from 'components/Form/Input';
import SectionTitle from 'components/SectionTitle';
import Alert from 'components/Alert';
import Row from 'components/Row';
import Grid from 'components/Grid';
import ShopContext from 'contexts/ShopContext';
import FilterContext from 'contexts/FilterContext';
import history from 'utils/history';

import checkoutSchema from './checkoutSchema';

const ContainerCheckout = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
`;

const ValueDelivery = styled.h6`
  margin-bottom: 15px;
`;

const ResumeItem = styled.div`
  margin: 10px 0;
`;

const paymentMethods = [
  {
    label: 'Dinheiro',
    value: 'money',
  },
  {
    label: 'Cartão de crédito',
    value: 'credit_card',
  },
  {
    label: 'Cartão de débito',
    value: 'debit_card',
  },
  {
    label: 'Vale alimentação',
    value: 'food_voucher',
  },
  {
    label: 'Vale refeição',
    value: 'meal_ticket',
  },
];

const Checkout = ({ intl }) => {
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const { shop } = useContext(ShopContext);
  const { updateFilter } = useContext(FilterContext);
  const [stateCart] = useState(cart);
  const [totalCar, setTotalCar] = useState(0);
  const [coastDelivery, setCoastDelivery] = useState(0);
  const [withdraw, setWithdraw] = useState(false);
  const [reCaptchaToken, setReCaptchaToken] = useState();
  const recaptchaRef = useRef();

  const submitCheckout = (values) => {
    console.log(reCaptchaToken, values);
  };

  const initialValues = {
    name: '',
    email: '',
    telefone: '',
    cep: '',
    cpf: '',
    endereco: '',
    complemento: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    formaPagamento: '',
    withdraw: false,
    catalog_id: shop.id,
    loja: shop.codigo,
  };

  const verifyRecaptcha = (value) => {
    setReCaptchaToken(value);
  };

  useEffect(() => {
    const total = stateCart.reduce(
      (count, val) => (count + (val.amount * (val.pricing.modifiers + val.pricing.product))), 0,
    );
    setCoastDelivery(shop.deliveryFee);
    setTotalCar(total);
    updateFilter({
      label: 'Finalizar o pedido',
    });
    if (cart.length < 1) {
      history.push('/');
    }
  }, [coastDelivery]);


  return (
    <ContainerCheckout>
      <Row className="d-flex">
        <Grid cols="12 12 10 9">
          <Formik
            onSubmit={submitCheckout}
            initialValues={initialValues}
            enableReinitialize
            validationSchema={checkoutSchema()}
            render={propsForm => (
              <Form>
                <Row>
                  <Grid cols="12">
                    <SectionTitle>Dados pessoais</SectionTitle>
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Nome"
                      name="name"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="E-mail"
                      name="email"
                      type="email"
                      component={Input}
                    />
                  </Grid>
                </Row>
                <Row>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="CPF"
                      name="cpf"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Telefone"
                      name="telefone"
                      type="tel"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12">
                    <SectionTitle>Endereço</SectionTitle>
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="CEP"
                      name="cep"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Endereço"
                      name="endereco"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 4">
                    <Field
                      label="Número"
                      name="numero"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 8">
                    <Field
                      label="Complemento"
                      name="complemento"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 12 12 12 12">
                    <Field
                      label="Bairro"
                      name="bairro"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Cidade"
                      name="cidade"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Estado"
                      name="estado"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Row>
                      <Grid cols="12">
                        <SectionTitle>Entrega e pagamento</SectionTitle>
                      </Grid>
                      <Grid cols="12">
                        {(shop.deliveryMode === 'DELIVERY' || shop.deliveryMode === 'BOTH') && (
                          <>
                            <span>Taxa de entrega</span>
                            <ValueDelivery>{intl.formatNumber(shop.deliveryFee, { style: 'currency', currency: 'BRL' })}</ValueDelivery>
                          </>
                        )}
                        {(shop.deliveryMode === 'PICKUP') && (
                          <>
                            <span>Entrega</span>
                            <ValueDelivery>
                              Você iré retirar o pedido no estabelecimento do vendedor
                            </ValueDelivery>
                          </>
                        )}
                        {(shop.deliveryMode === 'BOTH') && (
                          <>
                            <div className="d-flex align-items-center mt-3 mb-3">
                              <Field
                                label="Retirar no estabelecimento"
                                name="withdraw"
                                component={RenderCheckbox}
                                onChange={(event) => {
                                  event.preventDefault();
                                  propsForm.setFieldValue('withdraw', !propsForm.values.withdraw);
                                  setWithdraw(!propsForm.values.withdraw);
                                }}
                              />
                            </div>
                          </>
                        )}
                      </Grid>
                      <Grid>
                        <SelectDropDown
                          id="formaPagamento"
                          label="Forma de pagamento"
                          cacheOptions
                          options={paymentMethods}
                          getOptionLabel={label => label.label}
                          getOptionValue={option => option.value}
                          onChange={event => propsForm.setFieldValue('formaPagamento', event.value)}
                          isInvalid={propsForm.errors.formaPagamento}
                          touched={propsForm.touched.formaPagamento}
                        />
                      </Grid>
                    </Row>
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Row>
                      <Grid cols="12">
                        <SectionTitle>Resumo do pedido</SectionTitle>
                      </Grid>
                      <Grid cols="12">
                        <ResumeItem>
                          <span>Pedido: </span>
                          <strong>{intl.formatNumber(totalCar, { style: 'currency', currency: 'BRL' })}</strong>
                        </ResumeItem>
                        <ResumeItem>
                          <span>Entrega: </span>
                          <strong>{intl.formatNumber(withdraw ? 0 : coastDelivery, { style: 'currency', currency: 'BRL' })}</strong>
                        </ResumeItem>
                        <ResumeItem>
                          <span>Total: </span>
                          <strong>{intl.formatNumber(withdraw ? totalCar : (coastDelivery + totalCar), { style: 'currency', currency: 'BRL' })}</strong>
                        </ResumeItem>
                      </Grid>
                    </Row>
                  </Grid>
                  <Grid cols="12">
                    <Alert
                      text="Atenção: você irá realizar o pagamento diretamente com o vendedor!"
                    />
                  </Grid>
                  <Grid
                    cols="12"
                    className="d-flex justify-content-end mb-3"
                  >
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.REACT_APP_RECAPTCHAKEY_V2}
                      hl="pt-BR"
                      onChange={verifyRecaptcha}
                    />
                  </Grid>
                  <Grid cols="12" className="d-flex justify-content-end">
                    <div>
                      <Button
                        value="Enviar pedido"
                        type="submit"
                        disabled={!reCaptchaToken}
                      />
                    </div>
                  </Grid>
                </Row>
              </Form>
            )}
          />
        </Grid>
      </Row>
    </ContainerCheckout>
  );
};

Checkout.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Checkout);
