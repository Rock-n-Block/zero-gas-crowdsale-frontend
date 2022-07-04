import { ReactElement } from 'react';

import { TelegramIcon, TwitterIcon, RedditIcon, MediumIcon, DiscordIcon } from '@/assets/img';

export type TAvailableSocials = 'twitter' | 'telegram' | 'discord' | 'reddit' | 'medium';

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
};

export const socials: TSocials[] = [
  {
    link: 'https://reddit.com',
    name: 'reddit',
    label: 'Reddit',
  },
  {
    link: 'https://discord.com',
    name: 'discord',
    label: 'Discord',
  },
  {
    link: 'https://telegram.org/channel',
    name: 'telegram',
    label: 'Telegram Channel',
  },
  {
    link: 'https://telegram.org',
    name: 'telegram',
    label: 'Community',
  },
  {
    link: 'https://twitter.com',
    name: 'twitter',
    label: 'Twitter',
  },
  {
    link: 'https://medium.com',
    name: 'medium',
    label: 'Medium',
  },
];
