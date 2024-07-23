import classNames from 'classnames';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import NextImage from 'next/image';
import React, { ReactElement } from 'react';

import SvgInsert from '@/components/SvgInsert';
import { TypoLabel } from '@/components/Typo';
import { sections, socials } from '@/constants/links';

import s from './styles.module.scss';

gsap.registerPlugin(ScrollToPlugin);

const Content = ({ active }: { active: boolean }): ReactElement => {
  const handleScrollToSection = (id: string): void => {
    const sectionId = document.querySelector(id);

    if (sectionId !== null) {
      gsap.to(window, {
        scrollTo: sectionId,
      });
    }
  };

  return (
    <div className={classNames(s.content, active && s.active)}>
      <div className={s.content_left}>
        <SvgInsert src="/icons/logo.svg" width={623} height={792} className={s.content_left_logo} />
        <NextImage
          src="/icons/name.svg"
          alt="name"
          width={957}
          height={370}
          className={s.content_left_name}
        />
        <div className={classNames(s.content_left_sword, active && s.active)}>
          <NextImage
            src="/icons/sword.svg"
            alt="name"
            width={1547}
            height={179}
            className={s.content_left_sword_image}
          />
          <div className={s.content_left_sword_ca}>
            <TypoLabel size={40} tag="p">
              CA: 0x0000000000000000000000
            </TypoLabel>
          </div>
        </div>
      </div>
      <div className={s.content_right}>
        <div className={s.content_right_sections}>
          {sections.map((l) => (
            <button onClick={() => handleScrollToSection(l.href)} key={l.label} type="button">
              <TypoLabel size={72}>{l.label}</TypoLabel>
            </button>
          ))}
        </div>
        <div className={s.content_right_socials}>
          {socials.map((l) => (
            <a key={l.icon} href={l.href} target="_blank" rel="noopener noreferrer">
              <SvgInsert src={l.icon} width={96} height={96} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
