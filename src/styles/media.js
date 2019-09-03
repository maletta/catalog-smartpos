import { css } from 'styled-components';

export const sizes = {
  mobile: 767,
  tablet: 768,
  desktop: 1024,
};

// https://www.styled-components.com/docs/advanced#media-templates
const media = Object.keys(sizes).reduce((acc, label, index) => {
  if (index === 0) {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
        ${css(...args)}
      }
    `;

    return acc;
  }

  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export default media;
