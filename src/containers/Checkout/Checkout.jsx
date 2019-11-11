import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';

import SelectDropDown from 'components/Form/SelectDropDown';
import RenderCheckbox from 'components/Form/RenderCheckbox';
import Button from 'components/Form/Button';
import Input from 'components/Form/Input';
import MaskedNumberInput from 'components/Form/MaskedNumberInput';
import TextArea from 'components/Form/TextArea';
import SectionTitle from 'components/SectionTitle';
import Alert from 'components/Alert';
import Row from 'components/Row';
import Grid from 'components/Grid';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import FilterContext from 'contexts/FilterContext';
import history from 'utils/history';

import checkoutSchema from './checkoutSchema';
import createOrder from './requestCheckout';
import getCep from './getCep';

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
    value: 'food_ticket',
  },
];

const personType = [
  {
    label: 'Pessoa física',
    value: 'FISICA',
  },
  {
    label: 'Pessoa jurídica',
    value: 'JURIDICA',
  },
];

const addressType = [
  {
    label: 'Residencial',
    value: 'RESIDENCIAL',
  },
  {
    label: 'Comercial',
    value: 'COMERCIAL',
  },
];

const Checkout = ({ intl }) => {
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const dataUser = localStorage.getItem('dataUser') ? JSON.parse(localStorage.getItem('dataUser')) : {};
  const [isNaturalPerson, setNaturalPerson] = useState((dataUser.tipoPessoa && dataUser.tipoPessoa.value === 'FISICA'));
  const { shop } = useContext(ShopContext);
  const { updateFilter } = useContext(FilterContext);
  const [stateCart] = useState(cart);
  const [totalCar, setTotalCar] = useState(0);
  const [coastDelivery, setCoastDelivery] = useState(0);
  const [withdraw, setWithdraw] = useState(false);
  const [reCaptchaToken, setReCaptchaToken] = useState(false);
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const recaptchaRef = useRef();

  const submitCheckout = (formValues, { setSubmitting }) => {
    const valuesForStorage = {
      ...formValues,
      pickup: false,
      observacao: '',
      formaPagamento: '',
    };
    localStorage.setItem('dataUser', JSON.stringify(valuesForStorage));

    const values = {
      ...formValues,
      tipoPessoa: formValues.tipoPessoa.value,
      tipoEndereco: formValues.tipoEndereco.value,
      'g-recaptcha-response': reCaptchaToken,
      orderProducts: stateCart,
    };

    createOrder(values).then(() => {
      Swal.fire({
        type: 'success',
        title: 'Pedido enviado com sucesso',
        showConfirmButton: false,
        onClose: () => {
          history.push('/');
          updateShoppingCart({
            basketCount: 0,
          });
          localStorage.removeItem('cartInit');
          localStorage.removeItem('cart');
        },
      });
    }).catch(() => {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Erro ao enviar o pedido',
      });
    }).finally(() => {
      setSubmitting(false);
    });
  };

  const initialValues = {
    name: '',
    email: '',
    fone: '',
    cep: '',
    documento: '',
    endereco: '',
    tipoLogradouro: '',
    tipoEndereco: '',
    complemento: '',
    numero: '',
    bairro: '',
    cidade: '',
    codcidade: '',
    estado: '',
    formaPagamento: '',
    tipoPessoa: '',
    fantasia: '',
    razaoSocial: '',
    pickup: false,
    catalog_id: shop.id,
    loja: shop.codigo,
  };

  const verifyRecaptcha = (value) => {
    setReCaptchaToken(value);
  };

  useEffect(() => {
    const total = stateCart.reduce(
      (count, val) => (count + (val.quantity * (val.pricing.modifiers + val.pricing.product))), 0,
    );

    setCoastDelivery((shop.deliveryMode !== 'PICKUP' ? shop.deliveryFee : 0));

    setTotalCar(total);
    updateFilter({
      label: 'Finalizar o pedido',
    });
    if (cart.length < 1) {
      updateFilter({
        categoria: 0, label: 'Todas as categorias', page: 1, search: '',
      });
      history.push('/');
    }
  }, [coastDelivery]);


  return (
    <ContainerCheckout>
      <Row className="d-flex">
        <Grid cols="12 12 12 9">
          <Formik
            onSubmit={submitCheckout}
            initialValues={(dataUser.catalog_id ? dataUser : initialValues)}
            validationSchema={checkoutSchema(isNaturalPerson)}
            render={propsForm => (
              <Form>
                <Row>
                  <Grid cols="12">
                    <SectionTitle>Dados cadastrais</SectionTitle>
                  </Grid>
                  {(dataUser.catalog_id) && (
                    <Grid cols="12">
                      <Alert
                        text="Para ajudar você a finalizar o pedido mais rapidamente, já preenchemos o formulário com os dados do seu último pedido!"
                        typeAlert="warning"
                      />
                    </Grid>
                  )}
                  <Grid cols="12 6 6 6 6">
                    <SelectDropDown
                      id="tipoPessoa"
                      label="Tipo de cadastro"
                      cacheOptions
                      options={personType}
                      defaultValue={propsForm.values.tipoPessoa}
                      getOptionLabel={label => label.label}
                      getOptionValue={option => option.value}
                      onChange={(event) => {
                        propsForm.setFieldValue('tipoPessoa', event);
                        if (event.value === 'FISICA') {
                          setNaturalPerson(true);
                        } else {
                          setNaturalPerson(false);
                        }
                      }}
                      isInvalid={propsForm.errors.tipoPessoa}
                      touched={propsForm.touched.tipoPessoa}
                      isRequired
                    />
                  </Grid>
                  {(isNaturalPerson) && (
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Nome"
                      name="name"
                      component={Input}
                      isRequired
                    />
                  </Grid>
                  )}
                  {(!isNaturalPerson) && (
                    <>
                      <Grid cols="12 6 6 6 6">
                        <Field
                          label="Razão social"
                          name="razaoSocial"
                          component={Input}
                          isRequired
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 6">
                        <Field
                          label="Nome fantasia"
                          name="fantasia"
                          component={Input}
                          isRequired
                        />
                      </Grid>
                    </>
                  )}
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="E-mail"
                      name="email"
                      type="email"
                      component={Input}
                      isRequired
                    />
                  </Grid>
                  {(isNaturalPerson) ? (
                    <Grid cols="12 6 6 6 6">
                      <Field
                        label="CPF"
                        name="documento"
                        format="###.###.###-##"
                        component={MaskedNumberInput}
                        isRequired
                      />
                    </Grid>
                  ) : (
                    <Grid cols="12 6 6 6 6">
                      <Field
                        label="CNPJ"
                        name="documento"
                        format="##.###.###/####-##"
                        component={MaskedNumberInput}
                        isRequired
                      />
                    </Grid>
                  )}
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Telefone"
                      name="fone"
                      type="tel"
                      component={Input}
                      isRequired
                    />
                  </Grid>
                </Row>
                <Row>
                  <Grid cols="12">
                    <SectionTitle>Endereço</SectionTitle>
                  </Grid>
                  <Grid cols="12 6 6 3 3">
                    <Field
                      label="CEP"
                      name="cep"
                      type="tel"
                      format="#####-###"
                      component={MaskedNumberInput}
                      onValueChange={(values) => {
                        propsForm.setFieldValue('cep', values.formattedValue);
                        if (values.value.length < 8) {
                          return;
                        }
                        getCep(values.value).then((address) => {
                          const tipoLogradouro = address.data.logradouro.substring(0, address.data.logradouro.indexOf(' ') + 1);
                          const endereco = address.data.logradouro.substring(address.data.logradouro.indexOf(' ') + 1);
                          propsForm.setFieldValue('bairro', address.data.bairro);
                          propsForm.setFieldValue('estado', address.data.uf);
                          propsForm.setFieldValue('codcidade', address.data.ibge);
                          propsForm.setFieldValue('cidade', address.data.localidade);
                          propsForm.setFieldValue('endereco', endereco.trim());
                          propsForm.setFieldValue('tipoLogradouro', tipoLogradouro.trim());
                        });
                      }}
                      isRequired
                    />
                  </Grid>
                  <Grid cols="12 6 6 3 3">
                    <Field
                      label="Tipo logradouro"
                      name="tipoLogradouro"
                      placeholder="Exemplo: Rua"
                      component={Input}
                      isRequired
                    />
                  </Grid>
                  <Grid cols="12 12 6 6 6">
                    <Field
                      label="Endereço"
                      name="endereco"
                      component={Input}
                      isRequired
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 4">
                    <Field
                      label="Número"
                      name="numero"
                      component={Input}
                      isRequired
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 8">
                    <Field
                      label="Complemento"
                      name="complemento"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 12 8 8 8">
                    <Field
                      label="Bairro"
                      name="bairro"
                      component={Input}
                      isRequired
                    />
                  </Grid>
                  <Grid cols="12 12 4 4 4">
                    <SelectDropDown
                      id="tipoEndereco"
                      label="Tipo de endereço"
                      cacheOptions
                      options={addressType}
                      defaultValue={propsForm.values.tipoEndereco}
                      getOptionLabel={label => label.label}
                      getOptionValue={option => option.value}
                      onChange={(event) => {
                        propsForm.setFieldValue('tipoEndereco', event);
                      }}
                      isInvalid={propsForm.errors.tipoEndereco}
                      touched={propsForm.touched.tipoEndereco}
                      isRequired
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Cidade"
                      name="cidade"
                      component={Input}
                      isRequired
                      disabled
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Estado"
                      name="estado"
                      component={Input}
                      isRequired
                      disabled
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Row>
                      <Grid cols="12">
                        <SectionTitle>
                          {'Entrega e pagamento'}
                        </SectionTitle>
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
                              {'Você iré retirar o pedido no estabelecimento do vendedor'}
                            </ValueDelivery>
                          </>
                        )}
                        {(shop.deliveryMode === 'BOTH') && (
                          <>
                            <div className="d-flex align-items-center mt-3 mb-3">
                              <Field
                                label="Retirar no estabelecimento"
                                name="pickup"
                                component={RenderCheckbox}
                                onChange={(event) => {
                                  event.preventDefault();
                                  propsForm.setFieldValue('pickup', !propsForm.values.pickup);
                                  setWithdraw(!propsForm.values.pickup);
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
                          isRequired
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
                    <Field
                      inputId="observacao"
                      label="Observação"
                      name="observacao"
                      component={TextArea}
                      rows={3}
                    />
                  </Grid>
                  <Grid cols="12">
                    <Alert
                      text="Atenção: você irá realizar o pagamento diretamente com o vendedor!"
                    />
                    {(Object.keys(propsForm.errors).length > 0 && propsForm.submitCount > 0) && (
                      <Alert
                        text="Verifique se há campos incorretos no formulário!"
                        typeAlert="danger"
                      />
                    )}
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
                        isLoading={propsForm.isSubmitting}
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
