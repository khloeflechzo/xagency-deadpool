import '@Styles/app.scss';

import Animate from '@Layouts/Animation';
import { Metadata } from 'next';
import { Chelsea_Market, Lilita_One, Maiden_Orange, Mansalva } from 'next/font/google';
import React, { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'DEADPOOL',
    template: '%s - DEADPOOL',
  },
  description: 'DEADPOOL',
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const chelsea_market = Chelsea_Market({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'auto',
});

const maiden_orange = Maiden_Orange({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'auto',
});

const mansalva = Mansalva({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'auto',
});

const lilita_one = Lilita_One({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'auto',
});

export default function RootLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <html lang="en">
      <body
        className={`${chelsea_market.className} ${maiden_orange.className} ${mansalva.className} ${lilita_one.className}`}
      >
        <Animate>{children}</Animate>
      </body>
    </html>
  );
}
