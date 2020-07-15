import React from 'react';
import { Field } from 'formik';

import Grid from 'components/Grid';
import Input from 'components/Form/Input';
import MaskedNumberInput from 'components/Form/MaskedNumberInput';

const NaturalPersonForm = () => (
  <>
    <Grid cols="12 6 6 6 6">
      <Field
        label="Nome"
        name="name"
        inputId="name"
        component={Input}
        isRequired
      />
    </Grid>
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
  </>
);

export default NaturalPersonForm;
