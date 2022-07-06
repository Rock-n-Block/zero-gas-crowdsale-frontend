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
