import cn from 'clsx';

import { pros } from '@/appConstants';
import { PlusIcon } from '@/assets/img';
import { Accordion, InfinityLine, Typography } from '@/components';
import { AccordionItemState } from '@/components/Accordion';
import { Divider } from '@/containers';
import { useBreakpoints } from '@/hooks';

import { Advantage, BuyButton, InfoBlock } from '../../components';

import { Chart } from './components';

import s from './styles.module.scss';

const ReadMoreHead = ({ isOpen }: AccordionItemState) => (
  <div className={s.readMoreHeadWrapper}>
    <Typography className={s.readMoreTitle} fontFamily="DrukCyr Wide" weight={900}>
      Read more
    </Typography>
    <div className={cn(s.readMoreIcon, { [s.active]: isOpen })}>
      <PlusIcon />
    </div>
  </div>
);

const ReadMoreBody = () => (
  <Typography>
    The platform is developed in a Layer 2 network operated by a group of virtualized subnodes
    selected from a subset of nodes in the network. They run on all or a subset of each node’s
    computation and storage resources (multitenancy).
  </Typography>
);

export const AboutUs = () => {
  const [isMobile] = useBreakpoints([541]);
  return (
    <div className={s.wrapper} id="about">
      <div className={s.container}>
        <InfoBlock
          title="A GAME CHANGER!"
          content={
            <Typography>
              ZEROGAS is designed to resolve the cost issues in networks like Ethereum. We offer a
              decentralized zero gas cost and low-latency transactions enabled with storage
              capabilities and advanced analytics.
            </Typography>
          }
        />
        <Advantage>
          <Typography type="h2">
            GOODBYE TO GAS FEES{' '}
            <Typography type="h2" weight={500} className={s.infoHighlight} customTag="span">
              FROM NOW
            </Typography>
          </Typography>
        </Advantage>
        <div className={s.advantageBlock}>
          <div className={s.chart}>
            <Chart radius={isMobile ? 160 : 200} />
          </div>
          <div className={s.advantages}>
            <Typography>ZEROGAS is built interoperable with Ethereum and stands for:</Typography>
            <ul className={s.advantagesList}>
              {pros.map((el) => (
                <li key={el} className={s.advantagesListElement}>
                  <Typography fontFamily="Poppins" weight={700}>
                    {el}
                  </Typography>
                </li>
              ))}
            </ul>
            <Typography>
              It’s a complex solution for the Ethereum network traders addressing speed, security,
              and ecosystem interoperability.
            </Typography>
          </div>
        </div>
        <InfoBlock
          title="THE TECHNOLOGY"
          content={
            <>
              <Typography className={s.technologyText}>
                The platform is developed in a Layer 2 network operated by a group of virtualized
                subnodes selected from a subset of nodes in the network. They run on all or a subset
                of each node’s computation and storage resources (multitenancy).
              </Typography>
              <Accordion
                items={[
                  {
                    title: ReadMoreHead,
                    content: ReadMoreBody,
                  },
                ]}
              />
            </>
          }
        />
      </div>
      <Divider contained={false}>
        <InfinityLine>
          <BuyButton />
        </InfinityLine>
      </Divider>
    </div>
  );
};
