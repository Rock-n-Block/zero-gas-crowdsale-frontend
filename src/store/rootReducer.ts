/* PLOP_INJECT_IMPORT_REDUCER */
import tokens from './tokens/reducer';
import CrowdSale from './crowdsale/reducer';
import modals from './modals/reducer';
import ui from './ui/reducer';
import user from './user/reducer';

export default {
  ui,
  user,
  /* PLOP_INJECT_PLACE_REDUCER */
  tokens,
  CrowdSale,
  modals,
};
