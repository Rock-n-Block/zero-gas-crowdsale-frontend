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
    content: `Investigation and feasabiity`,
  },
  {
    id: 2,
    title: 'Q3 2022',
    content: `Creation of website
      Crowdsale
      Exchanges launchpad listings
      Litepaper`,
  },
  {
    id: 3,
    title: 'Q3 2022',
    content: `Stealth Launch on Uniswap`,
  },
  {
    id: 4,
    title: 'Q3 2022',
    content: `Release of the Whitepaper
      Testing the platform
      Security Audit`,
  },
  {
    id: 5,
    title: 'Q4 2022',
    content: `Release of the platform
      ZEROGAS cross-chain development`,
  },
];
