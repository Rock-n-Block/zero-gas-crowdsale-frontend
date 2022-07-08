import { Home } from '@/pages';

export const anchorLinks = [
  {
    to: '/#about',
    label: 'About',
  },
  {
    to: '/#tokenomics',
    label: 'Tokenomics',
  },
  {
    to: '/#roadmap',
    label: 'Roadmap',
  },
];

export const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: <Home />,
    isMenu: true,
  },
  {
    name: 'Privacy Policy',
    path: '/privacy-policy',
    component: <div>pp</div>,
  },
  {
    name: 'Terms',
    path: '/terms',
    component: <div>t</div>,
  },
];
