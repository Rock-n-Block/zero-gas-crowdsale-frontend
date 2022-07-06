import type { State, UserState } from '@/types';

const userSelector = {
  getUser: (state: State): UserState => state.user,
  getProp:
    <T extends keyof UserState>(propKey: T) =>
    (state: State): UserState[T] =>
      state.user[propKey],
  getIsAuthenticated: (state: State) => state.user.key,
};

export default userSelector;
