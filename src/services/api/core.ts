import axios from 'axios';

import { isMainnet } from '@/config/constants';

axios.defaults.baseURL = isMainnet ? '' : '';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios;
