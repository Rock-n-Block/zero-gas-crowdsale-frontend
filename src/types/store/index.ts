import type { Dispatch as DispatchReact } from 'react';

/* PLOP_INJECT_IMPORT_STATE */
import { TokensState } from './tokens';
import { CrowdSaleState } from './crowdsale';
import { ModalsInitialState } from './modals';
import { UserState } from './user';

export * from './user';
export * from './ui';
/* PLOP_INJECT_IMPORT_TYPES */
export * from './tokens';
export * from './crowdsale';
export * from './modals';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T, P = any, M = void> = { type: T; payload?: P; meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;

export type State = {
  user: UserState;
  /* PLOP_INJECT_MODIFY_STATE */
  tokens: TokensState;
  CrowdSale: CrowdSaleState;
  modals: ModalsInitialState;
};
