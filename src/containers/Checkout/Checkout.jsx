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
import IconeShield from 'assets/lock.png';

import checkoutSchema from './checkoutSchema';
import createOrder, { getPayments, getSessionPag, checkingDelivery } from './requestCheckout';
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

const AddressCreditCard = styled.span`
  color: #00529b;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
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
  const { shop, updateOrderPlaced } = useContext(ShopContext);
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const [isNaturalPerson, setNaturalPerson] = useState(true);
  const [offlinePayment, setOfflinePayment] = useState((shop.allowPayOnline === 0));
  const { updateFilter } = useContext(FilterContext);
  const [stateCart] = useState(cart);
  const [totalCar, setTotalCar] = useState(0);
  const [costDelivery, setCostDelivery] = useState({
    cost: 0,
    isDeliverable: false,
  });
  const [withdraw, setWithdraw] = useState(false);
  const [reCaptchaToken, setReCaptchaToken] = useState(false);
  const [paymentsType, setPaymentType] = useState([]);
  const [state, setState] = useState({
    loadPagseguro: false,
  });
  const [installments, setInstallments] = useState([]);
  const [creditCardBrands, setCreditCardBrands] = useState([]);
  const [creditCardBrand, setCreditCardBrand] = useState({
    name: 'none',
    cvvSize: 0,
  });
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const recaptchaRef = useRef();
  const { PagSeguroDirectPayment } = window.window;

  const cleanCart = () => {
    localStorage.removeItem('cartInit');
    localStorage.removeItem('cart');
    updateShoppingCart({
      basketCount: 0,
    });
  };

  const sendCheckout = (values, setSubmitting) => {
    createOrder(values).then((response) => {
      cleanCart();
      updateOrderPlaced({
        ...values,
        costDelivery,
        withdraw,
        orderName: response.data.orderName,
      });
      history.push('/pedido-realizado');
    }).catch((error) => {
      if (error.response && error.response.status === 406) {
        Swal.fire({
          type: 'warning',
          title: 'Divergência nos valores',
          text: 'Pedido com valores divergentes, faça o seu pedido novamente!',
          onClose: () => {
            cleanCart();
            history.push('/');
          },
        });
      } else {
        recaptchaRef.current.reset();
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Erro ao enviar o pedido',
        });
      }
    }).finally(() => {
      setSubmitting(false);
    });
  };

  const submitCheckout = (formValues, { setSubmitting }) => {
    const values = {
      ...formValues,
      tipoPessoa: formValues.tipoPessoa.value,
      tipoEndereco: formValues.tipoEndereco.value,
      'g-recaptcha-response': reCaptchaToken,
      orderProducts: stateCart,
      deliveryValue: costDelivery.cost,
    };

    // Pagamento pela pagseguro
    if (formValues.gatwayPagseguro && state.senderHash) {
      PagSeguroDirectPayment.createCardToken({
        cardNumber: formValues.cardNumber_unformatted, // Número do cartão de crédito
        brand: creditCardBrand.name, // Bandeira do cartão
        cvv: formValues.cvv, // CVV do cartão
        expirationMonth: formValues.expiration.split('/')[0], // Mês da expiração do cartão
        expirationYear: formValues.expiration.split('/')[1], // Ano da expiração do cartão, é necessário os 4 dígitos.
        success(response) {
          const valuesPag = {
            ...values,
            senderHash: state.senderHash,
            cardTokenPag: response.card.token,
          };
          sendCheckout(valuesPag, setSubmitting);
        },
        error() {
          Swal.fire({
            type: 'warning',
            title: 'Cartão inválido',
            text: 'Por favor verifique seu cartão de crédito!',
            showConfirmButton: true,
            showCloseButton: true,
          });
          setSubmitting(false);
        },
      });
    } else {
      sendCheckout(values, setSubmitting);
    }
  };

  const initialValues = {
    name: '',
    email: '',
    fone: '',
    foneFormatted: '',
    cep: '',
    documento: '',
    endereco: '',
    tipoLogradouro: '',
    tipoEndereco: addressType[0],
    complemento: '',
    numero: '',
    bairro: '',
    cidade: '',
    codcidade: '',
    estado: '',
    pagamento: '',
    tipoPessoa: [],
    fantasia: '',
    razaoSocial: '',
    pickup: false,
    catalog_id: shop.id,
    loja: shop.codigo,
    gatwayPagseguro: (shop.allowPayOnline === 1),
    offlinePayment: (shop.allowPayOnline === 0),
    nameHolder: '',
    cardNumber: '',
    cardNumber_unformatted: '',
    expiration: '',
    expiration_unformatted: '',
    allowedLimit: true,
    cvv: '',
    installments: '',
    cpfHolder: '',
    birthDateHolder: '',
    cobrancaCep: '',
    cobrancaBairro: '',
    cobrancaEstado: '',
    cobrancaComplemento: '',
    cobrancaNumero: '',
    cobrancaCodcidade: '',
    cobrancaCidade: '',
    cobrancaEndereco: '',
    cobrancaTipoLogradouro: '',
  };

  const verifyRecaptcha = (value) => {
    setReCaptchaToken(value);
  };

  const handleLoadPaymentsPag = () => {
    PagSeguroDirectPayment.getPaymentMethods({
      amount: (withdraw ? totalCar : (costDelivery.cost + totalCar)),
      success(response) {
        const creditCard = Object.keys(response.paymentMethods.CREDIT_CARD.options);
        const creditCardBrandList = creditCard
          .map(item => (response.paymentMethods.CREDIT_CARD.options[item]));
        setCreditCardBrands(creditCardBrandList);
      },
    });
  };

  const getHashReady = () => {
    PagSeguroDirectPayment.onSenderHashReady((resPag) => {
      if (resPag.status === 'error') {
        return false;
      }
      return setState({
        ...state,
        senderHash: resPag.senderHash,
      });
    });
  };

  const getInstallments = (cost) => {
    if (creditCardBrand.name && creditCardBrand.name !== 'none') {
      const withDelivery = cost ? cost + totalCar : costDelivery.cost + totalCar;
      PagSeguroDirectPayment.getInstallments({
        amount: (withdraw ? totalCar : withDelivery),
        // maxInstallmentNoInterest: 2,
        brand: creditCardBrand.name,
        success(response) {
          const installment = response.installments[creditCardBrand.name];
          if (installment) {
            setInstallments(installment);
          }
        },
      });
    }
  };

  const costDeliveryApi = (cep, propsForm) => {
    checkingDelivery(cep, shop.id).then((response) => {
      setCostDelivery({
        ...response.data,
        cost: (shop.deliveryMode !== 'PICKUP' ? response.data.cost : 0),
      });
      if (!response.data.isDeliverable && propsForm) {
        propsForm.setFieldValue('pickup', true);
      }
      if (response.data.isDeliverable && propsForm) {
        propsForm.setFieldValue('pickup', false);
      }
    });
  };

  useEffect(() => {
    getInstallments();
  }, [costDelivery.cost]);

  useEffect(() => {
    getInstallments();
  }, [creditCardBrand.name]);


  useEffect(() => {
    const total = stateCart.reduce(
      (count, val) => (count + (val.quantity * (val.pricing.modifiers + val.pricing.product))), 0,
    );
    setTotalCar(total);
    updateFilter({
      label: 'Finalizar o pedido',
    });
    if (cart.length < 1) {
      updateFilter({
        categoria: 0, label: 'Todas as categorias', page: 1, search: '',
      });
    }
    getPayments(shop.id).then((response) => {
      setPaymentType(response.data);
    });
    getSessionPag(shop.id).then((response) => {
      PagSeguroDirectPayment.setSessionId(response.data.session);
      handleLoadPaymentsPag();
    });
  }, []);


  const verifyMaxAndMinValue = (gatwayPagseguro) => {
    if (gatwayPagseguro) {
      if (shop.minValuePayOnline >= 0 && totalCar > shop.minValuePayOnline
        && (shop.maxValuePayOnline === 0 || totalCar <= shop.maxValuePayOnline)) {
        return true;
      }
      return false;
    }
    return true;
  };

  const totalWithDelivery = (withdraw ? totalCar : (costDelivery.cost + totalCar));

  return (
    <ContainerCheckout>
      <Row className="d-flex">
        <Grid cols="12 12 12 9">
          <Formik
            onSubmit={submitCheckout}
            initialValues={initialValues}
            validationSchema={checkoutSchema(isNaturalPerson, offlinePayment)}
            render={propsForm => (
              <Form>
                <Row>
                  <Grid cols="12">
                    <SectionTitle>Dados cadastrais</SectionTitle>
                  </Grid>
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
                        inputId="name"
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
                          inputId="razaoSocial"
                          component={Input}
                          isRequired
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 6">
                        <Field
                          label="Nome fantasia"
                          name="fantasia"
                          inputId="fantasia"
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
                      inputId="email"
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
                        inputId="documento"
                        format="###.###.###-##"
                        component={MaskedNumberInput}
                        isRequired
                        type="tel"
                      />
                    </Grid>
                  ) : (
                    <Grid cols="12 6 6 6 6">
                      <Field
                        label="CNPJ"
                        name="documento"
                        inputId="documento"
                        format="##.###.###/####-##"
                        component={MaskedNumberInput}
                        isRequired
                        type="tel"
                      />
                    </Grid>
                  )}
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="Telefone"
                      name="foneFormatted"
                      inputId="foneFormatted"
                      type="tel"
                      component={MaskedNumberInput}
                      format="(##) #####-####"
                      mask=""
                      onValueChange={(value) => {
                        propsForm.setFieldValue('fone', value.value);
                        propsForm.setFieldValue('foneFormatted', value.formattedValue);
                      }}
                      isRequired
                    />
                  </Grid>
                </Row>
                <Row>
                  <Grid cols="12">
                    <SectionTitle>Endereço da entrega</SectionTitle>
                  </Grid>
                  <Grid cols="12 6 6 3 3">
                    <Field
                      label="CEP"
                      name="cep"
                      inputId="cep"
                      type="tel"
                      format="#####-###"
                      component={MaskedNumberInput}
                      onValueChange={(values) => {
                        propsForm.setFieldValue('cep', values.formattedValue);
                        if (values.value.length < 8) {
                          return;
                        }
                        getCep(values.value).then((address) => {
                          if (address.data.logradouro) {
                            const tipoLogradouro = address.data.logradouro.substring(0, address.data.logradouro.indexOf(' ') + 1);
                            const endereco = address.data.logradouro.substring(address.data.logradouro.indexOf(' ') + 1);
                            propsForm.setFieldValue('bairro', address.data.bairro);
                            propsForm.setFieldValue('estado', address.data.uf);
                            propsForm.setFieldValue('codcidade', address.data.ibge);
                            propsForm.setFieldValue('cidade', address.data.localidade);
                            propsForm.setFieldValue('endereco', endereco.trim());
                            propsForm.setFieldValue('tipoLogradouro', tipoLogradouro.trim());
                          }
                        });
                        propsForm.setFieldValue('installments', null);
                        costDeliveryApi(values.value, propsForm);
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
                      label="Número do endereço"
                      name="numero"
                      inputId="numero"
                      component={Input}
                      isRequired
                      type="tel"
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
                                  <ValueDelivery>{intl.formatNumber(costDelivery.cost, { style: 'currency', currency: 'BRL' })}</ValueDelivery>
                                  {(costDelivery.isDeliverable)
                                  || (<ValueDelivery>Não faz entrega nesta região</ValueDelivery>)}
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
                                      disabled={!costDelivery.isDeliverable}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        propsForm.setFieldValue('pickup', !propsForm.values.pickup);
                                        propsForm.setFieldValue('installments', null);
                                        setWithdraw(!propsForm.values.pickup);
                                      }}
                                      onBlur={() => {
                                        getInstallments();
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
                              <strong>{intl.formatNumber(withdraw ? 0 : costDelivery.cost, { style: 'currency', currency: 'BRL' })}</strong>
                            </ResumeItem>
                            <ResumeItem>
                              <span>Total: </span>
                              <strong>{intl.formatNumber(withdraw ? totalCar : (costDelivery.cost + totalCar), { style: 'currency', currency: 'BRL' })}</strong>
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
                                setOfflinePayment(true);
                              }}
                            />
                          </div>
                          <div className="d-flex align-items-center mt-3 mb-3">
                            <Field
                              label="Pague on-line com cartão de crédito"
                              name="gatwayPagseguro"
                              component={RenderCheckbox}
                              onChange={(event) => {
                                event.preventDefault();
                                propsForm.setFieldValue('gatwayPagseguro', !propsForm.values.gatwayPagseguro);
                                propsForm.setFieldValue('offlinePayment', !propsForm.values.offlinePayment);
                                setOfflinePayment(false);
                              }}
                            />
                          </div>
                        </>
                      )}
                      <Alert
                        text={(propsForm.values.gatwayPagseguro && shop.allowPayOnline === 1) ? 'Finalize a compra para realizar o pagamento pelo PagSeguro' : 'Atenção: você irá realizar o pagamento diretamente com o vendedor!'}
                      />
                      {(propsForm.values.gatwayPagseguro
                        && totalCar < shop.minValuePayOnline) && (
                        <Alert
                          text={`Valor mínimo para pagamento on-line ${intl.formatNumber(shop.minValuePayOnline, { style: 'currency', currency: 'BRL' })}`}
                          typeAlert="warning"
                        />
                      )}
                      {(propsForm.values.gatwayPagseguro
                        && (totalCar > shop.maxValuePayOnline && shop.maxValuePayOnline !== 0)) && (
                        <Alert
                          text={`Valor máximo para pagamento on-line ${intl.formatNumber(shop.maxValuePayOnline, { style: 'currency', currency: 'BRL' })}`}
                          typeAlert="warning"
                        />
                      )}
                    </>
                  </Grid>
                  {(propsForm.values.offlinePayment) && (
                    <Grid cols="12">
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
                  {(propsForm.values.gatwayPagseguro && shop.allowPayOnline === 1
                    && verifyMaxAndMinValue(propsForm.values.gatwayPagseguro)) && (
                    <>
                      <Grid
                        cols="12"
                        className="mb-2"
                      >
                        {creditCardBrands.map(item => (
                          <img key={item.code} src={`https://stc.pagseguro.uol.com.br/${item.images.MEDIUM.path}`} title={item.displayName} alt={item.displayName} />
                        ))}
                      </Grid>
                      <Grid cols="12 6 6 6 6">
                        <Field
                          label="Nome do titular"
                          name="nameHolder"
                          inputId="nameHolder"
                          component={Input}
                          isRequired
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 3">
                        <Field
                          label="CPF do titular"
                          name="cpfHolder"
                          inputId="cpfHolder"
                          format="###.###.###-##"
                          component={MaskedNumberInput}
                          isRequired
                          type="tel"
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 3">
                        <Field
                          label="Data Nascimento"
                          name="birthDateHolder"
                          inputId="birthDateHolder"
                          format="##/##/####"
                          component={MaskedNumberInput}
                          onValueChange={(event) => {
                            propsForm.setFieldValue('birthDateHolder', event.formattedValue);
                          }}
                          isRequired
                          onBlur={() => {
                            getHashReady();
                          }}
                          type="tel"
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 9">
                        <Field
                          label="Número do cartão"
                          name="cardNumber_unformatted"
                          inputId="cardNumber_unformatted"
                          format={(creditCardBrand.name === 'amex' ? '#### ###### ######' : '#### #### #### ####')}
                          component={NumberFormat}
                          customInput={InputCrediCard}
                          brand={creditCardBrand.name}
                          onValueChange={(event) => {
                            propsForm.setFieldValue('cardNumber', event.formattedValue);
                            propsForm.setFieldValue('cardNumber_unformatted', event.value);
                            if (event.value.length >= 7) {
                              const cardBin = event.value.substring(0, 7);
                              PagSeguroDirectPayment.getBrand({
                                cardBin,
                                success(reponse) {
                                  setCreditCardBrand(reponse.brand);
                                  setTimeout(() => {
                                    PagSeguroDirectPayment.getInstallments({
                                      amount: totalWithDelivery,
                                      brand: reponse.brand.name,
                                      success(installmentsResponse) {
                                        if (reponse.brand.name) {
                                          // eslint-disable-next-line max-len
                                          const installment = installmentsResponse.installments[reponse.brand.name];
                                          propsForm.setFieldValue('installments', installment[0]);
                                        }
                                      },
                                    });
                                  }, 500);
                                },
                              });
                            }
                          }}
                          isRequired
                          type="tel"
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 3">
                        <Field
                          label="Validade"
                          name="expiration"
                          inputId="expiration"
                          placeholder="MM/AAAA"
                          format="##/####"
                          component={MaskInput}
                          isRequired
                          onValueChange={(value) => {
                            propsForm.setFieldValue('expiration', value.formattedValue);
                          }}
                          type="tel"
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 4">
                        <Field
                          label="Cód. de segurança"
                          name="cvv"
                          inputId="cvv"
                          format={(creditCardBrand.name === 'amex' ? '####' : '###')}
                          component={NumberFormat}
                          customInput={InputCvv}
                          onValueChange={(value) => {
                            propsForm.setFieldValue('cvv', value.value);
                          }}
                          isRequired
                          type="tel"
                        />
                      </Grid>
                      <Grid cols="12 12 12 12 8">
                        <SelectDropDown
                          id="installments"
                          label="Parcelas"
                          value={propsForm.values.installments}
                          cacheOptions
                          options={installments}
                          getOptionLabel={label => (label.totalAmount && (`${label.quantity} ${(label.quantity === 1 ? 'parcela' : 'parcelas')} de ${intl.formatNumber(label.installmentAmount, { style: 'currency', currency: 'BRL' })} | Total: ${intl.formatNumber(label.totalAmount, { style: 'currency', currency: 'BRL' })} `))}
                          getOptionValue={option => option.quantity}
                          onChange={(event) => {
                            propsForm.setFieldValue('installments', event);
                          }}
                          isInvalid={propsForm.errors.installments}
                          touched={propsForm.touched.installments}
                          placeholder="Preencha as informações do cartão para ver as opções de parcelamento"
                          isRequired
                        />
                      </Grid>
                      <Grid cols="12" className="mb-3">
                        <AddressCreditCard
                          onClick={() => {
                            propsForm.setFieldValue('cobrancaCep', propsForm.values.cep);
                            propsForm.setFieldValue('cobrancaBairro', propsForm.values.bairro);
                            propsForm.setFieldValue('cobrancaEstado', propsForm.values.estado);
                            propsForm.setFieldValue('cobrancaComplemento', propsForm.values.complemento);
                            propsForm.setFieldValue('cobrancaNumero', propsForm.values.numero);
                            propsForm.setFieldValue('cobrancaCodcidade', propsForm.values.codcidade);
                            propsForm.setFieldValue('cobrancaCidade', propsForm.values.cidade);
                            propsForm.setFieldValue('cobrancaEndereco', propsForm.values.endereco);
                            propsForm.setFieldValue('cobrancaTipoLogradouro', propsForm.values.tipoLogradouro);
                          }}
                        >
                          {'Clique aqui se o endereço do cartão é o mesmo da entrega'}
                        </AddressCreditCard>
                      </Grid>
                      <Grid cols="12 6 6 3 3">
                        <Field
                          label="CEP"
                          name="cobrancaCep"
                          inputId="cobrancaCep"
                          type="tel"
                          format="#####-###"
                          component={MaskedNumberInput}
                          onValueChange={(values) => {
                            propsForm.setFieldValue('cobrancaCep', values.formattedValue);
                            if (values.value.length < 8) {
                              return;
                            }
                            getCep(values.value).then((address) => {
                              const tipoLogradouro = address.data.logradouro.substring(0, address.data.logradouro.indexOf(' ') + 1);
                              const endereco = address.data.logradouro.substring(address.data.logradouro.indexOf(' ') + 1);
                              propsForm.setFieldValue('cobrancaBairro', address.data.bairro);
                              propsForm.setFieldValue('cobrancaEstado', address.data.uf);
                              propsForm.setFieldValue('cobrancaCodcidade', address.data.ibge);
                              propsForm.setFieldValue('cobrancaCidade', address.data.localidade);
                              propsForm.setFieldValue('cobrancaEndereco', endereco.trim());
                              propsForm.setFieldValue('cobrancaTipoLogradouro', tipoLogradouro.trim());
                            });
                          }}
                          isRequired
                        />
                      </Grid>
                      <Grid cols="12 6 6 3 3">
                        <Field
                          label="Tipo logradouro"
                          name="cobrancaTipoLogradouro"
                          inputId="cobrancaTipoLogradouro"
                          placeholder="Exemplo: Rua"
                          component={Input}
                          isRequired
                        />
                      </Grid>
                      <Grid cols="12 12 6 6 6">
                        <Field
                          label="Endereço"
                          name="cobrancaEndereco"
                          inputId="cobrancaEndereco"
                          component={Input}
                          isRequired
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 4">
                        <Field
                          label="Número"
                          name="cobrancaNumero"
                          inputId="cobrancaNumero"
                          component={Input}
                          isRequired
                          type="tel"
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 8">
                        <Field
                          label="Complemento"
                          name="cobrancaComplemento"
                          inputId="cobrancaComplemento"
                          component={Input}
                        />
                      </Grid>
                      <Grid cols="12 6 6 6 6">
                        <Field
                          label="Bairro"
                          name="cobrancaBairro"
                          inputId="cobrancaBairro"
                          component={Input}
                          isRequired
                        />
                      </Grid>
                      <Grid cols="12 6 6 4 4">
                        <Field
                          label="Cidade"
                          name="cobrancaCidade"
                          inputId="cobrancaCidade"
                          component={Input}
                          isRequired
                          disabled
                        />
                      </Grid>
                      <Grid cols="12 12 6 2 2">
                        <Field
                          label="Estado"
                          name="cobrancaEstado"
                          inputId="cobrancaEstado"
                          component={Input}
                          isRequired
                          disabled
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
                    cols="12 4 6 6 6"
                    className="mt-0 d-flex flex-column"
                  >
                    <div className="mb-2">
                      <img src={IconeShield} height={20} alt="Você está em uma conexão segura" />
                      <span style={{ fontSize: '12px' }}>Você está em uma conexão segura</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#A6A6A6' }}>
                        {'Esse site é protegido por reCAPTCHA e os Termos de Serviço e Política do Google se aplicam'}
                      </p>
                    </div>
                  </Grid>
                  <Grid
                    cols="12 8 6 6 6"
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
                        value={(propsForm.values.gatwayPagseguro) ? 'Finalizar compra' : 'Enviar pedido'}
                        type="submit"
                        isLoading={propsForm.isSubmitting}
                        disabled={(!reCaptchaToken)}
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
