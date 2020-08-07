import Swal from 'sweetalert2';

import history from 'utils/history';
import paths from 'paths';

export const differenceBetweenValuesErrorModal = () => {
  Swal.fire({
    type: 'warning',
    title: 'Divergência nos valores',
    text:
      'Pedido com valores divergentes, faça o seu pedido novamente!',
    onClose: () => {
      history.push(paths.home);
    },
  });
};

export const genericErrorModal = () => {
  Swal.fire({
    type: 'error',
    title: 'Oops...',
    text: 'Erro ao enviar o pedido',
  });
};

export const invalidCardModal = () => {
  Swal.fire({
    type: 'warning',
    title: 'Cartão inválido',
    text: 'Por favor verifique seu cartão de crédito!',
    showConfirmButton: true,
    showCloseButton: true,
  });
};
