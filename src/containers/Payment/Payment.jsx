import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { injectIntl } from 'react-intl';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import ShoppingCartContext from 'contexts/ShoppingCartContext';
import history from 'utils/history';
import Grid from 'components/Grid';
import Row from 'components/Row';
import Steps from 'components/Steps';
import TextArea from 'components/Form/TextArea';
import SectionTitle from 'components/SectionTitle';
import Input from 'components/Form/Input';
import MaskedNumberInput from 'components/Form/MaskedNumberInput';
import Button from 'components/Form/Button';
import SelectDropDown from 'components/Form/SelectDropDown';
import PurchasePrices from 'containers/Cart/components/PurchasePrices';
import ShopContext from 'contexts/ShopContext';
import Alert from 'components/Alert';
import InputCrediCard from 'components/Form/InputCreditCard';
import MaskInput from 'components/Form/MaskInput';
import InputCvv from 'components/Form/InputCvv';
import IconeShield from 'assets/lock.png';
import FilterContext from 'contexts/FilterContext';

import paymentSchema from './paymentSchema';
import createOrder, { getPayments, getSessionPag } from './requestCheckout';

const { PagSeguroDirectPayment } = window.window;

const AddressCreditCard = styled.span`
  color: #00529b;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
`;

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

const getCep = cep => axios.get(`https://viacep.com.br/ws/${cep}/json/`);

const Container = styled.div`
  background: #fff;
  padding-right: 0;
`;

const StepsContainer = styled.div`
  width: 100%;
`;

const RadioContainer = styled.div`
  display: flex; 
  flex-direction: column;
`;

