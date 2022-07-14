export type MetamaskLoginData = {
  address: string;
  msg: string;
  signed_msg: string;
};

export type GetMetamaskMessageResponse = {
  data: string;
};

export type MetamaskLoginResponse = {
  data: {
    key: string;
  };
};

export type BuyData = {
  token_address: string;
  amount_to_receive: string;
};

export type BuyResponse = {
  data: {
    token_address: string;
    amount_to_pay: string;
    amount_to_receive: string;
    signature_expiration_timestamp: string;
    signature: string;
  };
};
