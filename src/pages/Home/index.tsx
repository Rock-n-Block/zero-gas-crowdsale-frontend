import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import { AboutUs, Main, RoadMap, Tokenomics } from './containers';

const Home = () => {
  return (
    <>
      <Main />
      <AboutUs />
      <Tokenomics />
      <RoadMap />
    </>
  );
};

export default Home;
