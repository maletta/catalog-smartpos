
import { getStoreProps } from 'api/ssrGetHeadProps';

export { default } from 'containers/GridProducts';


export async function getServerSideProps(context) {
  return getStoreProps(context);
}
