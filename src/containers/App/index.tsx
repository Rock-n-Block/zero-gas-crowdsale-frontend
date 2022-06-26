import { FC } from 'react';

import { Header, RouterManager } from '@/containers';
import { useAnchorLink } from '@/hooks';

import s from './App.module.scss';

const App: FC = () => {
  useAnchorLink();

  return (
    <div className={s.mainWrapper}>
      <Header />
      <div className={s.pageWrapper}>
        <RouterManager />
      </div>
    </div>
  );
};
export default App;
