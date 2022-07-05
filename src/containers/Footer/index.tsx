import { Link } from 'react-router-dom';
import cn from 'clsx';

import { ArchangelTokenIcon, RockNBlockIcon, RockNBlockText, ZeroGasIcon } from '@/assets/img';
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
              <ArchangelTokenIcon className={s.poweredByIcon} />
              <div>
                <Typography color="dark-0" type="body2" className={s.poweredBy}>
                  POWERED BY
                </Typography>
                <Typography color="dark-0" type="body2" weight={600} className={s.archaEcosystem}>
                  Archa Ecosystem
                </Typography>
              </div>
            </div>
            <Typography color="dark-0" type="body2" className={s.copyright}>
              Copyright © {new Date().getFullYear()} LLC. <br className={s.copyrightBreak} /> All
              rights reserved
            </Typography>
            <div className={cn(s.poweredByContainer)}>
              <RockNBlockIcon width={32} height={32} className={s.poweredByIcon} />
              <div>
                <Typography color="dark-0" type="body2" className={s.poweredBy}>
                  OUR BACKERS
                </Typography>
                <RockNBlockText />
              </div>
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
