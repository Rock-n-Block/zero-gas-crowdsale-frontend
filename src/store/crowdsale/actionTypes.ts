const HELLO_WORLD = 'HELLO_WORLD' as const;
const GET_CROWDSALE_INFO = 'GET_CROWDSALE_INFO' as const;
const BUY = 'BUY' as const;
const CLAIM = 'CLAIM' as const;
const REFUND = 'REFUND' as const;

const CrowdSaleActionType = {
  HELLO_WORLD,
  GET_CROWDSALE_INFO,
  BUY,
  CLAIM,
  REFUND,
};

export default CrowdSaleActionType;
