import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';
import ReCAPTCHA from 'react-google-recaptcha';

import SelectDropDown from 'components/Form/SelectDropDown';
import RenderCheckbox from 'components/Form/RenderCheckbox';
import Button from 'components/Form/Button';
import Input from 'components/Form/Input';
import InputCrediCard from 'components/Form/InputCreditCard';
import InputCvv from 'components/Form/InputCvv';
import MaskedNumberInput from 'components/Form/MaskedNumberInput';
import MaskInput from 'components/Form/MaskInput';
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
import createOrder, { getPayments, getSessionPag } from './requestCheckout';
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
  const [paymentPage, setPaymentPage] = useState(null);
  const { shop } = useContext(ShopContext);
  const { updateFilter } = useContext(FilterContext);
  const [stateCart] = useState(cart);
  const [totalCar, setTotalCar] = useState(0);
  const [coastDelivery, setCoastDelivery] = useState(0);
  const [withdraw, setWithdraw] = useState(false);
  const [reCaptchaToken, setReCaptchaToken] = useState(false);
  const [paymentsType, setPaymentType] = useState([]);
  const [state, setState] = useState({
    loadPagseguro: false,
    creditCardBrands: [],
    installments: [],
    creditCardBrand: {
      name: 'none',
      cvvSize: 0,
    },
  });
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const recaptchaRef = useRef();
  const { PagSeguroDirectPayment } = window.window;

  const submitCheckout = (formValues, { setSubmitting }) => {
    const valuesForStorage = {
      ...formValues,
      pickup: false,
      observacao: '',
      pagamento: {},
    };
    localStorage.setItem('dataUser', JSON.stringify(valuesForStorage));

    const values = {
      ...formValues,
      tipoPessoa: formValues.tipoPessoa.value,
      tipoEndereco: formValues.tipoEndereco.value,
      'g-recaptcha-response': reCaptchaToken,
      orderProducts: stateCart,
    };

    if (formValues.gatwayPagseguro && state.loadPagseguro) {
      PagSeguroDirectPayment.createCardToken({
        cardNumber: formValues.cardNumber, // Número do cartão de crédito
        brand: state.creditCardBrand.name, // Bandeira do cartão
        cvv: formValues.cvv, // CVV do cartão
        expirationMonth: formValues.expiration.split('/')[0], // Mês da expiração do cartão
        expirationYear: formValues.expiration.split('/')[1], // Ano da expiração do cartão, é necessário os 4 dígitos.
        success(response) {
          console.log('success', response);
        },
        error(response) {
          console.log('error', response);
        },
        complete: function(response) {
          // Callback para todas chamadas.
        },
      });
    }

    console.log(formValues);

    setPaymentPage(values);
    setSubmitting(false);
    // createOrder(values).then((response) => {
    //   localStorage.removeItem('cartInit');
    //   localStorage.removeItem('cart');
    //   const msg = `Você acabou de receber o pedido ${response.data.orderName} do seu catálogo online SmartPOS, acesse o app ou site e verifique nos pedidos em aberto.`;
    //   const linkWhatsApp = `<a href='https://api.whatsapp.com/send?phone=55${shop.whatsapp}&text=${encodeURIComponent(msg)}' target='blank'>Enviar confirmação do pedido por WhatsApp.</a>`;
    //   Swal.fire({
    //     type: 'success',
    //     title: `<div>Pedido <strong>${response.data.orderName}</strong>, enviado com sucesso</div>`,
    //     showConfirmButton: false,
    //     showCloseButton: true,
    //     footer: (shop.whatsapp != null && shop.whatsapp.length >= 10 && linkWhatsApp),
    //     onClose: () => {
    //       history.push('/');
    //       updateShoppingCart({
    //         basketCount: 0,
    //       });
    //     },
    //   });
    // }).catch(() => {
    //   Swal.fire({
    //     type: 'error',
    //     title: 'Oops...',
    //     text: 'Erro ao enviar o pedido',
    //   });
    // }).finally(() => {
    //   setSubmitting(false);
    // });
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
    pagamento: '',
    tipoPessoa: '',
    fantasia: '',
    razaoSocial: '',
    pickup: false,
    catalog_id: shop.id,
    loja: shop.codigo,
    gatwayPagseguro: true,
    offlinePayment: false,
    nameHolder: '',
    cardNumber: '',
    expiration: '',
    expiration_unformatted: '',
    cvv: '',
    installments: '',
  };

  const verifyRecaptcha = (value) => {
    setReCaptchaToken(value);
  };

  const handleLoadPaymentsPag = () => {
    PagSeguroDirectPayment.getPaymentMethods({
      amount: (withdraw ? totalCar : (coastDelivery + totalCar)),
      success(response) {
        const creditCard = Object.keys(response.paymentMethods.CREDIT_CARD.options);
        const creditCardBrandList = creditCard
          .map(item => (response.paymentMethods.CREDIT_CARD.options[item]));
        setState({
          ...state,
          creditCardBrands: creditCardBrandList,
        });
      },
      error(response) {
        console.log('ERROR', response);
      },
    });
  };

  const getInstallments = () => {
    PagSeguroDirectPayment.getInstallments({
      amount: (withdraw ? totalCar : (coastDelivery + totalCar)),
      maxInstallmentNoInterest: 2,
      brand: state.creditCardBrand.name,
      success: function(response) {
        const installments = response.installments[state.creditCardBrand.name];
        console.log('Installments', installments);
        setState({
          ...state,
          installments,
        });
      },
      error: function(response) {
        // callback para chamadas que falharam.
      },
    });
  };

  useEffect(() => {
    getPayments(shop.id).then((response) => {
      setPaymentType(response.data);
    });
    getSessionPag(shop.id).then((response) => {
      PagSeguroDirectPayment.setSessionId(response.data.session);
      PagSeguroDirectPayment.onSenderHashReady((resPag) => {
        if (response.status === 'error') {
          console.log(resPag.message);
          return false;
        }
        setPaymentPage({
          ...paymentsType,
          senderHash: resPag.senderHash,
        });
      });
      setState({
        ...state,
        loadPagseguro: true,
      });
    });
  }, []);

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

  useEffect(() => {
    handleLoadPaymentsPag();
    getInstallments();
  },[state.loadPagseguro]);

  const verifyMaxAndMinValue = (gatwayPagseguro) => {
    if (gatwayPagseguro) {
      if (shop.minValuePayOnline >= 0 && totalCar
        > shop.minValuePayOnline && totalCar <= shop.maxValuePayOnline) {
        return true;
      }
      return false;
    }
    return true;
  };


  return (
    <ContainerCheckout>
      <Row className="d-flex">
        <Grid cols="12 12 12 9">
          <Formik
            onSubmit={submitCheckout}
            initialValues={(dataUser.catalog_id ? dataUser : initialValues)}
            validationSchema={checkoutSchema(isNaturalPerson, )}
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
                      inputId="tipoLogradouro"
                      placeholder="Exemplo: Rua"
                      component={Input}
                      isRequired
                    />
                  </Grid>
                  <Grid cols="12 12 6 6 6">
                    <Field
                      label="Endereço"
                      name="endereco"
                      inputId="endereco"
                      component={Input}
                      isRequired
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 4">
                    <Field
                      label="Número"
                      name="numero"
                      inputId="numero"
                      component={Input}
                      isRequired
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 8">
                    <Field
                      label="Complemento"
                      name="complemento"
                      inputId="complemento"
                      component={Input}
                    />
                  </Grid>
                  <Grid cols="12 12 8 8 8">
                    <Field
                      label="Bairro"
                      name="bairro"
                      inputId="bairro"
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
                      inputId="cidade"
                      component={Input}
                      isRequired
                      disabled
                    />
                  </Grid>
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Estado"
                      name="estado"
                      inputId="estado"
                      component={Input}
                      isRequired
                      disabled
                    />
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
                    <Row>
                      <Grid cols="12 6 6 6 6">
                        <>
                          <SectionTitle>
                            {'Entrega'}
                          </SectionTitle>
                          <Row>
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
                                    {'Você irá retirar o pedido no estabelecimento do vendedor'}
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
                          </Row>
                        </>
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
                    </Row>
                  </Grid>
                  <Grid cols="12">
                    <>
                      <SectionTitle>
                        {'Pagamento'}
                      </SectionTitle>
                      {(shop.allowPayOnline === 1) && (
                        <>
                          <div className="d-flex align-items-center mt-3 mb-3">
                            <Field
                              label="Pague na entrega ou retirada"
                              name="offlinePayment"
                              component={RenderCheckbox}
                              onChange={(event) => {
                                event.preventDefault();
                                propsForm.setFieldValue('offlinePayment', !propsForm.values.offlinePayment);
                                propsForm.setFieldValue('gatwayPagseguro', !propsForm.values.gatwayPagseguro);
                              }}
                            />
                          </div>
                          <div className="d-flex align-items-center mt-3 mb-3">
                            <Field
                              label="Pague online"
                              name="gatwayPagseguro"
                              component={RenderCheckbox}
                              onChange={(event) => {
                                event.preventDefault();
                                propsForm.setFieldValue('gatwayPagseguro', !propsForm.values.gatwayPagseguro);
                                propsForm.setFieldValue('offlinePayment', !propsForm.values.offlinePayment);
                              }}
                            />
                          </div>
                        </>
                      )}
                      <Alert
                        text={(propsForm.values.gatwayPagseguro) ? 'Finalize a compra para realizar o pagamento pelo PagSeguro' : 'Atenção: você irá realizar o pagamento diretamente com o vendedor!'}
                      />
                      {(propsForm.values.gatwayPagseguro
                        && totalCar < shop.minValuePayOnline) && (
                        <Alert
                          text="Valor abaixo do permitido para pagamento online, adicione mais produtos"
                          typeAlert="warning"
                        />
                      )}
                      {(propsForm.values.gatwayPagseguro
                        && totalCar > shop.maxValuePayOnline) && (
                        <Alert
                          text="Valor maior do que o permitido para pagamento online, remova alguns produtos"
                          typeAlert="warning"
                        />
                      )}
                    </>
                  </Grid>
                  {console.log(propsForm.errors)}
                  {(propsForm.values.gatwayPagseguro) || (
                    <Grid cols="12 12 6 6 6">
                      <SelectDropDown
                        id="pagamento"
                        label="Forma de pagamento"
                        cacheOptions
                        options={paymentsType}
                        getOptionLabel={label => label.descricao}
                        getOptionValue={option => option.codigo}
                        onChange={event => propsForm.setFieldValue('pagamento', event)}
                        isInvalid={propsForm.errors.pagamento}
                        touched={propsForm.touched.pagamento}
                        isRequired
                      />
                    </Grid>
                  )}
                  {(propsForm.values.gatwayPagseguro) && (
                    <>
                      <Grid cols="12 6 6 6 6">
                        <Field
                          label="Nome do titular"
                          name="nameHolder"
                          component={Input}
                          isRequired
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 6">
                        {}
                        <Field
                          label="Número do cartão"
                          name="cardNumber"
                          format={(state.creditCardBrand.name === 'amex' ? '#### ###### ######' : '#### #### #### ####')}
                          component={NumberFormat}
                          customInput={InputCrediCard}
                          brand={state.creditCardBrand.name}
                          onValueChange={(event) => {
                            const { value } = event;
                            propsForm.setFieldValue('cardNumber', value);
                            if (value.length >= 7) {
                              const cardBin = value.substring(0, 7);
                              PagSeguroDirectPayment.getBrand({
                                cardBin,
                                success(reponse) {
                                  setState({
                                    ...state,
                                    creditCardBrand: reponse.brand,
                                  });
                                },
                              });
                            }
                          }}
                          onBlur={() => {
                            getInstallments();
                          }}
                          isRequired
                          type="tel"
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 6">
                        <Field
                          label="Validade"
                          name="expiration_unformatted"
                          placeholder="MM/AAAA"
                          format="##/####"
                          component={MaskInput}
                          isRequired
                          onValueChange={(value) => {
                            propsForm.setFieldValue('expiration', value.formattedValue);
                            propsForm.setFieldValue('expiration_unformatted', value.value);
                          }}
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 6">
                        <Field
                          label="Código de segurança"
                          name="cvv"
                          format={(state.creditCardBrand.name === 'amex' ? '####' : '###')}
                          component={InputCvv}
                          isRequired
                          type="tel"
                        />
                      </Grid>
                      <Grid cols="12">
                        <SelectDropDown
                          id="installments"
                          label="Parcelas"
                          defaultValue={[]}
                          cacheOptions
                          options={state.installments}
                          getOptionLabel={label => (label.totalAmount && (`${label.quantity} ${(label.quantity === 1 ? 'parcela' : 'parcelas')} de ${intl.formatNumber(label.installmentAmount, { style: 'currency', currency: 'BRL' })} | Total: ${intl.formatNumber(label.totalAmount, { style: 'currency', currency: 'BRL' })} `))}
                          getOptionValue={option => option.quantity}
                          onChange={event => propsForm.setFieldValue('installments', event.quantity)}
                          isInvalid={propsForm.errors.installments}
                          touched={propsForm.touched.installments}
                          placeholder="Preencha as informações do cartão para ver as opções de parcelamento"
                          isRequired
                        />
                      </Grid>
                    </>
                  )}
                  {(Object.keys(propsForm.errors).length > 0
                    && propsForm.submitCount > 0) && (
                    <Grid cols="12">
                      <Alert
                        text="Verifique se há campos incorretos no formulário!"
                        typeAlert="danger"
                      />
                    </Grid>
                  )}
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
                        value={(propsForm.values.gatwayPagseguro) ? 'Ir para o pagamento' : 'Enviar pedido'}
                        type="submit"
                        isLoading={propsForm.isSubmitting}
                        //disabled={(!reCaptchaToken && !propsForm.values.gatwayPagseguro)}
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
