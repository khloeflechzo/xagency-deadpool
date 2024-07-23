import React, { ReactElement } from 'react';

import About from './About';
import ImageCanvas from './ImagesCanvas';
import s from './styles.module.scss';
import Tokenomics from './Tokenomics';

const Home = (): ReactElement => {
  return (
    <div className={s.home}>
      <div className={s.home_inner}>
        <ImageCanvas />
        <About />
        <Tokenomics />
      </div>
    </div>
  );
};

export default Home;
