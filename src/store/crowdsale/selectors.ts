import type { CrowdSaleState, State } from '@/types';
import { getLocalDate } from '@/utils';

const crowdSaleSelectors = {
  getCrowdSale: ({ CrowdSale }: State) => ({
    ...CrowdSale,
    stage1StartDate: getLocalDate(CrowdSale.stage1StartDate),
    stage1EndDate: getLocalDate(CrowdSale.stage1EndDate),
    stage2StartDate: getLocalDate(CrowdSale.stage2StartDate),
    stage2EndDate: getLocalDate(CrowdSale.stage2EndDate),
  }),
  getProp:
    <T extends keyof CrowdSaleState>(propKey: T) =>
    (state: State) =>
      state.CrowdSale[propKey],
};

export default crowdSaleSelectors;
