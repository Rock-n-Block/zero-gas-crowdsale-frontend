const HELLO_WORLD = 'HELLO_WORLD' as const;
const GET_CROWDSALE_INFO = 'GET_CROWDSALE_INFO' as const;
const BUY = 'BUY' as const;
const CLAIM = 'CLAIM' as const;
const REFUND = 'REFUND' as const;
const GET_CROWDSALE_BALANCES = 'GET_CROWDSALE_BALANCES' as const;
const CLAIM_RISED = 'CLAIM_RISED' as const;

const CrowdSaleActionType = {
  HELLO_WORLD,
  GET_CROWDSALE_INFO,
  BUY,
  CLAIM,
  REFUND,
  GET_CROWDSALE_BALANCES,
  CLAIM_RISED,
};

export default CrowdSaleActionType;
