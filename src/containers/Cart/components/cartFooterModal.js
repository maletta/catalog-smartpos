import Swal from 'sweetalert2';
import paths from 'paths';

import imageURLClosedStore from 'assets/closed-store.svg';

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

export const createHTMLTitle = (today) => {
  const html = `
    <span style="font-weight: bold; font-size: 1.2rem;">
      ${createTitle(today)}
    </span>
  `;

  return html;
};

export const showStoreIsClosedModal = (today, router) => {
  const modalConfig = {
    title: createHTMLTitle(today),
    text: `
      Você pode olhar o catálogo à vontade
      e fazer o pedido quando a loja estiver aberta.
    `,
    imageUrl: imageURLClosedStore,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Loja fechada',
    showConfirmButton: true,
    confirmButtonColor: 'var(--button-primary-background',
    onClose: () => router.push(paths.home),
  };

  Swal.fire(modalConfig);
};

export default {};
