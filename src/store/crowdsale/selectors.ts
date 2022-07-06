import type { CrowdSaleState, State } from '@/types';

const crowdSaleSelectors = {
  getCrowdSale: (state: State): CrowdSaleState => state.CrowdSale,
  getProp:
    <T extends keyof CrowdSaleState>(propKey: T) =>
    (state: State) =>
      state.CrowdSale[propKey],
};

export default crowdSaleSelectors;
