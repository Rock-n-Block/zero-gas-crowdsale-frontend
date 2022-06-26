import { FC } from 'react';

import { InfinityLine } from '@/components';

import s from './Dashboard.module.scss';

const Dashboard: FC = () => {
  return (
    <div className={s.dashboardWrapper}>
      Dashboard
      <InfinityLine animation={{ duration: 5 }}>
        <div style={{ width: '200px', height: '200px', background: 'red' }}>text</div>
      </InfinityLine>
    </div>
  );
};
export default Dashboard;
