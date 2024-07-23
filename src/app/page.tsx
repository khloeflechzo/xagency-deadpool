import HomePage from '@Modules/HomePage';
import type { NextPage } from 'next';
import Head from 'next/head';

import { imageUrls } from '@/constants/images';

const Page: NextPage = () => {
  return (
    <>
      <Head>
        {imageUrls.map((url) => (
          <link key={url} rel="preload" href={url} as="image" />
        ))}
      </Head>
      <HomePage />
    </>
  );
};

export default Page;
