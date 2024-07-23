import Lenis from '@studio-freight/lenis';
import { MutableRefObject } from 'react';

declare global {
  interface Window {
    lenisRoot: MutableRefObject<Lenis | undefined>; // Replace 'any' with the actual type if possible
  }
}
