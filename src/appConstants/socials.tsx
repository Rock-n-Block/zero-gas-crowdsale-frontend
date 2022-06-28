import { ReactElement } from 'react';

import { TelegramIcon, TwitterIcon } from '@/assets/img';

export type TAvailableSocials = 'twitter' | 'telegram';

export type TSocials = {
  link: string;
  name: TAvailableSocials;
  label: string;
};

type TSocialsIconMap = {
  [key in TAvailableSocials]: ReactElement;
};

export const socialsIconMap: TSocialsIconMap = {
  telegram: <TelegramIcon />,
  twitter: <TwitterIcon />,
};

export const socials: TSocials[] = [
  {
    link: '',
    name: 'twitter',
    label: 'Twitter',
  },
  {
    link: '',
    name: 'telegram',
    label: 'Telegram Channel',
  },
  {
    link: '',
    name: 'telegram',
    label: 'Telegram Chat',
  },
];
