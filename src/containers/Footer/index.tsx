import { Link } from 'react-router-dom';
import cn from 'clsx';

import { ArchangelTokenIcon, RockNBlockIcon, ZeroGasIcon } from '@/assets/img';
import { Typography } from '@/components';

import { Socials } from './components';

import s from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={s.wrapper}>
      <div className={s.container}>
        <Typography className={s.title} type="h1" fontFamily="DrukCyr Wide" weight={900}>
          Zer <ZeroGasIcon className={s.zGasIcon} /> gas
        </Typography>
        <Typography
          className={s.communicationTitle}
          type="h2"
          fontFamily="DrukCyr Wide"
          weight={900}
        >
          Communication
        </Typography>
        <Socials />
        <section className={s.bottom}>
          <div className={s.bottomContainer}>
            <div className={s.poweredByContainer}>
              <ArchangelTokenIcon className={s.archangelTokenIcon} />
              <div>
                <Typography color="dark-0" type="body2" className={s.poweredBy}>
                  POWERED BY
                </Typography>
                <Typography color="dark-0" type="body2" weight={600}>
                  Archa Ecosystem
                </Typography>
              </div>
            </div>
            <Typography color="dark-0" type="body2" className={s.copyright}>
              Copyright © {new Date().getFullYear()} LLC. All rights reserved
            </Typography>
            <div className={cn(s.poweredByContainer, s.poweredByRocknblockContainer)}>
              <Typography color="dark-0" type="body2" className={s.poweredBy}>
                POWERED BY
              </Typography>
              <RockNBlockIcon />
            </div>
            {/* <div className={s.terms}>
              <Link className={s.termsLink} to="/privacy-policy">
                <Typography color="dark-0" type="body2">
                  Privacy Policy
                </Typography>
              </Link>
              <Link className={s.termsLink} to="/terms">
                <Typography color="dark-0" type="body2">
                  Terms of Service
                </Typography>
              </Link>
            </div> */}
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
