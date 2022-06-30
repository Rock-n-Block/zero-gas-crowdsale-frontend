import { socials, socialsIconMap, TSocials } from '@/appConstants';
import { Button, Typography } from '@/components';

import s from './styles.module.scss';

type SocialCardProps = TSocials;

const SocialCard = ({ link, name, label }: SocialCardProps) => {
  return (
    <div className={s.cardWrapper}>
      <Button variant="outlined" href={link} className={s.cardContent}>
        <span className={s.cardIcon}>{socialsIconMap[name]}</span>
        <Typography className={s.cardLabel} type="body1" color="dark-0">
          {label}
        </Typography>
      </Button>
    </div>
  );
};

export const Socials = () => {
  return (
    <div className={s.wrapper}>
      {socials.map((social) => (
        <SocialCard key={social.link} {...social} />
      ))}
    </div>
  );
};
