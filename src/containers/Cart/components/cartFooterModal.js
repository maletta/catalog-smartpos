import Swal from 'sweetalert2';

import imageURLClosedStore from 'assets/closed-store.svg';

import { redirectToHome } from './cartFooterRouter';

export const createHourLine = (itemHour) => {
  const { openHour, closeHour } = itemHour;
  return `<br />${openHour} às ${closeHour}`;
};

export const createHoursList = hours => hours.map(createHourLine);

export const createTitleWithHoursList = hours => `Esta loja abre entre: ${createHoursList(hours).join('')}`;

const createTitle = (today) => {
  const { hours, closed: isShopClosed } = today;
  return isShopClosed ? 'Loja fechada!' : createTitleWithHoursList(hours);
};

export const showStoreIsClosedModal = (today) => {
  const title = createTitle(today);

  const html = `
    <span style="font-weight: bold; font-size: 1.2rem;"> 
      ${title}
    </span>
  `;

  const modalConfig = {
    title: html,
    text: `
      Você pode olhar o catálogo à vontade
      e fazer o pedido quando a loja estiver aberta.
    `,
    imageUrl: imageURLClosedStore,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Loja fechada',
    showConfirmButton: true,
    confirmButtonColor: 'var(--color-primary)',
    onClose: redirectToHome,
  };

  Swal.fire(modalConfig);
};

export default {};
