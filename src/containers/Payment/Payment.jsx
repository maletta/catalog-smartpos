import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import paths from 'paths';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import history from 'utils/history';
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
import { requestCEP } from 'api/cepRequests';
import RadioButton from 'components/RadioGroup/RadioButton';

import paymentSchema from './paymentSchema';
import paymentOfflineSchema from './paymentOfflineSchema';
import createOrder, { getPayments, getSessionPag } from './requestCheckout';
import AddressCreditCard from './components/AddressCreditCard';
import Change from './components/Change';
import Captcha from './components/Captcha';
import Container from './components/PaymentContainer';
import CreditCardImage from './components/CreditCardImage';
import {
  pagseguro,
  getInstallments,
  getPaymentMethods,
} from './pagseguro';
import {
  differenceBetweenValuesErrorModal,
  genericErrorModal,
  invalidCardModal,
} from './paymentModal';
import { cleanCart } from './payment-utils';

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

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Payment = () => {
  const { shop, updateOrderPlaced } = useContext(ShopContext);
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { updateFilter } = useContext(FilterContext);

  const [reCaptchaToken, setReCaptchaToken] = useState(false);
  const [offlinePayment, setOfflinePayment] = useState(
    shop.allowPayOnline === 0,
  );
  const [paymentsType, setPaymentType] = useState([]);
  const [creditCardBrands, setCreditCardBrands] = useState([]);
  const [hash, setHash] = useState('');
  const [creditCardBrand, setCreditCardBrand] = useState('none');
  const isAmexCard = creditCardBrand === 'amex';
  const cardFormat = isAmexCard ? '#### ###### ######' : '#### #### #### ####';
  const cvvFormat = isAmexCard ? '####' : '###';

  const [installments, setInstallments] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMoneyPayment, setIsMoneyPayment] = useState(false);
  const [moneyChange, setMoneyChange] = useState(0);
  const [changeError, setChangeError] = useState('');

  const recaptchaRef = useRef();
  const resetRecaptcha = () => recaptchaRef.current.reset();

  const creditCardsImages = creditCardBrands.map(item => (
    <CreditCardImage
      key={item.code}
      name={item.displayName}
      imagePath={item.images.MEDIUM.path}
    />
  ));

  const feeCost = shoppingCart.withdraw ? 0 : shoppingCart.deliveryFee.cost;
  const amount = shoppingCart.totalCart + feeCost;

  useEffect(() => {
    getInstallments(creditCardBrand, amount, setInstallments);
  }, [creditCardBrand]);

  useEffect(() => {
    updateFilter({
      label: 'Finalizar o pedido',
      categoryName: '',
    });

    getPayments(shop.id).then(({ data }) => {
      setPaymentType(data);
    });

    getSessionPag(shop.id).then(({ data }) => {
      pagseguro.setSessionId(data.session);
      getPaymentMethods(amount, setCreditCardBrands);
    });
  }, []);

  useEffect(() => {
    if (shop.is_enableOrder === 0) {
      history.push(paths.home);
    }
  }, []);

  const handleSenderHashReady = ({ status, senderHash }) => {
    if (status === 'error') return false;
    return setHash(senderHash);
  };

  const getHashReady = () => {
    pagseguro.onSenderHashReady(handleSenderHashReady);
  };

  const sendCheckoutCatch = (statusCode) => {
    if (statusCode === 406) {
      differenceBetweenValuesErrorModal();
    } else {
      genericErrorModal();
    }
  };

  const sendCheckout = async (values, setSubmitting) => {
    try {
      const { data } = await createOrder(values);

      updateOrderPlaced({
        ...values,
        costDelivery: shoppingCart.withdraw ? { cost: 0 } : shoppingCart.deliveryFee,
        withdraw: shoppingCart.withdraw,
        orderName: data.orderName,
        address: { ...values },
        personData: { ...values },
        totalCart: data.totalAmount,
        deliveryFee: data.deliveryFee,
        cart: values.orderProducts,
        data,
      });

      cleanCart(updateShoppingCart);

      history.push(paths.conclusion);
    } catch ({ response }) {
      const statusCode = response ? response.status : 0;
      sendCheckoutCatch(statusCode);
      resetRecaptcha();
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const verifyMaxAndMinValue = (isGatewayPagseguro) => {
    if (!isGatewayPagseguro) return true;

    const hasMaxValue = shop.maxValuePayOnline > 0;
    const isLessThanMax = shoppingCart.totalCart <= shop.maxValuePayOnline;
    const isGreaterThanMin = shoppingCart.totalCart >= shop.minValuePayOnline;
    const isWithinMinMax = isGreaterThanMin && isLessThanMax;

    if (hasMaxValue) {
      return isWithinMinMax;
    }
    return isGreaterThanMin;
  };

  const submitCheckout = (formValues, { setSubmitting }) => {
    if (changeError) return;

    setLoading(true);

    const values = {
      ...formValues,
      installments: formValues.installments || null,
      tipoPessoa: formValues.tipoPessoa,
      'g-recaptcha-response': reCaptchaToken,
      orderProducts: shoppingCart.cart,
      deliveryValue: shoppingCart.withdraw ? 0 : shoppingCart.deliveryFee.cost,
      ...shoppingCart.personData,
      ...shoppingCart.address,
      changeReceivedValue: formValues.valorRecebido || 0,
      change: moneyChange,
      tipoEndereco: formValues.tipoEndereco.value,
    };

    if (!formValues.gatewayPagseguro && !hash) {
      sendCheckout(values, setSubmitting);
      return;
    }

    const [expirationMonth, expirationYear] = formValues.expiration.split('/');

    pagseguro.createCardToken({
      cardNumber: formValues.cardNumber_unformatted,
      brand: creditCardBrand,
      cvv: formValues.cvv,
      expirationMonth,
      expirationYear,
      success({ card }) {
        const valuesPag = {
          ...values,
          senderHash: hash,
          cardTokenPag: card.token,
        };
        sendCheckout(valuesPag, setSubmitting);
      },
      error() {
        invalidCardModal();
        setSubmitting(false);
        setLoading(false);
      },
    });
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
    pagamento: { descricao: '' },
    tipoPessoa: [],
    fantasia: '',
    razaoSocial: '',
    pickup: shoppingCart.withdraw,
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

  const MinimumPriceAlert = () => {
    const formattedMinValue = formatCurrency(shop.minValuePayOnline);
    const alertText = `Valor mínimo para pagamento on-line ${formattedMinValue}`;

    return (
      <Alert
        typeAlert="warning"
        text={alertText}
      />
    );
  };

  const MaximumPriceAlert = () => {
    const formattedMaxValue = formatCurrency(shop.maxValuePayOnline);
    const alertText = `Valor máximo para pagamento on-line ${formattedMaxValue}`;

    return (
      <Alert
        typeAlert="warning"
        text={alertText}
      />
    );
  };

  const AlertPaymentType = ({ propsForm }) => {
    const { values } = propsForm;
    const isPagseguroPayment = values.gatewayPagseguro && shop.allowPayOnline;
    const pagseguroPaymentText = 'Finalize a compra para realizar o pagamento pelo PagSeguro';
    const directPaymentText = 'Atenção: você irá realizar o pagamento diretamente com o vendedor!';
    const alertText = isPagseguroPayment ? pagseguroPaymentText : directPaymentText;

    return (
      <Alert text={alertText} />
    );
  };

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
    propsForm.setFieldValue('pagamento', '');
    setOfflinePayment(false);
  };

  const handleChangePaymentType = propsForm => (event) => {
    propsForm.setFieldValue('pagamento', event);
    setIsMoneyPayment(event.descricao === 'Dinheiro');
  };

  const handleChangeMoney = propsForm => (value) => {
    propsForm.setFieldValue('valorRecebido', value.floatValue);

    const totalCartValue = shoppingCart.totalCart;
    const fee = shoppingCart.withdraw ? 0 : shoppingCart.deliveryFee.cost;
    const totalValue = totalCartValue + fee;
    const changeValue = value.floatValue - totalValue;

    if (changeValue < 0) {
      setChangeError('Troco não pode ser menor que o valor de compra!');
    } else {
      setChangeError('');
      setMoneyChange(changeValue || 0);
    }
  };

  const handleChangeCreditCard = propsForm => ({ value, formattedValue }) => {
    propsForm.setFieldValue('cardNumber', formattedValue);
    propsForm.setFieldValue('cardNumber_unformatted', value);

    if (value.length < 7) return;

    pagseguro.getBrand({
      cardBin: value.substring(0, 7),
      success({ brand }) {
        setCreditCardBrand(brand.name);

        const installmentSuccess = (resp) => {
          const [firstInstallments] = resp.installments[brand.name];
          propsForm.setFieldValue('installments', firstInstallments);
        };

        pagseguro.getInstallments({
          amount,
          brand: brand.name,
          success: installmentSuccess,
        });
      },
    });
  };

  const a = shoppingCart.totalCart < shop.minValuePayOnline;
  const b = shoppingCart.totalCart > shop.maxValuePayOnline;
  const c = shop.maxValuePayOnline !== 0;
  const al = isPagseguro => isPagseguro && a && <MinimumPriceAlert />;
  const al2 = isPagseguro => isPagseguro && b && c && <MaximumPriceAlert />;

  const Comp = propsForm => (
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
            format={cardFormat}
            component={NumberFormat}
            customInput={InputCreditCard}
            brand={creditCardBrand}
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
            format={cvvFormat}
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
                isRequired
                label="CEP"
                name="cobrancaCep"
                inputId="cobrancaCep"
                type="tel"
                format="#####-###"
                component={MaskedNumberInput}
                onValueChange={async ({ value, formattedValue }) => {
                  if (value.length < 8) return;

                  const { data } = await requestCEP(value);
                  const [tipoLogradouro, ...endereco] = data.logradouro.split(' ')[0];

                  propsForm.setFieldValue(
                    'cobrancaCep',
                    formattedValue,
                  );
                  propsForm.setFieldValue(
                    'cobrancaBairro',
                    data.bairro,
                  );
                  propsForm.setFieldValue(
                    'cobrancaEstado',
                    data.uf,
                  );
                  propsForm.setFieldValue(
                    'cobrancaCodcidade',
                    data.ibge,
                  );
                  propsForm.setFieldValue(
                    'cobrancaCidade',
                    data.localidade,
                  );
                  propsForm.setFieldValue(
                    'cobrancaEndereco',
                    endereco.trim(),
                  );
                  propsForm.setFieldValue(
                    'cobrancaTipoLogradouro',
                    tipoLogradouro.trim(),
                  );
                }}
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
  );

  const verify = isPag => isPag && shop.allowPayOnline && verifyMaxAndMinValue(isPag);

  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <Steps activeIndex={3} />
        <Formik
          onSubmit={submitCheckout}
          initialValues={initialValues}
          validationSchema={offlinePayment ? paymentOfflineSchema : paymentSchema}
          render={propsForm => (
            <Form>
              <Row>
                <Grid cols="12">
                  <>
                    <SectionTitle>Pagamento</SectionTitle>
                    {shop.allowPayOnline ? (
                      <RadioContainer>
                        <RadioButton
                          name="paymentType"
                          label="Pague na entrega ou retirada"
                          value="offlinePayment"
                          checked={offlinePayment}
                          onChange={handleChangePhysicalPayment(propsForm)}
                        />
                        <RadioButton
                          name="paymentType"
                          label="Pague on-line com cartão de crédito"
                          value="gatewayPagseguro"
                          checked={!offlinePayment}
                          onChange={handleChangeOnlinePayment(propsForm)}
                        />
                      </RadioContainer>
                    ) : null}
                    <br />
                    <AlertPaymentType propsForm={propsForm} />
                    {al(propsForm.values.gatewayPagseguro)}
                    {al2(propsForm.values.gatewayPagseguro)}
                    {propsForm.values.offlinePayment && (
                      <Row>
                        <Grid cols="6">
                          <SelectDropDown
                            id="pagamento"
                            label="Forma de pagamento"
                            cacheOptions
                            value={propsForm.values.pagamento}
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
                                {
                                  changeError ? (
                                    <div>{changeError}</div>
                                  ) : (
                                    <Field
                                      inputId="troco"
                                      name="troco"
                                      label="Troco"
                                      component={Change}
                                      value={formatCurrency(moneyChange)}
                                    />
                                  )
                                }
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
                    {verify(propsForm.values.gatewayPagseguro) && Comp(propsForm)}
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
          deliveryCost={shoppingCart.withdraw ? { cost: 0 } : shoppingCart.deliveryFee}
          couponValue={0}
        />
      </Grid>
    </Container>
  );
};

export default Payment;
