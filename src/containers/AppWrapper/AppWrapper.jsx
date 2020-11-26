
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import useRouterHook from 'utils/useRouterHook';
import useStoreNameHook from 'utils/useStoreNameHook';
import moment from 'moment';

import initGA from 'initGA';
// import AppRouter from 'Router';
import { getStoreInfo, getCategories } from 'requests';

// import history from 'utils/history';
// import getStoreName from 'utils/getStoreName';

import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import ThemeContext from 'contexts/ThemeContext';
// import { useGlobalContext } from 'contexts/GlobalContext/context/hooks';
// import { getStoreAction } from 'contexts/GlobalContext/actions/store';

import getBusinessHour from 'api/businessHoursRequests';
import { getTheme } from 'api/catalogCustomization';
import { isCurrentTimeWithinTimeRange } from 'utils/withinTimeRange';

function AppWrapper({ children }) {
  const trackPageView = initGA();
  const storeName = useStoreNameHook();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState({});
  const { updateShop, updateCategory } = useContext(ShopContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const { dispatchTheme } = useContext(ThemeContext);
  const router = useRouterHook();


  const defineTheme = async (storeId) => {
    const theme = await getTheme(storeId);
    dispatchTheme({ type: 'THEME', payload: theme });
  };

  const getCategoryList = (id) => {
    getCategories(id)
      .then(({ data }) => updateCategory(data))
      .catch(() => updateCategory([]))
      .finally(() => setLoading(false));
  };

  const isShopOpen = (openHours) => {
    const { hours, closed } = openHours[moment().day()];
    if (closed) return false;
    const fn = (openCloseHours) => {
      const { openHour, closeHour } = openCloseHours;
      return isCurrentTimeWithinTimeRange(
        { openHour, closeHour, currentHour: moment().format('HH:mm') },
      );
    };
    return hours.some(fn);
  };

  const getStore = async () => {
    try {
      const { data } = await getStoreInfo(storeName);
      const {
        is_enableOrder: isEnableOrder,
        allowOrderOutsideBusinessHours,
        openHours,
      } = data;
      defineTheme(data.id);
      setStore({ ...data, found: true, storeName });
      getCategoryList(data.id);

      let customerCanOrder = isEnableOrder === 1;

      if (customerCanOrder) {
        customerCanOrder = allowOrderOutsideBusinessHours === 1;

        if (!customerCanOrder) {
          customerCanOrder = isShopOpen(openHours);
        }
      }

      updateShop({
        ...data, is_enableOrder: Number(customerCanOrder), customerCanOrder, storeName, found: true,
      });
    } catch {
      updateShop({ found: false });
      setStore({ found: false });
      setLoading(false);
    }
  };

  const businessHourRequest = async () => {
    const currentDateFormat = moment().format();
    const timezone = currentDateFormat.substr(currentDateFormat.length - 6);
    const { data } = await getBusinessHour(store.id, store.codigo, timezone);
    updateShop(prev => ({ ...prev, data }));
  };

  const cleanCart = () => {
    const date1 = localStorage.getItem('cartInit');
    const date2 = new Date().getTime();
    const hourDiff = Math.abs(date1 - date2) / 36e5;
    if (hourDiff > 1) {
      localStorage.removeItem('cartInit');
      updateShoppingCart({ cart: [] });
    }
  };

  useEffect(() => {
    if (store.id && !store.allowOrderOutsideBusinessHours) {
      businessHourRequest();
    }
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    getStore();
    window.scrollTo(0, 0);
    cleanCart();
  }, [storeName]);

  useEffect(() => {
    const handleHistoryChange = (url) => {
      trackPageView(url);
    };
    router.events.on('routeChangeComplete', handleHistoryChange);

    return () => {
      router.events.off('routeChangeComplete', handleHistoryChange);
    };
  }, [router]);

  return children;
}

AppWrapper.defaultProps = {
  children: '',
};

AppWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppWrapper;