const Payment = ({ intl }) => {
  const { shop, updateOrderPlaced } = useContext(ShopContext);
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { updateFilter } = useContext(FilterContext);

  const cart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

  const [totalCar, setTotalCar] = useState(0);
  const [costDelivery] = useState({
    cost: 0,
    isDeliverable: false,
  });
  const [reCaptchaToken, setReCaptchaToken] = useState(false);
  const [offlinePayment, setOfflinePayment] = useState(
    shop.allowPayOnline === 0,
  );
  const [paymentsType, setPaymentType] = useState([]);
  const [creditCardBrands, setCreditCardBrands] = useState([]);
  const [state, setState] = useState({
    loadPagseguro: false,
  });
  const [creditCardBrand, setCreditCardBrand] = useState({
    name: 'none',
    cvvSize: 0,
  });
  const [installments, setInstallments] = useState([]);
  const [stateCart] = useState(cart);
  const [showAddress, setShowAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const recaptchaRef = useRef();

  const formatCurrency = price => (
    intl.formatNumber(price, { style: 'currency', currency: 'BRL' })
  );

  const getInstallments = (cost) => {
    if (creditCardBrand.name && creditCardBrand.name !== 'none') {
      const withDelivery = cost
        ? cost + totalCar
        : costDelivery.cost + totalCar;

      PagSeguroDirectPayment.getInstallments({
        amount: shoppingCart.withdraw ? totalCar : withDelivery,
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

  const handleLoadPaymentsPag = () => {
    PagSeguroDirectPayment.getPaymentMethods({
      amount: shoppingCart.withdraw ? totalCar : costDelivery.cost + totalCar,
      success(response) {
        const creditCard = Object.keys(
          response.paymentMethods.CREDIT_CARD.options,
        );
        const creditCardBrandList = creditCard.map(
          item => response.paymentMethods.CREDIT_CARD.options[item],
        );
        setCreditCardBrands(creditCardBrandList);
      },
    });
  };

  const cleanCart = () => {
    localStorage.removeItem('cartInit');
    localStorage.removeItem('cart');
    updateShoppingCart({ basketCount: 0 });
  };

  useEffect(() => {
    getInstallments();
  }, [costDelivery.cost, creditCardBrand.name]);

  useEffect(() => {
    const total = stateCart.reduce(
      (count, val) => count + val.quantity * (val.pricing.modifiers + val.pricing.product),
      0,
    );
    setTotalCar(total);

    updateFilter({
      label: 'Finalizar o pedido',
      categoryName: '',
    });

    if (cart.length === 0) {
      updateFilter({
        categoria: 0,
        label: 'Todas as categorias',
        page: 1,
        search: '',
        categoryName: '',
      });
    }

    getPayments(shop.id).then((response) => {
      setPaymentType(response.data);
    })
      .catch((error) => {
        console.log('Get payments');
        console.error(error);
        // throw new Error(error);
      });

    getSessionPag(shop.id).then((response) => {
      PagSeguroDirectPayment.setSessionId(response.data.session);
      handleLoadPaymentsPag();
    }).catch((error) => {
      console.log('Session pag');
      console.error(error);
      // throw new Error(error);
    });
  }, []);

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

  const sendCheckout = (values, setSubmitting) => {
    createOrder(values)
      .then((response) => {
        cleanCart();
        updateOrderPlaced({
          ...values,
          costDelivery,
          withdraw: shoppingCart.withdraw,
          orderName: response.data.orderName,
        });
        // history.push('/pedido-realizado');
        // history.push('/conclusion');
      })
      .catch((error) => {
        if (error.response && error.response.status === 406) {
          Swal.fire({
            type: 'warning',
            title: 'Divergência nos valores',
            text:
              'Pedido com valores divergentes, faça o seu pedido novamente!',
            onClose: () => {
              cleanCart();
              history.push('/');
            },
          });
          return;
        }

        recaptchaRef.current.reset();
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Erro ao enviar o pedido',
        });
      })
      .finally(() => {
        setLoading(false);
        setSubmitting(false);
      });
  };

  const verifyMaxAndMinValue = (gatwayPagseguro) => {
    if (!gatwayPagseguro) return true;

    if (
      totalCar > shop.minValuePayOnline
      && (shop.maxValuePayOnline === 0 || totalCar <= shop.maxValuePayOnline)
    ) {
      return true;
    }

    return false;
  };

  const totalWithDelivery = shoppingCart.withdraw ? totalCar : costDelivery.cost + totalCar;

  const submitCheckout = (formValues, { setSubmitting }) => {
    setLoading(true);

    const values = {
      ...formValues,
      tipoPessoa: formValues.tipoPessoa.value,
      // tipoEndereco: formValues.tipoEndereco.value,
      'g-recaptcha-response': reCaptchaToken,
      orderProducts: stateCart,
      deliveryValue: costDelivery.cost || 0,
      ...shoppingCart.personData,
      ...shoppingCart.address,
    };
    const paymentType = offlinePayment ? formValues.pagamento : 'Cartão de Crédito';
    updateShoppingCart({ paymentType });

    console.log({ values });
    console.log({ shoppingCart });

    if (formValues.gatwayPagseguro && state.senderHash) {
      const [expirationMonth, expirationYear] = formValues.expiration.split('/');

      PagSeguroDirectPayment.createCardToken({
        cardNumber: formValues.cardNumber_unformatted,
        brand: creditCardBrand.name,
        cvv: formValues.cvv,
        expirationMonth,
        expirationYear,
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
      return;
    }

    sendCheckout(values, setSubmitting);
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
    gatwayPagseguro: shop.allowPayOnline === 1,
    offlinePayment: shop.allowPayOnline === 0,
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

  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <StepsContainer>
          <Steps activeIndex={3} />
        </StepsContainer>
        <Formik
          onSubmit={submitCheckout}
          initialValues={initialValues}
          validationSchema={paymentSchema}
          render={propsForm => (
            <Form>
              <Row>
                <Grid cols="12">
                  <>
                    <SectionTitle>Pagamento</SectionTitle>
                    {shop.allowPayOnline && (
                      <RadioContainer>
                        <label
                          htmlFor="physicalPayment"
                        >
                          <input
                            name="paymentType"
                            type="radio"
                            style={{ marginRight: '5px' }}
                            id="physicalPayment"
                            value="offlinePayment"
                            checked={offlinePayment}
                            onChange={() => {
                              propsForm.setFieldValue('offlinePayment', true);
                              propsForm.setFieldValue('gatwayPagseguro', false);
                              setOfflinePayment(true);
                            }}
                          />
                          Pague na entrega ou retirada
                        </label>
                        <label htmlFor="onlinePayment">
                          <input
                            name="paymentType"
                            type="radio"
                            style={{ marginRight: '5px' }}
                            id="onlinePayment"
                            value="gatwayPagseguro"
                            checked={!offlinePayment}
                            onChange={() => {
                              propsForm.setFieldValue('offlinePayment', false);
                              propsForm.setFieldValue('gatwayPagseguro', true);
                              setOfflinePayment(false);
                            }}
                          />
                          Pague on-line
                        </label>
                      </RadioContainer>
                    )}
                    <br />
                    <Alert
                      text={
                        propsForm.values.gatwayPagseguro
                          && shop.allowPayOnline
                          ? 'Finalize a compra para realizar o pagamento pelo PagSeguro'
                          : 'Atenção: você irá realizar o pagamento diretamente com o vendedor!'
                      }
                    />
                    {propsForm.values.gatwayPagseguro && totalCar < shop.minValuePayOnline && (
                      <Alert
                        text={`Valor mínimo para pagamento on-line ${
                          formatCurrency(shop.minValuePayOnline)}
                        `}
                        typeAlert="warning"
                      />
                    )}
                    {
                      propsForm.values.gatwayPagseguro
                      && totalCar > shop.maxValuePayOnline
                      && shop.maxValuePayOnline !== 0 && (
                        <Alert
                          text={`Valor máximo para pagamento on-line ${
                            formatCurrency(shop.maxValuePayOnline)}
                          `}
                          typeAlert="warning"
                        />
                      )}
                    {propsForm.values.offlinePayment && (
                      <Row>
                        <Grid cols="6">
                          <SelectDropDown
                            id="pagamento"
                            label="Forma de pagamento"
                            cacheOptions
                            options={paymentsType}
                            getOptionLabel={label => label.descricao}
                            getOptionValue={option => option.codigo}
                            onChange={event => propsForm.setFieldValue('pagamento', event)
                            }
                            isInvalid={propsForm.errors.pagamento}
                            touched={propsForm.touched.pagamento}
                            isRequired
                          />
                        </Grid>
                      </Row>
                    )}
                    {offlinePayment && (
                      <Row>
                        <Grid cols="12">
                          <Field
                            inputId="observacao"
                            label="Observação"
                            name="observacao"
                            component={TextArea}
                            rows={3}
                          />
                        </Grid>
                      </Row>
                    )}
                    {propsForm.values.gatwayPagseguro
                      && shop.allowPayOnline
                      && verifyMaxAndMinValue(
                        propsForm.values.gatwayPagseguro,
                      ) && (
                        <>
                          <Row>
                            <Grid cols="12" className="mb-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '17px' }}>
                              {creditCardBrands.map(item => (
                                <img
                                  key={item.code}
                                  src={`https://stc.pagseguro.uol.com.br/${item.images.MEDIUM.path}`}
                                  title={item.displayName}
                                  alt={item.displayName}
                                  style={{ border: '1px solid #818181', borderRadius: '5px' }}
                                />
                              ))}
                            </Grid>
                          </Row>
                          <Row>
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
                                label="Data Nascimento"
                                name="birthDateHolder"
                                inputId="birthDateHolder"
                                format="##/##/####"
                                component={MaskedNumberInput}
                                onValueChange={(event) => {
                                  propsForm.setFieldValue(
                                    'birthDateHolder',
                                    event.formattedValue,
                                  );
                                }}
                                isRequired
                                onBlur={() => {
                                  getHashReady();
                                }}
                                type="tel"
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
                          </Row>
                          <Row>
                            <Grid cols="12 6 6 6 9">
                              <Field
                                label="Número do cartão"
                                name="cardNumber_unformatted"
                                inputId="cardNumber_unformatted"
                                format={
                                  creditCardBrand.name === 'amex'
                                    ? '#### ###### ######'
                                    : '#### #### #### ####'
                                }
                                component={NumberFormat}
                                customInput={InputCrediCard}
                                brand={creditCardBrand.name}
                                onValueChange={(event) => {
                                  console.log({ card: event.value });

                                  propsForm.setFieldValue(
                                    'cardNumber',
                                    event.formattedValue,
                                  );
                                  propsForm.setFieldValue(
                                    'cardNumber_unformatted',
                                    event.value,
                                  );
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
                                                const installment = installmentsResponse
                                                  .installments[reponse.brand.name];
                                                propsForm.setFieldValue(
                                                  'installments',
                                                  installment[0],
                                                );
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
                                  propsForm.setFieldValue(
                                    'expiration',
                                    value.formattedValue,
                                  );
                                }}
                                type="tel"
                              />
                            </Grid>
                          </Row>

                          <Row>
                            <Grid cols="12 6 6 6 4">
                              <Field
                                label="Cód. de segurança"
                                name="cvv"
                                inputId="cvv"
                                format={
                                  creditCardBrand.name === 'amex' ? '####' : '###'
                                }
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
                                getOptionLabel={label => label.totalAmount
                                  && `${label.quantity} 
                                  ${label.quantity === 1 ? 'parcela' : 'parcelas'} de 
                                  ${formatCurrency(label.installmentAmount)} | Total: 
                                  ${formatCurrency(label.totalAmount)}`
                                }
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
                          </Row>
                          <Row>
                            <Grid cols="12" className="mb-3">
                              <AddressCreditCard
                                onClick={() => {
                                  setShowAddress(!showAddress);
                                  // propsForm.setFieldValue(
                                  //   'cobrancaCep',
                                  //   propsForm.values.cep,
                                  // );
                                  // propsForm.setFieldValue(
                                  //   'cobrancaBairro',
                                  //   propsForm.values.bairro,
                                  // );
                                  // propsForm.setFieldValue(
                                  //   'cobrancaEstado',
                                  //   propsForm.values.estado,
                                  // );
                                  // propsForm.setFieldValue(
                                  //   'cobrancaComplemento',
                                  //   propsForm.values.complemento,
                                  // );
                                  // propsForm.setFieldValue(
                                  //   'cobrancaNumero',
                                  //   propsForm.values.numero,
                                  // );
                                  // propsForm.setFieldValue(
                                  //   'cobrancaCodcidade',
                                  //   propsForm.values.codcidade,
                                  // );
                                  // propsForm.setFieldValue(
                                  //   'cobrancaCidade',
                                  //   propsForm.values.cidade,
                                  // );
                                  // propsForm.setFieldValue(
                                  //   'cobrancaEndereco',
                                  //   propsForm.values.endereco,
                                  // );
                                  // propsForm.setFieldValue(
                                  //   'cobrancaTipoLogradouro',
                                  //   propsForm.values.tipoLogradouro,
                                  // );
                                }}
                              >
                                Endereço do cartão é diferente do endereço de entrega?
                              </AddressCreditCard>
                            </Grid>
                          </Row>
                          {showAddress && (
                            <>
                              <Row>
                                <Grid cols="12 6 4 4 4">
                                  <Field
                                    label="CEP"
                                    name="cobrancaCep"
                                    inputId="cobrancaCep"
                                    type="tel"
                                    format="#####-###"
                                    component={MaskedNumberInput}
                                    onValueChange={(values) => {
                                      if (values.value.length < 8) {
                                        return;
                                      }

                                      propsForm.setFieldValue(
                                        'cobrancaCep',
                                        values.formattedValue,
                                      );
                                      getCep(values.value).then((address) => {
                                        const tipoLogradouro = address.data.logradouro.substring(
                                          0,
                                          address.data.logradouro.indexOf(' ') + 1,
                                        );
                                        const endereco = address.data.logradouro.substring(
                                          address.data.logradouro.indexOf(' ') + 1,
                                        );
                                        propsForm.setFieldValue(
                                          'cobrancaBairro',
                                          address.data.bairro,
                                        );
                                        propsForm.setFieldValue(
                                          'cobrancaEstado',
                                          address.data.uf,
                                        );
                                        propsForm.setFieldValue(
                                          'cobrancaCodcidade',
                                          address.data.ibge,
                                        );
                                        propsForm.setFieldValue(
                                          'cobrancaCidade',
                                          address.data.localidade,
                                        );
                                        propsForm.setFieldValue(
                                          'cobrancaEndereco',
                                          endereco.trim(),
                                        );
                                        propsForm.setFieldValue(
                                          'cobrancaTipoLogradouro',
                                          tipoLogradouro.trim(),
                                        );
                                      });
                                    }}
                                    isRequired
                                  />
                                </Grid>
                                <Grid cols="12 6 8 8 8">
                                  <Field
                                    label="Endereço"
                                    name="cobrancaEndereco"
                                    inputId="cobrancaEndereco"
                                    component={Input}
                                    isRequired
                                  />
                                </Grid>
                              </Row>
                              <Row>
                                <Grid cols="12 6 4 4 4">
                                  <Field
                                    label="Número"
                                    name="cobrancaNumero"
                                    inputId="cobrancaNumero"
                                    component={Input}
                                    isRequired
                                    type="tel"
                                  />
                                </Grid>
                                <Grid cols="12 6 8 8 8">
                                  <Field
                                    label="Complemento"
                                    name="cobrancaComplemento"
                                    inputId="cobrancaComplemento"
                                    component={Input}
                                  />
                                </Grid>
                              </Row>
                              <Row>
                                <Grid cols="12 12 12 12 12">
                                  <Field
                                    label="Bairro"
                                    name="cobrancaBairro"
                                    inputId="cobrancaBairro"
                                    component={Input}
                                    isRequired
                                  />
                                </Grid>
                              </Row>
                              <Row>
                                <Grid cols="12 6 6 6 6">
                                  <Field
                                    label="Cidade"
                                    name="cobrancaCidade"
                                    inputId="cobrancaCidade"
                                    component={Input}
                                    isRequired
                                    disabled
                                  />
                                </Grid>
                                <Grid cols="12 6 6 6 6">
                                  <Field
                                    label="Estado"
                                    name="cobrancaEstado"
                                    inputId="cobrancaEstado"
                                    component={Input}
                                    isRequired
                                    disabled
                                  />
                                </Grid>
                              </Row>
                            </>
                          )}
                          <Row>
                            <Grid
                              cols="12 4 6 6 6"
                              className="mt-0 d-flex flex-column"
                            >
                              <div className="mb-2">
                                <img
                                  src={IconeShield}
                                  height={20}
                                  alt="Você está em uma conexão segura"
                                />
                                <span style={{ fontSize: '12px' }}>
                                  Você está em uma conexão segura
                                </span>
                              </div>
                              <div>
                                <p style={{ fontSize: '12px', color: '#A6A6A6' }}>
                                  Esse site é protegido por reCAPTCHA e os Termos de Serviço e Política do Google se aplicam
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
                                onChange={setReCaptchaToken}
                              />
                            </Grid>
                          </Row>
                          <Row className="d-flex justify-content-end pb-4 pr-3">
                            <Button
                              isLoading={loading}
                              type="submit"
                              disabled={!reCaptchaToken}
                              value={offlinePayment ? 'Faça o pedido' : 'Finalizar compra'}
                            />
                          </Row>
                        </>
                      )}
                  </>
                </Grid>
              </Row>
            </Form>
          )}
        />
        {
          offlinePayment && (
            <Row>
              <Grid
                cols="12 4 6 6 6"
                className="mt-0 d-flex flex-column"
              >
                <div className="mb-2">
                  <img
                    src={IconeShield}
                    height={20}
                    alt="Você está em uma conexão segura"
                  />
                  <span style={{ fontSize: '12px' }}>
                    Você está em uma conexão segura
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#A6A6A6' }}>
                    Esse site é protegido por reCAPTCHA e os Termos de Serviço e Política do Google se aplicam
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
                  onChange={setReCaptchaToken}
                />
              </Grid>
            </Row>
          )
        }
      </Grid>
      <Grid cols="12 12 12 4 4" style={{ padding: 0 }}>
        <PurchasePrices
          basketCountCart={shoppingCart.basketCount}
          totalCart={
            shoppingCart.cart.reduce(
              (count, val) => count + val.quantity * (val.pricing.modifiers + val.pricing.product),
              0,
            )
          }
          deliveryCost={shoppingCart.deliveryFee || {}}
          couponValue={-5}
        />
      </Grid>
    </Container>
  );
};

Payment.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Payment);
