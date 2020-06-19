import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { injectIntl, intlShape } from "react-intl";
import axios from "axios";
import NumberFormat from "react-number-format";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

import ShoppingCartContext from "contexts/ShoppingCartContext";
import history from "utils/history";
import Grid from "components/Grid";
import Row from "components/Row";
import Steps from "components/Steps";
import SectionTitle from "components/SectionTitle";
import Input from "components/Form/Input";
import MaskedNumberInput from "components/Form/MaskedNumberInput";
import Button from "components/Form/Button";
import TextArea from "components/Form/TextArea";
import SelectDropDown from "components/Form/SelectDropDown";
import PurchasePrices from "containers/Cart/components/PurchasePrices";
import ShopContext from "contexts/ShopContext";
import RenderCheckbox from "components/Form/RenderCheckbox";
import Alert from "components/Alert";
import InputCrediCard from "components/Form/InputCreditCard";
import MaskInput from "components/Form/MaskInput";
import InputCvv from "components/Form/InputCvv";
import IconeShield from "assets/lock.png";
import FilterContext from "contexts/FilterContext";

import checkoutSchema from "./checkoutSchema";
import createOrder, { getPayments, getSessionPag } from "./requestCheckout";

const { PagSeguroDirectPayment } = window.window;

const AddressCreditCard = styled.span`
  color: #00529b;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
`;

const addressType = [
  {
    label: "Residencial",
    value: "RESIDENCIAL"
  },
  {
    label: "Comercial",
    value: "COMERCIAL"
  }
];

const getCep = cep => axios.get(`https://viacep.com.br/ws/${cep}/json/`);

const Container = styled.div`
  background: #fff;
  padding-right: 0;
`;

const StepsContainer = styled.div`
  width: 100%;
`;

