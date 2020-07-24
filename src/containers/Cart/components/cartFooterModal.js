import Swal from 'sweetalert2';

import imageURLClosedStore from 'assets/closed-store.svg';

import { redirectToHome } from './cartFooterRouter';

const createHourLine = (itemHour) => {
  const { openHour, closeHour } = itemHour;
  return `<br />${openHour} às ${closeHour}`;
};

const createHoursList = hours => hours.map(createHourLine);

const createTitle = (shop) => {
  const { today } = shop;
  const { hours, closed: isShopClosed } = today;

  const titleWithHoursList = `Esta loja abre entre: ${createHoursList(hours)}`;
  const title = isShopClosed ? 'Loja fechada!' : titleWithHoursList;

  return title;
};

const text = `
  Você pode olhar o catálogo à vontade
  e fazer o pedido quando a loja estiver aberta.
`;

export const showStoreIsClosedModal = (shop) => {
  const title = createTitle(shop);

  const html = `
    <span class="foradohorario-titulo"> 
      ${title}
    </span>
  `;

  Swal.fire({
    title: html,
    text,
    imageUrl: imageURLClosedStore,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Loja fechada',
    showConfirmButton: true,
    confirmButtonColor: 'var(--color-primary)',
    onClose: redirectToHome,
  });
};

export default {};
