import cn from 'classnames';
import React, { forwardRef, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

interface TypoLabelProps extends PropsWithChildren {
  color?: 'white' | 'black' | 'red' | 'yellow';
  size?: 110 | 100 | 72 | 60 | 48 | 40 | 30 | 28 | 26 | 24 | 14 | 12;
  tag?: 'h4' | 'h5' | 'h6' | 'p' | 'span';
  isOpacity?: boolean;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

const TypoLabel = forwardRef<HTMLHeadingElement, TypoLabelProps>((props: TypoLabelProps, ref) => {
  const {
    color = 'black',
    size = 12,
    tag: Tag = 'span',
    isOpacity = false,
    className,
    children,
    onMouseEnter,
    onMouseLeave,
    ...restProps
  } = props;
  const headingClassNames = cn(
    styles.label,
    color && styles[`label__${color}`],
    styles[`label__${size}`],
    isOpacity && styles[`label__is-opacity`],
    className
  );
  return (
    <Tag
      {...restProps}
      ref={ref}
      className={headingClassNames}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Tag>
  );
});

TypoLabel.displayName = 'TypoLabel';

export default TypoLabel;
