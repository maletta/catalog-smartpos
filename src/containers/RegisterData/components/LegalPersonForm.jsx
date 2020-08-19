import React from 'react';
import { Field } from 'formik';

import Grid from 'components/Grid';
import Input from 'components/Form/Input';
import MaskedNumberInput from 'components/Form/MaskedNumberInput';

const LegalPersonForm = () => (
  <>
    <Grid cols="12 6 6 6 6">
      <Field
        label="CNPJ"
        name="documento"
        inputId="documento"
        format="##.###.###/####-##"
        component={MaskedNumberInput}
        type="tel"
        isRequired
      />
    </Grid>
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
);

export default LegalPersonForm;
