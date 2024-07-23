import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/interactive/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {},
    screens: {
      xs: '0px',
      sm: '768px',
      md: '1024px',
      lg: '1200px',
      xl: '1600px',
      xxl: '1920px',
    },
    colors: {
      black: '#000000',
      white: '#ffffff',
      dark: '#111214',
      red: '#B1181D',
      yellow: '#FFD581',
      gray: '#999896',
      silver: '#F4F2ED',
      cornflower: '#4F4A3B',
    },
  },
  plugins: [],
};
export default config;
