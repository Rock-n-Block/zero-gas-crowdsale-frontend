export const currentStage = 1;

export type RoadMapItem = {
  id: number;
  title: string;
  content: string;
};

export const roadMap: RoadMapItem[] = [
  {
    id: 1,
    title: 'Q1-Q2 2022',
    content: `Investigation and feasibility`,
  },
  {
    id: 2,
    title: 'Q3 2022',
    content: `Development of the website
      Crowdsale
      Litepaper release
      Smart contract development
      Coingecko listing
      Coinmarketcap listing
      Portfolio backend`,
  },
  {
    id: 3,
    title: 'Q3 2022',
    content: `Bybit launchpad listing
      Gate startup listing
      Bitmart launchpad listing
      Binance launchpad listing
      Deposit Flow`,
  },
  {
    id: 4,
    title: 'Q3 2022',
    content: `Minimum viable product
      Release of the Whitepaper
      Platform Testing
      Security Audit
      Bug fixing
      Double the Team
      Token Listing on Uniswap
      Token Listing on Zerogas
      Appoint Law firm`,
  },
  {
    id: 5,
    title: 'Q4 2022',
    content: `Beta version Platform release
      Smart contracts audit
      Vesting contract audits
      Deposit Withdraw
      Signed influencers
      Appoint recruitment team
      Starting Zerogas cross-chain development
      Incorporation`,
  },
];
