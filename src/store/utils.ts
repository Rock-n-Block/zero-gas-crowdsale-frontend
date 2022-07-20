import { call } from 'typed-redux-saga';

// Saga wrapper that catches and silences all exceptions
export const safe = (saga: any) =>
  function* (...args: any[]) {
    try {
      yield* call(() => saga(...args));
      // eslint-disable-next-line no-empty
    } catch (_) {}
  };
