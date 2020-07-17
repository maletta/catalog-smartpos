import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';

import paths from 'paths';
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
import utilsCEP from './cep';

const Container = styled.div`
  background: #fff;
  padding-right: 0;
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

const initialValue = {
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
};

const RegisterData = () => {
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const [address, setAddress] = useState(initialValue);

  useEffect(() => {
    if (shoppingCart.cep) {
      setAddress(utilsCEP.getAddressByCEP(shoppingCart.cep));
    }
  }, []);

  const handleSubmit = (values) => {
    updateShoppingCart({ address: values });
    history.push(paths.payment);
  };

  const handleChangeCEP = propsForm => async ({ value, formattedValue }) => {
    if (value.length < 8) return;

    propsForm.setFieldValue('cep', formattedValue);

    const { data } = await utilsCEP.requestCEP(value);

    propsForm.setFieldValue('bairro', data.bairro);
    propsForm.setFieldValue('estado', data.uf);
    propsForm.setFieldValue('codcidade', data.ibge);
    propsForm.setFieldValue('cidade', data.localidade);

    if (data.logradouro) {
      const [tipoLogradouro] = data.logradouro.split(' ');

      propsForm.setFieldValue('endereco', data.logradouro);
      propsForm.setFieldValue('tipoLogradouro', tipoLogradouro);
    }
  };

  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <Steps activeIndex={2} />
        <Formik
          enableReinitialize
          onSubmit={handleSubmit}
          initialValues={address}
          validationSchema={addressSchema()}
          render={propsForm => (
            <Form>
              <Row>
                <Grid cols="12">
                  <SectionTitle>Endereço da entrega</SectionTitle>
                </Grid>
                <Grid cols="12 4 4 4 4">
                  <Field
                    label="CEP"
                    name="cep"
                    inputId="cep"
                    type="tel"
                    format="#####-###"
                    component={MaskedNumberInput}
                    onValueChange={handleChangeCEP(propsForm)}
                    isRequired
                  />
                </Grid>
                <Grid cols="12 8 8 8 8">
                  <Field
                    label="Endereço"
                    name="endereco"
                    inputId="endereco"
                    component={Input}
                    isRequired
                  />
                </Grid>
                <Grid cols="12 4 4 4 4">
                  <Field
                    label="Número"
                    name="numero"
                    inputId="numero"
                    component={Input}
                    isRequired
                    type="tel"
                  />
                </Grid>
                <Grid cols="12 8 8 8 8">
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
          basketCountCart={shoppingCart.basketCount}
          totalCart={shoppingCart.totalCart}
          deliveryCost={shoppingCart.deliveryFee || {}}
          couponValue={0}
        />
      </Grid>
    </Container>
  );
};

export default RegisterData;
