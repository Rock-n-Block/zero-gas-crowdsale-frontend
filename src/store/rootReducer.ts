/* PLOP_INJECT_IMPORT_REDUCER */
import CrowdSale from './crowdsale/reducer';
import ui from './ui/reducer';
import user from './user/reducer';

export default {
  ui,
  user,
  /* PLOP_INJECT_PLACE_REDUCER */
  CrowdSale,
};
