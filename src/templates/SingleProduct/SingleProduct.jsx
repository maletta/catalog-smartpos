
import { getProductProps } from 'api/ssrGetHeadProps';

export { default } from 'containers/SingleProduct';


export async function getServerSideProps(context) {
  return getProductProps(context);
}
