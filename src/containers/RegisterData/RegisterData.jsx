import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';

import paths from 'paths';
import history from 'utils/history';
import utilsCart from 'utils/cart';

import Grid from 'components/Grid';
import Row from 'components/Row';
import Steps from 'components/Steps';
import SectionTitle from 'components/SectionTitle';
import RadioButton from 'components/RadioGroup/RadioButton';
import Input from 'components/Form/Input';
import MaskedNumberInput from 'components/Form/MaskedNumberInput';
import Button from 'components/Form/Button';

import PurchasePrices from 'containers/Cart/components/PurchasePrices';

import ShoppingCartContext from 'contexts/ShoppingCartContext';

import NaturalPersonForm from './components/NaturalPersonForm';
import LegalPersonForm from './components/LegalPersonForm';
import registerSchema from './registerSchema';

const Container = styled.div`
  background: #fff;
  padding-right: 0;
`;

const RegisterData = () => {
  const [personType, setPersonType] = useState('FISICA');
  const isNaturalPerson = personType === 'FISICA';
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);

  const handleSubmit = (values) => {
    updateShoppingCart({
      personData: { ...values, tipoPessoa: values.personType },
    });
    history.push(paths.address);
  };

  const initialValues = {
    personType: 'FISICA',
    name: '',
    razaoSocial: '',
    fantasia: '',
    documento: '',
    email: '',
    foneFormatted: '',
  };

  const handleChangePersonType = propsForm => ({ target }) => {
    setPersonType(target.value);
    propsForm.setFieldValue('personType', target.value);
  };

  const handleChangePhone = propsForm => (value) => {
    propsForm.setFieldValue('fone', value.value);
    propsForm.setFieldValue('foneFormatted', value.formattedValue);
  };

  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <Steps activeIndex={1} />
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={registerSchema(isNaturalPerson)}
          render={propsForm => (
            <Form>
              <Row>
                <Grid cols="12">
                  <SectionTitle>Dados cadastrais</SectionTitle>
                </Grid>
                <Grid cols="12">
                  <p>Cadastro de pessoa:</p>
                  <RadioButton
                    name="personType"
                    id="naturalPerson"
                    label="Física"
                    value="FISICA"
                    checked={personType === 'FISICA'}
                    onChange={handleChangePersonType(propsForm)}
                  />
                  <span style={{ marginLeft: '20px' }} />
                  <RadioButton
                    name="personType"
                    id="legalPerson"
                    label="Jurídica"
                    value="JURIDICA"
                    checked={personType === 'JURIDICA'}
                    onChange={handleChangePersonType(propsForm)}
                  />
                </Grid>
                {isNaturalPerson ? <NaturalPersonForm /> : <LegalPersonForm />}
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
                <Grid cols="12 6 6 6 6">
                  <Field
                    label="Telefone"
                    name="foneFormatted"
                    inputId="foneFormatted"
                    type="tel"
                    component={MaskedNumberInput}
                    format="(##) #####-####"
                    mask=""
                    onValueChange={handleChangePhone(propsForm)}
                    isRequired
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
          totalCart={utilsCart.sumCartTotalPrice(shoppingCart.cart)}
          deliveryCost={shoppingCart.deliveryFee || {}}
          couponValue={0}
        />
      </Grid>
    </Container>
  );
};

export default RegisterData;
