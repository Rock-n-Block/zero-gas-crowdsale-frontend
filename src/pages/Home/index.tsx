import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import { AboutUs, Main, RoadMap, Tokenomics, Partners } from './containers';

const Home = () => {
  return (
    <>
      <Main />
      <AboutUs />
      <Tokenomics />
      <RoadMap />
      <Partners />
    </>
  );
};

export default Home;
