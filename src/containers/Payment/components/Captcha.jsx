import React from 'react';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';

import lockImagePath from 'assets/lock.png';
import Grid from 'components/Grid';
import Row from 'components/Row';

const SecureConnectionContainer = styled.span`
  font-size: 12px;
`;

const RecaptchaContainer = styled.p`
  font-size: 12px;
  color: #A6A6A6;
`;

const secureConnectionText = 'Você está em uma conexão segura';
const recaptchaText = 'Esse site é protegido por reCAPTCHA e os Termos de Serviço e Política do Google se aplicam';

const Captcha = (props) => {
  const { recaptchaRef, setReCaptchaToken } = props;

  return (
    <>
      <Row>
        <Grid
          cols="12 4 6 6 6"
          className="mt-0 d-flex flex-column"
        >
          <div className="mb-2">
            <img
              height={20}
              alt="ícone de escudo"
              src={lockImagePath}
            />
            <SecureConnectionContainer>
              {secureConnectionText}
            </SecureConnectionContainer>
          </div>
          <div>
            <RecaptchaContainer>
              {recaptchaText}
            </RecaptchaContainer>
          </div>
        </Grid>
        <Grid
          cols="12 8 6 6 6"
          className="d-flex justify-content-end mb-3"
        >
          <ReCAPTCHA
            hl="pt-BR"
            sitekey={process.env.REACT_APP_RECAPTCHAKEY_V2}
            ref={recaptchaRef}
            onChange={setReCaptchaToken}
          />
        </Grid>
      </Row>
    </>
  );
};

Captcha.propTypes = {
  recaptchaRef: PropTypes.any.isRequired,
  setReCaptchaToken: PropTypes.func.isRequired,
};


export default Captcha;
