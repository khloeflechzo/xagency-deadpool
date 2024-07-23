import React, { ReactElement } from 'react';

import ImagePreload from '@/components/ImagePreload';
import { TypoHeading, TypoLabel } from '@/components/Typo';
import Fade from '@/effects/Fade';

const Tokenomics = (): ReactElement => {
  return (
    <section
      id="tokennomics"
      className="w-screen h-screen relative overflow-hidden"
      style={{
        background: "url('/images/tokenomics.jpg')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ImagePreload
        className="absolute bottom-0 right-[25%] lg:right-[47rem] w-[73.763rem] h-[97.383rem]"
        src="/images/wolf.svg"
        alt="/images/wolf.svg"
        width={737.63}
        height={973.83}
      />
      <ImagePreload
        className="absolute bottom-[-3rem] -right-[25%] lg:right-0 w-[85.768rem] h-[95.26rem]"
        src="/images/deadpool.svg"
        alt="/images/deadpool.svg"
        width={857.68}
        height={952.6}
      />
      <div className="w-full h-full px-[2rem] lg:px-[11.4rem] py-[18rem] sm:py-[32rem] relative z-[1]">
        <div className="flex flex-col w-full lg:w-[74rem]">
          <Fade direction="bottom">
            <TypoHeading color="white" size={92} className="uppercase text-center">
              Tokennomics
            </TypoHeading>
          </Fade>
          {['Supply: 69,420,000,000', 'TAx: 0/0', 'LP: Burnt', 'RENOUNCED'].map((item, idx) => (
            <Fade key={item} direction="bottom" from="25px" delayTrigger={(idx + 1) / 10}>
              <div
                style={{
                  background: "url('/icons/wrapper.svg')",
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
                className="h-[8rem] sm:h-[10rem] lg:h-[13.1rem] w-full flex items-center justify-center"
              >
                <TypoLabel size={60} color="yellow">
                  {item}
                </TypoLabel>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
