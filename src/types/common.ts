export type IAnimationElement =
  | HTMLDivElement
  | HTMLElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLHeadElement
  | HTMLLinkElement
  | HTMLButtonElement
  | SVGSVGElement
  | HTMLAnchorElement
  | null;

export interface IImageGenerative {
  url?: string;
  src?: string;
  width: number;
  height: number;
  quality: number;
}
