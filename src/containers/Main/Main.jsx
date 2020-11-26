import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import NotFound from 'NotFound';
import Spinner from 'components/Spinner';
import Footer from 'components/Footer';
import Header from 'containers/Header';
import Breadcrumb from 'containers/Breadcrumb';
import CardShop from 'components/CardShop';
import useRouterHook from 'utils/useRouterHook';
import paths from 'paths';

import ShopContext from 'contexts/ShopContext';
import FilterContext from 'contexts/FilterContext';


const Content = styled.div`
  position: relative;
  top: 80px;
  padding-bottom: 80px;
  margin-bottom: 3rem;
`;


const Main = ({ children }) => {
  const { shop } = useContext(ShopContext);
  const { updateFilter } = useContext(FilterContext);
  const router = useRouterHook();

  const goHome = () => {
    router.push(paths.home);

    updateFilter({
      categoria: 0,
      label: '',
      page: 1,
      search: '',
      categoryName: 'Todas as categorias',
      redirect: true,
    });
  };


  if (shop.found === null) {
    return <Spinner />;
  }

  if (shop.found === false) {
    return <NotFound />;
  }

  return (
    <>
      {
       shop.found === true && (
         <>
           <CardShop />
           <Header goHome={goHome} store={shop} />
           <Content className="container">
             <Breadcrumb goHome={goHome} />
             {/* <AppRouter /> */}
             {children}
           </Content>
           <Footer storeInfo={shop} />
         </>
       )
     }
    </>
  );
};

Main.defaultProps = {
  children: '',
};


Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Main;
