import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";

import Grid from "components/Grid";
import Row from "components/Row";
import Steps from "components/Steps";
import SectionTitle from "components/SectionTitle";
import Input from "components/Form/Input";
import MaskedNumberInput from "components/Form/MaskedNumberInput";
import Button from "components/Form/Button";
import PurchasePrices from "containers/Cart/components/PurchasePrices";

const Container = styled.div`
  background: #fff;
  padding-right: 0;
`;

const StepsContainer = styled.div`
  width: 100%;
`;

const RegisterData = () => {
  const [personType, setPersonType] = useState("FISICA");
  const isNaturalPerson = personType === "FISICA";

  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <StepsContainer>
          <Steps activeIndex={1} />
        </StepsContainer>
        <Formik
          // onSubmit={submitCheckout}
          // initialValues={initialValues}
          // validationSchema={checkoutSchema(isNaturalPerson, offlinePayment)}
          render={propsForm => (
            <Form>
              <Row>
                <Grid cols="12">
                  <SectionTitle>Dados cadastrais</SectionTitle>
                </Grid>
                <Grid cols="12">
                  <p>Cadastro de pessoa:</p>
                  <label>
                    <input
                      style={{ marginRight: "5px" }}
                      type="radio"
                      name="personType"
                      value="FISICA"
                      // checked={delivery === "retrieve"}
                      onChange={({ target }) => {
                        setPersonType(target.value);
                      }}
                    />
                    {"Física"}
                  </label>
                  {/* <br /> */}
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      style={{ marginRight: "5px" }}
                      type="radio"
                      name="personType"
                      value="JURIDICA"
                      // checked={delivery === "shipping-fee"}
                      onChange={({ target }) => {
                        setPersonType(target.value);
                      }}
                    />
                    {"Jurídica"}
                  </label>
                  {/* 
                  <SelectDropDown
                    id="tipoPessoa"
                    defaultValue={propsForm.values.tipoPessoa}
                    onChange={event => {
                      propsForm.setFieldValue("tipoPessoa", event);
                      setNaturalPerson(event.value === "FISICA");
                    }}
                    isRequired
                  /> */}
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
                    onValueChange={value => {
                      // propsForm.setFieldValue("fone", value.value);
                      // propsForm.setFieldValue(
                      //   "foneFormatted",
                      //   value.formattedValue
                      // );
                    }}
                    isRequired
                  />
                </Grid>
              </Row>
            </Form>
          )}
        />
        <Row className="d-flex justify-content-end pb-4 pr-3">
          <Button value="Próximo" />
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

export default RegisterData;
