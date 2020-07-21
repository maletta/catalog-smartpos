import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import paths from 'paths';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import history from 'utils/history';
import utilsCart from 'utils/cart';
import storage from 'utils/storage';
import formatCurrency from 'utils/formatCurrency';
import Grid from 'components/Grid';
import Row from 'components/Row';
import Steps from 'components/Steps';
import TextArea from 'components/Form/TextArea';
import SectionTitle from 'components/SectionTitle';
import CurrencyInput from 'components/CurrencyInput';
import Input from 'components/Form/Input';
import MaskedNumberInput from 'components/Form/MaskedNumberInput';
import Button from 'components/Form/Button';
import SelectDropDown from 'components/Form/SelectDropDown';
import PurchasePrices from 'containers/Cart/components/PurchasePrices';
import ShopContext from 'contexts/ShopContext';
import Alert from 'components/Alert';
import InputCreditCard from 'components/Form/InputCreditCard';
import MaskInput from 'components/Form/MaskInput';
import InputCvv from 'components/Form/InputCvv';

import FilterContext from 'contexts/FilterContext';

import paymentSchema from './paymentSchema';
import createOrder, { getPayments, getSessionPag } from './requestCheckout';
import AddressCreditCard from './components/AddressCreditCard';
import Change from './components/Change';
import Captcha from './components/Captcha';
import Container from './components/PaymentContainer';

const { PagSeguroDirectPayment } = window.window;

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

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreditCardImg = styled.img`
  border: 1px solid #818181;
  border-radius: 5px;
`;

