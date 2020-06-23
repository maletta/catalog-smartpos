import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import history from 'utils/history';
import Grid from 'components/Grid';
import Row from 'components/Row';
import Steps from 'components/Steps';
import SectionTitle from 'components/SectionTitle';
import Input from 'components/Form/Input';
import MaskedNumberInput from 'components/Form/MaskedNumberInput';
import Button from 'components/Form/Button';
import SelectDropDown from 'components/Form/SelectDropDown';
import PurchasePrices from 'containers/Cart/components/PurchasePrices';
import ShoppingCartContext from 'contexts/ShoppingCartContext';

import addressSchema from './addressSchema';

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

const RegisterData = () => {
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const [address, setAddress] = useState({
    cep: '',
    endereco: '',
    tipoLogradouro: '',
    tipoEndereco: addressType[0],
    complemento: '',
    numero: '',
    bairro: '',
    cidade: '',
    codcidade: '',
    estado: '',
  });

  console.log('start-sp');
  console.log(shoppingCart);
  console.log('end-sp');

  // data:
  // bairro: "Cidade Antônio Estevão de Carvalho"
  // cep: "08226-021"
  // complemento: ""
  // gia: "1004"
  // ibge: "3550308"
  // localidade: "São Paulo"
  // logradouro: "Rua 18 de Abril"
  // uf: "SP"
  // unidade: ""

  useEffect(() => {
    console.log('use effect');
    if (shoppingCart.cep.length > 0) {
      getCep(shoppingCart.cep).then((({ data }) => {
        const addressData = {
          cep: shoppingCart.cep,
          endereco: data.logradouro,
          tipoLogradouro: data.logradouro.split(' ')[0],
          bairro: data.bairro,
          cidade: data.localidade,
          codcidade: data.ibge,
          estado: data.uf,
        };
        console.log(addressData);
        setAddress(addressData);
      }));
      getCep(shoppingCart.cep).then((console.log));
    }
  }, []);

  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <StepsContainer>
          <Steps activeIndex={2} />
        </StepsContainer>
        <Formik
          enableReinitialize
          onSubmit={() => {
            history.push('/payment');
          }}
          initialValues={address}
          validationSchema={addressSchema()}
          render={propsForm => (
            <Form>
              <Row>
                <Grid cols="12">
                  <SectionTitle>Endereço da entrega</SectionTitle>
                </Grid>
                <Grid cols="12 6 6 4 4">
                  <Field
                    label="CEP"
                    name="cep"
                    inputId="cep"
                    type="tel"
                    format="#####-###"
                    component={MaskedNumberInput}
                    onValueChange={(values) => {
                      if (values.value.length < 8) return;

                      propsForm.setFieldValue('cep', values.formattedValue);
                      getCep(values.value).then((address) => {
                        if (address.data.logradouro) {
                          const tipoLogradouro = address.data.logradouro.substring(
                            0,
                            address.data.logradouro.indexOf(' ') + 1,
                          );
                          const endereco = address.data.logradouro.substring(
                            address.data.logradouro.indexOf(' ') + 1,
                          );
                          propsForm.setFieldValue('endereco', endereco.trim());
                          propsForm.setFieldValue(
                            'tipoLogradouro',
                            tipoLogradouro.trim(),
                          );
                        }
                        propsForm.setFieldValue('bairro', address.data.bairro);
                        propsForm.setFieldValue('estado', address.data.uf);
                        propsForm.setFieldValue('codcidade', address.data.ibge);
                        propsForm.setFieldValue(
                          'cidade',
                          address.data.localidade,
                        );
                      });
                    }}
                    isRequired
                  />
                </Grid>
                {/* <Grid cols="12 6 6 3 3">
                  <Field
                    label="Tipo logradouro"
                    name="tipoLogradouro"
                    inputId="tipoLogradouro"
                    placeholder="Exemplo: Rua"
                    component={Input}
                    isRequired
                  />
                </Grid> */}
                <Grid cols="12 6 6 8 8">
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
              </Row>
              <Row className="d-flex justify-content-end pb-4 pr-3">
                <Button value="Próximo" type="submit" />
              </Row>
            </Form>
          )}
        />
      </Grid>
      <Grid cols="12 12 12 4 4" style={{ padding: 0 }}>
        <PurchasePrices
          // basketCountCart={basketCountCart}
          // totalCart={totalCart}
          // deliveryCost={deliveryCost}
          basketCountCart={shoppingCart.basketCount}
          totalCart={shoppingCart.cart.reduce((count, val) => count + val.quantity * (val.pricing.modifiers + val.pricing.product),
            0)}
          deliveryCost={{}}
          couponValue={-5}
        />
      </Grid>
    </Container>
  );
};

export default RegisterData;
