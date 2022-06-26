import { Dashboard } from '@/pages';

export const anchorLinks = {
  about: '/#about',
  tokenomics: '/#tokenomics',
  roadMap: '/#roadMap',
};

export const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: <Dashboard />,
    isMenu: true,
  },
];
