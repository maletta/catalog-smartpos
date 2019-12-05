import { createBrowserHistory } from 'history';

import { getBaseName } from 'utils/getStoreName';

export default createBrowserHistory({ basename: getBaseName() });
