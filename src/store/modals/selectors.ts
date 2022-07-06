import type { ModalsInitialState, State } from '@/types';

const modalsSelectors = {
  getModals: (state: State): ModalsInitialState => state.modals,
  getProp:
    <T extends keyof ModalsInitialState>(propKey: T) =>
    (state: State) =>
      state.modals[propKey],
};

export default modalsSelectors;
