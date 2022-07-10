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
  amount_to_receive: number;
};

export type BuyResponse = {
  data: { initial_tx: any };
};
