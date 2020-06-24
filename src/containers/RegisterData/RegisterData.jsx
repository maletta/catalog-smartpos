import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';

import history from 'utils/history';
import Grid from 'components/Grid';
import Row from 'components/Row';
import Steps from 'components/Steps';
import SectionTitle from 'components/SectionTitle';
import Input from 'components/Form/Input';
import MaskedNumberInput from 'components/Form/MaskedNumberInput';
import Button from 'components/Form/Button';
import PurchasePrices from 'containers/Cart/components/PurchasePrices';
import ShoppingCartContext from 'contexts/ShoppingCartContext';

import registerSchema from './registerSchema';

const Container = styled.div`
  background: #fff;
  padding-right: 0;
`;

const StepsContainer = styled.div`
  width: 100%;
`;

const RegisterData = () => {
  const [personType, setPersonType] = useState('FISICA');
  const isNaturalPerson = personType === 'FISICA';
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);

  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <StepsContainer>
          <Steps activeIndex={1} />
        </StepsContainer>
        <Formik
          onSubmit={(values) => {
            updateShoppingCart({ personData: values })
            history.push('/address');
          }}
          initialValues={{
            personType: 'FISICA',
            name: '',
            razaoSocial: '',
            fantasia: '',
            documento: '',
            email: '',
            foneFormatted: '',
          }}
          validationSchema={registerSchema(isNaturalPerson)}
          render={propsForm => (
            <Form>
              <Row>
                <Grid cols="12">
                  <SectionTitle>Dados cadastrais</SectionTitle>
                </Grid>
                <Grid cols="12">
                  <p>Cadastro de pessoa:</p>
                  <label htmlFor="naturalPerson">
                    <input
                      style={{ marginRight: '5px' }}
                      id="naturalPerson"
                      type="radio"
                      name="personType"
                      value="FISICA"
                      checked={personType === 'FISICA'}
                      onChange={({ target }) => {
                        setPersonType(target.value);
                        propsForm.setFieldValue('personType', target.value);
                      }}
                    />
                    Física
                  </label>
                  <label htmlFor="legalPerson" style={{ marginLeft: '20px' }}>
                    <input
                      style={{ marginRight: '5px' }}
                      id="legalPerson"
                      type="radio"
                      name="personType"
                      value="JURIDICA"
                      checked={personType === 'JURIDICA'}
                      onChange={({ target }) => {
                        setPersonType(target.value);
                        propsForm.setFieldValue('personType', target.value);
                      }}
                    />
                    Jurídica
                  </label>
                </Grid>
                {isNaturalPerson && (
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
                {!isNaturalPerson && (
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
                {isNaturalPerson ? (
                  <Grid cols="12 6 6 6 6">
                    <Field
                      label="CPF"
                      name="documento"
                      inputId="documento"
                      format="###.###.###-##"
                      component={MaskedNumberInput}
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
                        type="tel"
                      />
                    </Grid>
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
                      propsForm.setFieldValue('foneFormatted', value.formattedValue);
                    }}
                    isRequired
                  />
                </Grid>
              </Row>
              <Row className="d-flex justify-content-end pb-4 pr-3">
                <Button
                  value="Próximo"
                  type="submit"
                  onClick={() => {
                    propsForm.validateForm();
                  }}
                />
              </Row>
            </Form>
          )}
        />
      </Grid>
      <Grid cols="12 12 12 4 4" style={{ padding: 0 }}>
        <PurchasePrices
          basketCountCart={shoppingCart.basketCount}
          totalCart={shoppingCart.cart.reduce((count, val) => count + val.quantity * (val.pricing.modifiers + val.pricing.product),
            0)}
          deliveryCost={shoppingCart.deliveryFee || {}}
          couponValue={-5}
        />
      </Grid>
    </Container>
  );
};

export default RegisterData;
