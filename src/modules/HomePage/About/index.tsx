import React, { ReactElement } from 'react';

import { TypoLabel, TypoParagraph } from '@/components/Typo';

import CanvasLoop from './CanvasLoop';

const paragraphs = [
  {
    label: 'Maximum Effort, Minimum Sense:',
    paragraph:
      "Just like our heroes, we're all about diving headfirst into danger (and possibly your wallet).",
  },
  {
    label: 'Healing Factor:',
    paragraph:
      "Our tokenomics are so ridiculous, they might just regenerate your losses faster than Wolverine's abs.",
  },
  {
    label: 'Fourth Wall Breaking:',
    paragraph:
      "We know we're a meme coin, you know we're a meme coin. Let's embrace the absurdity together!",
  },
];

const About = (): ReactElement => {
  return (
    <div id="about" className="w-screen h-[200vh] relative">
      <CanvasLoop />
      <div className="h-screen w-full px-[12.1rem] py-[14.1rem] absolute top-0 left-0">
        <div className="bg-red py-6 px-14 flex items-center justify-center relative z-1 w-[91.2rem]">
          <TypoParagraph size={70} color="yellow" className="uppercase !leading-none">
            $DXW - the most irreverent and badass meme coin this side of the multiverse!
          </TypoParagraph>
        </div>
      </div>
      <div className="h-screen w-full px-[10rem] py-[12rem] relative">
        <div className="flex flex-col gap-16 w-[82.6rem]">
          {paragraphs.map((item) => (
            <TypoParagraph key={item.label} size={48} color="yellow">
              {item.label}{' '}
              <TypoLabel size={48} color="white">
                {item.paragraph}
              </TypoLabel>
            </TypoParagraph>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
