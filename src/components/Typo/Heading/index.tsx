import cn from 'classnames';
import React, { forwardRef, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

interface TypographyProps extends PropsWithChildren {
  color?: 'white' | 'black' | 'red';
  size?: 320 | 96 | 92 | 66 | 64 | 48 | 40 | 36 | 32 | 30 | 24;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
}

const TypoHeading = forwardRef<HTMLHeadingElement, TypographyProps>(
  (props: TypographyProps, ref) => {
    const { color, size = 320, tag: Tag = 'h1', className, children, ...restProps } = props;
    const headingClassNames = cn(
      styles.heading,
      color && styles[`heading__${color}`],
      styles[`heading__${size}`],
      className
    );
    return (
      <Tag {...restProps} ref={ref} className={headingClassNames}>
        {children}
      </Tag>
    );
  }
);

TypoHeading.displayName = 'TypoHeading';

export default TypoHeading;
