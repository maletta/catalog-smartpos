import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider as Intl, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import pt from 'react-intl/locale-data/pt';

addLocaleData([...pt, ...en]);

const IntlProvider = ({ children, language }) => {
  const defaultLanguage = language || { locale: 'pt', messages: {} };
  return (
    <Intl locale={defaultLanguage.locale} messages={defaultLanguage.messages}>
      {children}
    </Intl>
  );
};

IntlProvider.propTypes = {
  language: PropTypes.shape({
    locale: PropTypes.string,
    messages: PropTypes.object,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

IntlProvider.defaultProps = {
  children: null,
};

export default IntlProvider;