const Payment = () => {
  const { shop, updateOrderPlaced } = useContext(ShopContext);
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { updateFilter } = useContext(FilterContext);

  const [stateCart] = useState(storage.getLocalCart());
  const totalCar = utilsCart.sumCartTotalPrice(stateCart);

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

  const [showAddress, setShowAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMoneyPayment, setIsMoneyPayment] = useState(false);
  const [moneyChange, setMoneyChange] = useState(0);
  const [changeError, setChangeError] = useState('');

  const recaptchaRef = useRef();

  const creditCardsImages = creditCardBrands.map(item => (
    <CreditCardImg
      key={item.code}
      src={`https://stc.pagseguro.uol.com.br/${item.images.MEDIUM.path}`}
      title={item.displayName}
      alt={item.displayName}
    />
  ))

  const getInstallments = (brand) => {
    if (brand !== 'none') {
      const amount = totalCar + costDelivery.cost;

      PagSeguroDirectPayment.getInstallments({
        amount,
        brand,
        success(response) {
          const installment = response.installments[brand];
          if (installment) {
            setInstallments(installment);
          }
        },
      });
    }
  };

  const handleLoadPaymentsPag = () => {
    const amount = totalCar + costDelivery.cost;

    PagSeguroDirectPayment.getPaymentMethods({
      amount,
      success({ paymentMethods }) {
        const { CREDIT_CARD } = paymentMethods;
        const creditCardBrandList = Object.values(CREDIT_CARD.options);

        setCreditCardBrands(creditCardBrandList);
      },
    });
  };

  const cleanCart = () => {
    localStorage.removeItem('cartInit');
    storage.removeLocalCart();
    updateShoppingCart({ basketCount: 0 });
  };

  useEffect(() => {
    getInstallments(creditCardBrand.name);
  }, [costDelivery.cost, creditCardBrand.name]);

  useEffect(() => {
    updateFilter({
      label: 'Finalizar o pedido',
      categoryName: '',
    });

    getPayments(shop.id).then((response) => {
      setPaymentType(response.data);
    });

    getSessionPag(shop.id).then((response) => {
      PagSeguroDirectPayment.setSessionId(response.data.session);
      handleLoadPaymentsPag();
    });
  }, []);

  const handleSenderHashReady = ({ status, senderHash }) => {
    if (status === 'error') return false;
    return setState({ ...state, senderHash });
  };

  const getHashReady = () => {
    PagSeguroDirectPayment.onSenderHashReady(handleSenderHashReady);
  };

  const differenceBetweenValuesErrorModal = () => {
    Swal.fire({
      type: 'warning',
      title: 'Divergência nos valores',
      text:
        'Pedido com valores divergentes, faça o seu pedido novamente!',
      onClose: () => {
        history.push(paths.home);
      },
    });
  };

  const genericErrorModal = () => {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Erro ao enviar o pedido',
    });
  };

  const sendCheckoutCatch = (response) => {
    const errorFn = response && response.status === 406
      ? differenceBetweenValuesErrorModal
      : genericErrorModal;

    errorFn();
  };

  const sendCheckout = async (values, setSubmitting) => {
    try {
      const { data } = await createOrder(values);
      updateOrderPlaced({
        ...values,
        costDelivery,
        withdraw: shoppingCart.withdraw,
        orderName: data.orderName,
      });

      history.push(paths.conclusion);
    } catch ({ response }) {
      sendCheckoutCatch(response);
      recaptchaRef.current.reset();
    } finally {
      cleanCart();
      setLoading(false);
      setSubmitting(false);
    }
  };

  const verifyMaxAndMinValue = (isGatewayPagseguro) => {
    if (!isGatewayPagseguro) return true;

    const hasMaxValue = shop.maxValuePayOnline > 0;
    const isLessThanMax = totalCar <= shop.maxValuePayOnline;
    const isGreaterThanMin = totalCar >= shop.minValuePayOnline;
    const isWithinMinMax = isGreaterThanMin && isLessThanMax;

    if (hasMaxValue) {
      return isWithinMinMax;
    }
    return isGreaterThanMin;
  };

  const totalWithDelivery = costDelivery.cost + totalCar;

  const submitCheckout = (formValues, { setSubmitting }) => {
    if (changeError) return;

    setLoading(true);

    const values = {
      ...formValues,
      installments: formValues.installments || null,
      tipoPessoa: formValues.tipoPessoa,
      'g-recaptcha-response': reCaptchaToken,
      orderProducts: stateCart,
      deliveryValue: costDelivery.cost || 0,
      ...shoppingCart.personData,
      ...shoppingCart.address,
      changeReceivedValue: formValues.valorRecebido || 0,
      change: moneyChange,
      tipoEndereco: formValues.tipoEndereco.value,
    };

    delete values.personType;

    const paymentType = offlinePayment ? formValues.pagamento : 'Cartão de Crédito';
    updateShoppingCart({ paymentType });

    if (formValues.gatewayPagseguro && state.senderHash) {
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
          setLoading(false);
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
    gatewayPagseguro: shop.allowPayOnline === 1,
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
    cobrancaCep: shoppingCart.address.cep,
    cobrancaBairro: shoppingCart.address.bairro,
    cobrancaEstado: shoppingCart.address.estado,
    cobrancaComplemento: shoppingCart.address.complemento,
    cobrancaNumero: shoppingCart.address.numero,
    cobrancaCodcidade: shoppingCart.address.codcidade,
    cobrancaCidade: shoppingCart.address.cidade,
    cobrancaEndereco: shoppingCart.address.endereco,
    cobrancaTipoLogradouro: shoppingCart.address.tipoLogradouro,
  };

  const MinimumPriceAlert = () => (
    <Alert
      typeAlert="warning"
      text={`Valor mínimo para pagamento on-line ${
        formatCurrency(shop.minValuePayOnline)}
      `}
    />
  );

  const MaximumPriceAlert = () => (
    <Alert
      typeAlert="warning"
      text={`Valor máximo para pagamento on-line ${
        formatCurrency(shop.maxValuePayOnline)}
      `}
    />
  );

  const AlertPaymentType = ({ propsForm }) => (
    <Alert
      text={
        propsForm.values.gatewayPagseguro
          && shop.allowPayOnline
          ? 'Finalize a compra para realizar o pagamento pelo PagSeguro'
          : 'Atenção: você irá realizar o pagamento diretamente com o vendedor!'
      }
    />
  );

  AlertPaymentType.propTypes = {
    propsForm: PropTypes.any.isRequired,
  };

  const handleChangePhysicalPayment = propsForm => () => {
    propsForm.setFieldValue('offlinePayment', true);
    propsForm.setFieldValue('gatewayPagseguro', false);
    setOfflinePayment(true);
  };

  const handleChangeOnlinePayment = propsForm => () => {
    propsForm.setFieldValue('offlinePayment', false);
    propsForm.setFieldValue('gatewayPagseguro', true);
    setOfflinePayment(false);
  };

  const handleChangePaymentType = propsForm => (event) => {
    propsForm.setFieldValue('pagamento', event);
    setIsMoneyPayment(event.descricao === 'Dinheiro');
  };

  const handleChangeMoney = propsForm => (value) => {
    propsForm.setFieldValue('valorRecebido', value.floatValue);
    const totalCartValue = shoppingCart.totalCart;
    const fee = shoppingCart.deliveryFee.cost;
    const totalValue = totalCartValue + fee;
    const changeValue = value.floatValue - totalValue;

    if (changeValue < 0) {
      setChangeError('Troco não pode ser menor que o valor de compra!');
      return;
    }

    setChangeError('');
    setMoneyChange(changeValue);
  };

  const handleChangeCreditCard = propsForm => ({ value, formattedValue }) => {
    propsForm.setFieldValue('cardNumber', formattedValue);
    propsForm.setFieldValue('cardNumber_unformatted', value);

    if (value.length < 7) return;

    PagSeguroDirectPayment.getBrand({
      cardBin: value.substring(0, 7),
      success({ brand }) {
        setCreditCardBrand(brand);

        const installmentSuccess = (resp) => {
          const [firstInstallments] = resp.installments[brand.name];
          propsForm.setFieldValue('installments', firstInstallments);
        };

        PagSeguroDirectPayment.getInstallments({
          amount: totalWithDelivery,
          brand: brand.name,
          success: installmentSuccess,
        });
      },
    });
  };

  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <Steps activeIndex={3} />
        <Formik
          onSubmit={submitCheckout}
          initialValues={initialValues}
          validationSchema={offlinePayment ? {} : paymentSchema}
          render={propsForm => (
            <Form>
              <Row>
                <Grid cols="12">
                  <>
                    <SectionTitle>Pagamento</SectionTitle>
                    {shop.allowPayOnline ? (
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
                            onChange={handleChangePhysicalPayment(propsForm)}
                          />
                          Pague na entrega ou retirada
                        </label>
                        <label htmlFor="onlinePayment">
                          <input
                            name="paymentType"
                            type="radio"
                            style={{ marginRight: '5px' }}
                            id="onlinePayment"
                            value="gatewayPagseguro"
                            checked={!offlinePayment}
                            onChange={handleChangeOnlinePayment(propsForm)}
                          />
                          Pague on-line
                        </label>
                      </RadioContainer>
                    ) : null}
                    <br />
                    <AlertPaymentType propsForm={propsForm} />
                    {propsForm.values.gatewayPagseguro && totalCar < shop.minValuePayOnline && (
                      <MinimumPriceAlert />
                    )}
                    {
                      propsForm.values.gatewayPagseguro
                      && totalCar > shop.maxValuePayOnline
                      && shop.maxValuePayOnline !== 0 && <MaximumPriceAlert />}
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
                            onChange={handleChangePaymentType(propsForm)}
                            isInvalid={propsForm.errors.pagamento}
                            touched={propsForm.touched.pagamento}
                            isRequired
                          />
                        </Grid>
                        {isMoneyPayment
                          && (
                            <>
                              <Grid cols="3">
                                <Field
                                  inputId="valorRecebido"
                                  name="valorRecebido"
                                  label="Troco para quanto?"
                                  component={CurrencyInput}
                                  onValueChange={handleChangeMoney(propsForm)}
                                />
                              </Grid>
                              <Grid cols="3">
                                <Field
                                  inputId="troco"
                                  name="troco"
                                  label="Troco"
                                  component={Change}
                                  value={formatCurrency(moneyChange)}
                                />
                              </Grid>
                            </>
                          )}
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
                    {propsForm.values.gatewayPagseguro
                      && shop.allowPayOnline
                      && verifyMaxAndMinValue(
                        propsForm.values.gatewayPagseguro,
                      ) && (
                        <>
                          <Row>
                            <Grid cols="12" className="mb-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '17px' }}>
                              {creditCardsImages}
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
                                onBlur={getHashReady}
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
                                customInput={InputCreditCard}
                                brand={creditCardBrand.name}
                                onValueChange={handleChangeCreditCard(propsForm)}
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
                              <AddressCreditCard onClick={() => setShowAddress(!showAddress)} />
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
                                      if (values.value.length < 8) return;

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
                        </>
                      )}
                  </>
                </Grid>
              </Row>
              <Captcha
                setReCaptchaToken={setReCaptchaToken}
                recaptchaRef={recaptchaRef}
              />
              <Row className="d-flex justify-content-end pb-4 pr-3">
                <Button
                  type="submit"
                  isLoading={loading}
                  disabled={!reCaptchaToken}
                  value={offlinePayment ? 'Faça o pedido' : 'Finalizar compra'}
                />
              </Row>
            </Form>
          )}
        />
      </Grid>
      <Grid cols="12 12 12 4 4" style={{ padding: 0 }}>
        <PurchasePrices
          basketCountCart={shoppingCart.basketCount}
          totalCart={shoppingCart.totalCart}
          deliveryCost={shoppingCart.deliveryFee}
          couponValue={0}
        />
      </Grid>
    </Container>
  );
};

export default Payment;
