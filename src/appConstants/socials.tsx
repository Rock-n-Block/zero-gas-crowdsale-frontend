import { ReactElement } from 'react';

import {
  DiscordIcon,
  FacebookIcon,
  MediumIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
} from '@/assets/img';

export type TAvailableSocials =
  | 'twitter'
  | 'telegram'
  | 'discord'
  | 'reddit'
  | 'medium'
  | 'facebook';

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
  reddit: <RedditIcon />,
  medium: <MediumIcon />,
  discord: <DiscordIcon />,
  facebook: <FacebookIcon />,
};

export const socials: TSocials[] = [
  {
    link: 'https://www.reddit.com/r/zerogas/',
    name: 'reddit',
    label: 'Reddit',
  },
  {
    link: 'https://discord.gg/DuywSQmx',
    name: 'discord',
    label: 'Discord',
  },
  {
    link: 'https://t.me/zerogas',
    name: 'telegram',
    label: 'Telegram Channel',
  },
  {
    link: 'https://www.facebook.com/ZeroGasOfficial',
    name: 'facebook',
    label: 'Facebook',
  },
  {
    link: 'https://twitter.com/0gasDex',
    name: 'twitter',
    label: 'Twitter',
  },
  {
    link: 'https://medium.com',
    name: 'medium',
    label: 'Medium',
  },
];