const RegisterData = ({ intl }) => {
  const { shop, updateOrderPlaced } = useContext(ShopContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const { updateFilter } = useContext(FilterContext);

  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const [totalCar, setTotalCar] = useState(0);
  const [isNaturalPerson, setNaturalPerson] = useState(true);
  const [costDelivery, setCostDelivery] = useState({
    cost: 0,
    isDeliverable: false
  });
  const [reCaptchaToken, setReCaptchaToken] = useState(false);
  const [offlinePayment, setOfflinePayment] = useState(
    shop.allowPayOnline === 0
  );
  const [paymentsType, setPaymentType] = useState([]);
  const [withdraw, setWithdraw] = useState(false);
  const [creditCardBrands, setCreditCardBrands] = useState([]);
  const [state, setState] = useState({
    loadPagseguro: false
  });
  const [creditCardBrand, setCreditCardBrand] = useState({
    name: "none",
    cvvSize: 0
  });
  const [installments, setInstallments] = useState([]);
  const [stateCart] = useState(cart);

  const recaptchaRef = useRef();

  useEffect(() => {
    getInstallments();
  }, [costDelivery.cost]);

  useEffect(() => {
    getInstallments();
  }, [creditCardBrand.name]);

  useEffect(() => {
    const total = stateCart.reduce(
      (count, val) =>
        count + val.quantity * (val.pricing.modifiers + val.pricing.product),
      0
    );
    setTotalCar(total);
    updateFilter({
      label: "Finalizar o pedido",
      categoryName: ""
    });
    if (cart.length < 1) {
      updateFilter({
        categoria: 0,
        label: "Todas as categorias",
        page: 1,
        search: "",
        categoryName: ""
      });
    }
    getPayments(shop.id).then(response => {
      setPaymentType(response.data);
    });
    getSessionPag(shop.id).then(response => {
      PagSeguroDirectPayment.setSessionId(response.data.session);
      handleLoadPaymentsPag();
    });
  }, []);

  const getInstallments = cost => {
    if (creditCardBrand.name && creditCardBrand.name !== "none") {
      const withDelivery = cost
        ? cost + totalCar
        : costDelivery.cost + totalCar;
      PagSeguroDirectPayment.getInstallments({
        amount: withdraw ? totalCar : withDelivery,
        // maxInstallmentNoInterest: 2,
        brand: creditCardBrand.name,
        success(response) {
          const installment = response.installments[creditCardBrand.name];
          if (installment) {
            setInstallments(installment);
          }
        }
      });
    }
  };

  const getHashReady = () => {
    PagSeguroDirectPayment.onSenderHashReady(resPag => {
      if (resPag.status === "error") {
        return false;
      }
      return setState({
        ...state,
        senderHash: resPag.senderHash
      });
    });
  };

  const sendCheckout = (values, setSubmitting) => {
    createOrder(values)
      .then(response => {
        cleanCart();
        updateOrderPlaced({
          ...values,
          costDelivery,
          withdraw,
          orderName: response.data.orderName
        });
        history.push("/pedido-realizado");
      })
      .catch(error => {
        if (error.response && error.response.status === 406) {
          Swal.fire({
            type: "warning",
            title: "Divergência nos valores",
            text:
              "Pedido com valores divergentes, faça o seu pedido novamente!",
            onClose: () => {
              cleanCart();
              history.push("/");
            }
          });
        } else {
          recaptchaRef.current.reset();
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Erro ao enviar o pedido"
          });
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const cleanCart = () => {
    localStorage.removeItem("cartInit");
    localStorage.removeItem("cart");
    updateShoppingCart({
      basketCount: 0
    });
  };

  const handleLoadPaymentsPag = () => {
    PagSeguroDirectPayment.getPaymentMethods({
      amount: withdraw ? totalCar : costDelivery.cost + totalCar,
      success(response) {
        const creditCard = Object.keys(
          response.paymentMethods.CREDIT_CARD.options
        );
        const creditCardBrandList = creditCard.map(
          item => response.paymentMethods.CREDIT_CARD.options[item]
        );
        setCreditCardBrands(creditCardBrandList);
      }
    });
  };

  const verifyMaxAndMinValue = gatwayPagseguro => {
    if (gatwayPagseguro) {
      if (
        shop.minValuePayOnline >= 0 &&
        totalCar > shop.minValuePayOnline &&
        (shop.maxValuePayOnline === 0 || totalCar <= shop.maxValuePayOnline)
      ) {
        return true;
      }
      return false;
    }
    return true;
  };

  const verifyRecaptcha = value => {
    setReCaptchaToken(value);
  };

  const enableSubmitButton = () => {
    if (
      (shop.deliveryMode === "DELIVERY" && !costDelivery.isDeliverable) ||
      !reCaptchaToken
    ) {
      return true;
    }

    return false;
  };

  const totalWithDelivery = withdraw ? totalCar : costDelivery.cost + totalCar;

  const submitCheckout = (formValues, { setSubmitting }) => {
    const values = {
      ...formValues,
      tipoPessoa: formValues.tipoPessoa.value,
      tipoEndereco: formValues.tipoEndereco.value,
      "g-recaptcha-response": reCaptchaToken,
      orderProducts: stateCart,
      deliveryValue: formValues.pickup ? 0 : costDelivery.cost
    };

    // Pagamento pela pagseguro
    if (formValues.gatwayPagseguro && state.senderHash) {
      PagSeguroDirectPayment.createCardToken({
        cardNumber: formValues.cardNumber_unformatted, // Número do cartão de crédito
        brand: creditCardBrand.name, // Bandeira do cartão
        cvv: formValues.cvv, // CVV do cartão
        expirationMonth: formValues.expiration.split("/")[0], // Mês da expiração do cartão
        expirationYear: formValues.expiration.split("/")[1], // Ano da expiração do cartão, é necessário os 4 dígitos.
        success(response) {
          const valuesPag = {
            ...values,
            senderHash: state.senderHash,
            cardTokenPag: response.card.token
          };
          sendCheckout(valuesPag, setSubmitting);
        },
        error() {
          Swal.fire({
            type: "warning",
            title: "Cartão inválido",
            text: "Por favor verifique seu cartão de crédito!",
            showConfirmButton: true,
            showCloseButton: true
          });
          setSubmitting(false);
        }
      });
    } else {
      sendCheckout(values, setSubmitting);
    }
  };

  const initialValues = {
    name: "",
    email: "",
    fone: "",
    foneFormatted: "",
    cep: "",
    documento: "",
    endereco: "",
    tipoLogradouro: "",
    tipoEndereco: addressType[0],
    complemento: "",
    numero: "",
    bairro: "",
    cidade: "",
    codcidade: "",
    estado: "",
    pagamento: "",
    tipoPessoa: [],
    fantasia: "",
    razaoSocial: "",
    pickup: false,
    catalog_id: shop.id,
    loja: shop.codigo,
    gatwayPagseguro: shop.allowPayOnline === 1,
    offlinePayment: shop.allowPayOnline === 0,
    nameHolder: "",
    cardNumber: "",
    cardNumber_unformatted: "",
    expiration: "",
    expiration_unformatted: "",
    allowedLimit: true,
    cvv: "",
    installments: "",
    cpfHolder: "",
    birthDateHolder: "",
    cobrancaCep: "",
    cobrancaBairro: "",
    cobrancaEstado: "",
    cobrancaComplemento: "",
    cobrancaNumero: "",
    cobrancaCodcidade: "",
    cobrancaCidade: "",
    cobrancaEndereco: "",
    cobrancaTipoLogradouro: ""
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
          validationSchema={checkoutSchema(isNaturalPerson, offlinePayment)}
          render={propsForm => (
            <Form>
              <Row>
                <Grid cols="12">
                  <>
                    <SectionTitle>{"Pagamento"}</SectionTitle>
                    {shop.allowPayOnline === 1 && (
                      <>
                        <div className="d-flex align-items-center mt-3 mb-3">
                          <Field
                            label="Pague na entrega ou retirada"
                            name="offlinePayment"
                            component={RenderCheckbox}
                            onChange={event => {
                              event.preventDefault();
                              propsForm.setFieldValue(
                                "offlinePayment",
                                !propsForm.values.offlinePayment
                              );
                              propsForm.setFieldValue(
                                "gatwayPagseguro",
                                !propsForm.values.gatwayPagseguro
                              );
                              setOfflinePayment(true);
                            }}
                          />
                        </div>
                        <div className="d-flex align-items-center mt-3 mb-3">
                          <Field
                            label="Pague on-line com cartão de crédito"
                            name="gatwayPagseguro"
                            component={RenderCheckbox}
                            onChange={event => {
                              event.preventDefault();
                              propsForm.setFieldValue(
                                "gatwayPagseguro",
                                !propsForm.values.gatwayPagseguro
                              );
                              propsForm.setFieldValue(
                                "offlinePayment",
                                !propsForm.values.offlinePayment
                              );
                              setOfflinePayment(false);
                            }}
                          />
                        </div>
                      </>
                    )}
                    <Alert
                      text={
                        propsForm.values.gatwayPagseguro &&
                        shop.allowPayOnline === 1
                          ? "Finalize a compra para realizar o pagamento pelo PagSeguro"
                          : "Atenção: você irá realizar o pagamento diretamente com o vendedor!"
                      }
                    />
                    {propsForm.values.gatwayPagseguro &&
                      totalCar < shop.minValuePayOnline && (
                        <Alert
                          text={`Valor mínimo para pagamento on-line ${intl.formatNumber(
                            shop.minValuePayOnline,
                            { style: "currency", currency: "BRL" }
                          )}`}
                          typeAlert="warning"
                        />
                      )}
                    {propsForm.values.gatwayPagseguro &&
                      totalCar > shop.maxValuePayOnline &&
                      shop.maxValuePayOnline !== 0 && (
                        <Alert
                          text={`Valor máximo para pagamento on-line ${intl.formatNumber(
                            shop.maxValuePayOnline,
                            { style: "currency", currency: "BRL" }
                          )}`}
                          typeAlert="warning"
                        />
                      )}

                    {propsForm.values.offlinePayment && (
                      <Grid cols="12">
                        <SelectDropDown
                          id="pagamento"
                          label="Forma de pagamento"
                          cacheOptions
                          options={paymentsType}
                          getOptionLabel={label => label.descricao}
                          getOptionValue={option => option.codigo}
                          onChange={event =>
                            propsForm.setFieldValue("pagamento", event)
                          }
                          isInvalid={propsForm.errors.pagamento}
                          touched={propsForm.touched.pagamento}
                          isRequired
                        />
                      </Grid>
                    )}
                    {propsForm.values.gatwayPagseguro &&
                      shop.allowPayOnline === 1 &&
                      verifyMaxAndMinValue(
                        propsForm.values.gatwayPagseguro
                      ) && (
                        <>
                          <Grid cols="12" className="mb-2">
                            {creditCardBrands.map(item => (
                              <img
                                key={item.code}
                                src={`https://stc.pagseguro.uol.com.br/${item.images.MEDIUM.path}`}
                                title={item.displayName}
                                alt={item.displayName}
                              />
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
                              onValueChange={event => {
                                propsForm.setFieldValue(
                                  "birthDateHolder",
                                  event.formattedValue
                                );
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
                              format={
                                creditCardBrand.name === "amex"
                                  ? "#### ###### ######"
                                  : "#### #### #### ####"
                              }
                              component={NumberFormat}
                              customInput={InputCrediCard}
                              brand={creditCardBrand.name}
                              onValueChange={event => {
                                propsForm.setFieldValue(
                                  "cardNumber",
                                  event.formattedValue
                                );
                                propsForm.setFieldValue(
                                  "cardNumber_unformatted",
                                  event.value
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
                                              // eslint-disable-next-line max-len
                                              const installment =
                                                installmentsResponse
                                                  .installments[
                                                  reponse.brand.name
                                                ];
                                              propsForm.setFieldValue(
                                                "installments",
                                                installment[0]
                                              );
                                            }
                                          }
                                        });
                                      }, 500);
                                    }
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
                              onValueChange={value => {
                                propsForm.setFieldValue(
                                  "expiration",
                                  value.formattedValue
                                );
                              }}
                              type="tel"
                            />
                          </Grid>
                          <Grid cols="12 6 6 6 4">
                            <Field
                              label="Cód. de segurança"
                              name="cvv"
                              inputId="cvv"
                              format={
                                creditCardBrand.name === "amex" ? "####" : "###"
                              }
                              component={NumberFormat}
                              customInput={InputCvv}
                              onValueChange={value => {
                                propsForm.setFieldValue("cvv", value.value);
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
                              getOptionLabel={label =>
                                label.totalAmount &&
                                `${label.quantity} ${
                                  label.quantity === 1 ? "parcela" : "parcelas"
                                } de ${intl.formatNumber(
                                  label.installmentAmount,
                                  { style: "currency", currency: "BRL" }
                                )} | Total: ${intl.formatNumber(
                                  label.totalAmount,
                                  { style: "currency", currency: "BRL" }
                                )} `
                              }
                              getOptionValue={option => option.quantity}
                              onChange={event => {
                                propsForm.setFieldValue("installments", event);
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
                                propsForm.setFieldValue(
                                  "cobrancaCep",
                                  propsForm.values.cep
                                );
                                propsForm.setFieldValue(
                                  "cobrancaBairro",
                                  propsForm.values.bairro
                                );
                                propsForm.setFieldValue(
                                  "cobrancaEstado",
                                  propsForm.values.estado
                                );
                                propsForm.setFieldValue(
                                  "cobrancaComplemento",
                                  propsForm.values.complemento
                                );
                                propsForm.setFieldValue(
                                  "cobrancaNumero",
                                  propsForm.values.numero
                                );
                                propsForm.setFieldValue(
                                  "cobrancaCodcidade",
                                  propsForm.values.codcidade
                                );
                                propsForm.setFieldValue(
                                  "cobrancaCidade",
                                  propsForm.values.cidade
                                );
                                propsForm.setFieldValue(
                                  "cobrancaEndereco",
                                  propsForm.values.endereco
                                );
                                propsForm.setFieldValue(
                                  "cobrancaTipoLogradouro",
                                  propsForm.values.tipoLogradouro
                                );
                              }}
                            >
                              {
                                "Clique aqui se o endereço do cartão é o mesmo da entrega"
                              }
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
                              onValueChange={values => {
                                propsForm.setFieldValue(
                                  "cobrancaCep",
                                  values.formattedValue
                                );
                                if (values.value.length < 8) {
                                  return;
                                }
                                getCep(values.value).then(address => {
                                  const tipoLogradouro = address.data.logradouro.substring(
                                    0,
                                    address.data.logradouro.indexOf(" ") + 1
                                  );
                                  const endereco = address.data.logradouro.substring(
                                    address.data.logradouro.indexOf(" ") + 1
                                  );
                                  propsForm.setFieldValue(
                                    "cobrancaBairro",
                                    address.data.bairro
                                  );
                                  propsForm.setFieldValue(
                                    "cobrancaEstado",
                                    address.data.uf
                                  );
                                  propsForm.setFieldValue(
                                    "cobrancaCodcidade",
                                    address.data.ibge
                                  );
                                  propsForm.setFieldValue(
                                    "cobrancaCidade",
                                    address.data.localidade
                                  );
                                  propsForm.setFieldValue(
                                    "cobrancaEndereco",
                                    endereco.trim()
                                  );
                                  propsForm.setFieldValue(
                                    "cobrancaTipoLogradouro",
                                    tipoLogradouro.trim()
                                  );
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
                              <span style={{ fontSize: "12px" }}>
                                Você está em uma conexão segura
                              </span>
                            </div>
                            <div>
                              <p style={{ fontSize: "12px", color: "#A6A6A6" }}>
                                {
                                  "Esse site é protegido por reCAPTCHA e os Termos de Serviço e Política do Google se aplicam"
                                }
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
                          <Grid
                            cols="12"
                            className="d-flex justify-content-end"
                          >
                            <div>
                              <Button
                                value={
                                  propsForm.values.gatwayPagseguro
                                    ? "Finalizar compra"
                                    : "Enviar pedido"
                                }
                                type="submit"
                                isLoading={propsForm.isSubmitting}
                                disabled={enableSubmitButton()}
                              />
                            </div>
                          </Grid>
                        </>
                      )}
                  </>
                </Grid>
              </Row>
            </Form>
          )}
        />
        <Row className="d-flex justify-content-end pb-4 pr-3">
          <Button
            value="Finalizar compra"
            onClick={() => history.push("/conclusion")}
          />
        </Row>
      </Grid>
      <Grid cols="12 12 12 4 4" style={{ padding: 0 }}>
        <PurchasePrices
          // basketCountCart={basketCountCart}
          // totalCart={totalCart}
          // deliveryCost={deliveryCost}
          basketCountCart={0}
          totalCart={0}
          deliveryCost={{}}
          couponValue={-5}
        />
      </Grid>
    </Container>
  );
};

export default injectIntl(RegisterData);
